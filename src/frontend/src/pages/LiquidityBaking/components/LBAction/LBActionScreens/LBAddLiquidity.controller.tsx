import React, { useState } from 'react'
import { TezosToolkit, OpKind } from '@taquito/taquito'
import { useSelector } from 'react-redux'

import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { dex, SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { cyanColor, subHeaderColor } from 'styles'

import { Button } from 'app/App.components/Button/Button.controller'
import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'

import { CustomizedText, HorisontalInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { ActionScreenWrapper, CheckBox, CheckBoxLabel, CheckBoxWrapper, StepBlock } from '../LBAction.style'
import { State } from 'utils/interfaces'
import env from 'utils/env'
import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'
import { Slippage } from 'app/App.components/LBActionBottomFields/Slippage.contoller'
import { addLiquidityCalculationsHandler } from 'utils/DEX/liquidityUtils'
import { parseSrtToNum } from 'utils/utils'
import { CoinsInputsValues, AddLiquidutityInputChangeEventType } from '../helpers/actionsScreen.types'

export const LBAddLiquidity = () => {
  const {
    lbData: { xtz_pool, token_pool, lqt_address, token_address, lqt_total },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const { accountPkh } = useSelector((state: State) => state.wallet)
  const { xtzBalance, tzBTCBalance } = useSelector((state: State) => state.user)

  const [inputValues, setInputValues] = useState<CoinsInputsValues>({
    XTZ: 0,
    tzBTC: 0,
  })

  const [selectedSlippage, setSeletedToggle] = useState(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippageValue, setSlippageValue] = useState<string>(SLIPPAGE_TOGGLE_VALUES[0].value.toString())

  const [switchValue, setSwitchValue] = useState(false)

  const [lqtReceived, setLqtReceived] = useState(0)
  const [minlqtReceived, setMinLqtReceived] = useState(0)

  // handle slippage value changing
  const slippageChangeHandler = (value: string, isInput?: boolean) => {
    if (+value >= 0 && +value <= 100) {
      setSlippageValue(value)
    }

    if (!isInput) {
      setSeletedToggle(parseSrtToNum(value))
    }

    // TODO: add recalculation on slipage change
  }

  // input hanlder
  const inputChangeHandler = (e: AddLiquidutityInputChangeEventType) => {
    const { name, value } = e.target
    if (+value < 0) return

    if (name === 'XTZ') setLqtReceived(Math.floor((Number(value) * lqt_total) / xtz_pool))

    if (switchValue) {
      setInputValues({
        ...inputValues,
        [name]: value,
      })
    } else {
      const { liquidityExpected, liquidityMinimum, tokenRequired, xtzRequired } = addLiquidityCalculationsHandler(
        name as 'XTZ' | 'tzBTC',
        parseSrtToNum(value),
        xtz_pool,
        token_pool,
        lqt_total,
        parseSrtToNum(slippageValue),
        dex,
      )

      setLqtReceived(liquidityExpected.value)
      setMinLqtReceived(liquidityMinimum.value)
      setInputValues({
        ...inputValues,
        ...(name === 'XTZ' && tokenRequired
          ? {
              tzBTC: tokenRequired.value,
              XTZ: value,
            }
          : {}),
        ...(name === 'tzBTC' && xtzRequired
          ? {
              XTZ: xtzRequired.value,
              tzBTC: value,
            }
          : {}),
      })
    }
  }

  // handle add liquidity button TODO: extract it
  const addLiquidityHandler = async () => {
    const Tezos = new TezosToolkit(env.rpcLink)
    const lbContract = await Tezos.wallet.at(lqt_address)
    const tzBtcContract = await Tezos.wallet.at(token_address)
    const maxTokensSold = Math.floor(
      parseSrtToNum(inputValues.tzBTC) + (parseSrtToNum(inputValues.tzBTC) * parseSrtToNum(slippageValue)) / 100,
    )
    const deadline = new Date(Date.now() + 60000).toISOString()

    const batchOp = await Tezos.wallet
      .batch([
        {
          kind: OpKind.TRANSACTION,
          ...tzBtcContract.methods.approve(lqt_address, 0).toTransferParams(),
        },
        {
          kind: OpKind.TRANSACTION,
          ...tzBtcContract.methods.approve(lqt_address, maxTokensSold).toTransferParams(),
        },
        {
          kind: OpKind.TRANSACTION,
          ...lbContract.methods.addLiquidity(accountPkh, lqtReceived - 3, maxTokensSold, deadline).toTransferParams(),
          amount: parseSrtToNum(inputValues.XTZ),
          mutez: true,
        },
        {
          kind: OpKind.TRANSACTION,
          ...tzBtcContract.methods.approve(lqt_address, 0).toTransferParams(),
        },
      ])
      .send()
    await batchOp.confirmation()
  }

  // If switch is enabled
  const OnlyXTZ = () => (
    <>
      <Input
        placeholder={'XTZ'}
        name="XTZ"
        onChange={inputChangeHandler}
        type={'number'}
        kind={'LB'}
        value={inputValues.XTZ}
        convertedValue={parseSrtToNum(inputValues.XTZ) * coinPrices.tezos.usd}
        icon={'XTZ_tezos'}
        pinnedText={'XTZ'}
        useMaxHandler={() => {
          inputChangeHandler({
            target: {
              name: 'XTZ',
              value: xtzBalance,
            },
          })
        }}
        userBalance={xtzBalance}
        onBlur={() => {
          if (inputValues.XTZ === '') {
            setInputValues({
              ...inputValues,
              XTZ: 0,
            })
          }
        }}
        onFocus={() => {
          if (parseSrtToNum(inputValues.XTZ) === 0) {
            setInputValues({
              ...inputValues,
              XTZ: '',
            })
          }
        }}
      />

      <div className="step-wrapper">
        <StepBlock style={{ marginTop: '20px' }}>
          <div className="step">1</div>
          Swap
        </StepBlock>

        <CoinSwap
          icon={{ name: 'exchange', width: 22, height: 15 }}
          XTZCoinData={{
            icon: 'XTZ_tezos',
            amount: Number(inputValues.XTZ),
          }}
          tzBTCCoinData={{
            icon: 'tzBTC',
            amount: coinPrices.tezos.usd / coinPrices.tzbtc.usd,
          }}
        />
        <HorisontalInfo>
          <CustomizedText fontWidth={500}>Minimum tzBTC Received</CustomizedText>

          <CustomizedText fontWidth={500} color={cyanColor}>
            <CommaNumber value={0} showDecimal endingText="tzBTC" />
          </CustomizedText>
        </HorisontalInfo>
      </div>

      <hr />

      <div className="step-wrapper">
        <StepBlock>
          <div className="step">2</div>Add Liquidity
        </StepBlock>

        <CoinSwap
          icon={{ name: 'plus', width: 8, height: 14 }}
          XTZCoinData={{
            icon: 'XTZ_tezos',
            amount: Number(inputValues.XTZ),
          }}
          tzBTCCoinData={{
            icon: 'tzBTC',
            amount: (coinPrices.tezos.usd * Number(inputValues.XTZ)) / coinPrices.tzbtc.usd,
          }}
        />
        <HorisontalInfo>
          <CustomizedText fontWidth={500}>Liquidity Tokens created</CustomizedText>

          <CustomizedText fontWidth={500} color={cyanColor}>
            <CommaNumber value={lqtReceived} showDecimal endingText="LBT" />
          </CustomizedText>
        </HorisontalInfo>
      </div>
    </>
  )

  // If switch is disabled
  const XtzAndTzBTC = () => (
    <>
      <div className="input-wrapper">
        <Input
          placeholder={'XTZ'}
          name="XTZ"
          onChange={inputChangeHandler}
          type={'number'}
          kind={'LB'}
          value={inputValues.XTZ}
          convertedValue={parseSrtToNum(inputValues.XTZ) * coinPrices.tezos.usd}
          icon={'XTZ_tezos'}
          pinnedText={'XTZ'}
          useMaxHandler={() => {
            inputChangeHandler({
              target: {
                name: 'XTZ',
                value: xtzBalance,
              },
            })
          }}
          userBalance={xtzBalance}
          onBlur={() => {
            if (inputValues.XTZ === '') {
              setInputValues({
                ...inputValues,
                XTZ: 0,
              })
            }
          }}
          onFocus={() => {
            if (parseSrtToNum(inputValues.XTZ) === 0) {
              setInputValues({
                ...inputValues,
                XTZ: '',
              })
            }
          }}
        />
        <span>+</span>
        <Input
          placeholder={'tzBTC'}
          name="tzBTC"
          onChange={inputChangeHandler}
          type={'number'}
          kind={'LB'}
          value={inputValues.tzBTC}
          convertedValue={parseSrtToNum(inputValues.tzBTC) * coinPrices.tzbtc.usd}
          icon={'tzBTC'}
          pinnedText={'tzBTC'}
          useMaxHandler={() => {
            inputChangeHandler({
              target: {
                name: 'tzBTC',
                value: tzBTCBalance,
              },
            })
          }}
          userBalance={tzBTCBalance}
          onBlur={() => {
            if (inputValues.tzBTC === '') {
              setInputValues({
                ...inputValues,
                tzBTC: 0,
              })
            }
          }}
          onFocus={() => {
            if (parseSrtToNum(inputValues.tzBTC) === 0) {
              setInputValues({
                ...inputValues,
                tzBTC: '',
              })
            }
          }}
        />
      </div>

      <HorisontalInfo>
        <CustomizedText fontWidth={500}>Liquidity Tokens created</CustomizedText>

        <CustomizedText fontWidth={500} color={cyanColor}>
          <CommaNumber value={lqtReceived} showDecimal endingText="LBT" />
        </CustomizedText>
      </HorisontalInfo>
    </>
  )

  return (
    <ActionScreenWrapper className="liquidity swap">
      <hr />
      <div className="switch-wrapper">
        <div className="top">
          <CustomizedText fontSize={16} color={subHeaderColor} fontWidth={500}>
            Provide only XTZ
          </CustomizedText>

          <CheckBoxWrapper>
            <CheckBox
              id="checkbox"
              type="checkbox"
              checked={switchValue}
              onChange={() => {
                setInputValues({
                  XTZ: 0,
                  tzBTC: 0,
                })
                setSwitchValue(!switchValue)
              }}
            />
            <CheckBoxLabel htmlFor="checkbox" />
          </CheckBoxWrapper>
        </div>
        {switchValue && (
          <CustomizedText fontSize={14} fontWidth={400} style={{ marginTop: '10px' }}>
            You can add liquidity with only XTZ. <br />A swap of half the XTZ to tzBTC will be done first.
          </CustomizedText>
        )}
      </div>

      <hr />

      {switchValue ? <OnlyXTZ /> : <XtzAndTzBTC />}

      <Button
        text={'Add Liquidity'}
        icon={'plusDark'}
        onClick={addLiquidityHandler}
        className="addLiquidity_btn LB"
        kind={PRIMARY}
      />

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={0} />
        <MinimumReceived minimumRecived={[{ value: minlqtReceived, tokenName: 'LBT' }]} />
        <Slippage
          onClickHandler={(value: number) => slippageChangeHandler(value.toString(), false)}
          selectedToogle={selectedSlippage}
        />
        {selectedSlippage === -1 ? (
          <Input
            placeholder={'Slippage'}
            name="slippageInput"
            kind="primary"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => slippageChangeHandler(e.target.value, true)}
            type={'tel'}
            value={slippageValue}
            onBlur={() => {
              if (slippageValue === '') setSlippageValue('0')
            }}
            onFocus={() => {
              if (parseSrtToNum(slippageValue) === 0) {
                setSlippageValue('')
              }
            }}
          />
        ) : null}
      </LBActionBottomWrapperStyled>
    </ActionScreenWrapper>
  )
}

import React, { useState } from 'react'
import { TezosToolkit, OpKind } from '@taquito/taquito'
import { useSelector } from 'react-redux'

import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { cyanColor, subHeaderColor } from 'styles'

import { Button } from 'app/App.components/Button/Button.controller'
import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'

import { CustomizedText, HorisontalInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { ActionScreenWrapper, CheckBox, CheckBoxLabel, CheckBoxWrapper, StepBlock } from '../LBAction.style'
import { State } from 'utils/interfaces'
import { ENVIRONMENT } from 'utils/consts'
import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'
import { Slippage } from 'app/App.components/LBActionBottomFields/Slippage.contoller'

export const LBAddLiquidity = () => {
  const {
    lbData: { xtz_pool, lqt_address, token_address, lqt_total },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const { accountPkh } = useSelector((state: State) => state.wallet)

  const [inputValues, setInputValues] = useState({
    XTZ: 0,
    tzBTC: 0,
  })
  const [selectedToogle, setSeletedToggle] = useState(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [switchValue, setSwitchValue] = useState(false)
  const [minimumLBTRecived, setMinimumLBTRecived] = useState(0)

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'XTZ') setMinimumLBTRecived(Math.floor((Number(value) * lqt_total) / xtz_pool))

    setInputValues({
      ...inputValues,
      [name]: value,
    })
  }

  const addLiquidityHandler = async () => {
    const Tezos = new TezosToolkit(ENVIRONMENT.rpcLink)
    const lbContract = await Tezos.wallet.at(lqt_address)
    const tzBtcContract = await Tezos.wallet.at(token_address)
    const maxTokensSold = Math.floor(inputValues.tzBTC + (inputValues.tzBTC * Number(selectedToogle)) / 100)
    const minLqtMinted = Math.floor((inputValues.XTZ * lqt_total) / xtz_pool)
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
          ...lbContract.methods.addLiquidity(accountPkh, minLqtMinted - 3, maxTokensSold, deadline).toTransferParams(),
          amount: inputValues.XTZ,
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

  return (
    <ActionScreenWrapper className="liquidity swap">
      <hr />
      <div className="switch-wrapper">
        <div className="top">
          <CustomizedText fontSize={16} color={subHeaderColor} fontWidth={500}>
            Provide only XTZ
          </CustomizedText>

          <CheckBoxWrapper>
            <CheckBox id="checkbox" type="checkbox" checked={switchValue} />
            <CheckBoxLabel
              htmlFor="checkbox"
              onClick={() => {
                setInputValues({
                  XTZ: 0,
                  tzBTC: 0,
                })
                setSwitchValue(!switchValue)
              }}
            />
          </CheckBoxWrapper>
        </div>
        {switchValue && (
          <CustomizedText fontSize={14} fontWidth={400} style={{ marginTop: '10px' }}>
            You can add liquidity with only XTZ. <br />A swap of half the XTZ to tzBTC will be done first.
          </CustomizedText>
        )}
      </div>

      <hr />

      {switchValue ? (
        <>
          <Input
            placeholder={'XTZ'}
            name="XTZ"
            onChange={inputChangeHandler}
            type={'number'}
            kind={'LB'}
            value={inputValues.XTZ}
            convertedValue={inputValues.XTZ * coinPrices.tezos.usd}
            icon={'XTZ_tezos'}
            pinnedText={'XTZ'}
            useMaxHandler={() => {}}
            userBalance={87}
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
                <CommaNumber value={minimumLBTRecived} showDecimal endingText="LBT" />
              </CustomizedText>
            </HorisontalInfo>
          </div>
        </>
      ) : (
        <>
          <div className="input-wrapper">
            <Input
              placeholder={'XTZ'}
              name="XTZ"
              onChange={inputChangeHandler}
              type={'number'}
              kind={'LB'}
              value={inputValues.XTZ}
              convertedValue={inputValues.XTZ * coinPrices.tezos.usd}
              icon={'XTZ_tezos'}
              pinnedText={'XTZ'}
              useMaxHandler={() => {}}
              userBalance={87}
            />
            <span>+</span>
            <Input
              placeholder={'tzBTC'}
              name="tzBTC"
              onChange={inputChangeHandler}
              type={'number'}
              kind={'LB'}
              value={inputValues.tzBTC}
              convertedValue={inputValues.tzBTC * coinPrices.tzbtc.usd}
              icon={'tzBTC'}
              pinnedText={'tzBTC'}
              useMaxHandler={() => {}}
              userBalance={87}
            />
          </div>

          <HorisontalInfo>
            <CustomizedText fontWidth={500}>Liquidity Tokens created</CustomizedText>

            <CustomizedText fontWidth={500} color={cyanColor}>
              <CommaNumber value={minimumLBTRecived} showDecimal endingText="LBT" />
            </CustomizedText>
          </HorisontalInfo>
        </>
      )}

      <Button
        text={'Add Liquidity'}
        icon={'plusDark'}
        onClick={addLiquidityHandler}
        className="addLiquidity_btn"
        kind={PRIMARY}
      />

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={0} />
        <MinimumReceived minimumRecived={[{ value: 0, tokenName: 'LBT' }]} />
        <Slippage
          onClickHandler={(value: unknown) => setSeletedToggle(value as number)}
          selectedToogle={selectedToogle}
        />
      </LBActionBottomWrapperStyled>
    </ActionScreenWrapper>
  )
}

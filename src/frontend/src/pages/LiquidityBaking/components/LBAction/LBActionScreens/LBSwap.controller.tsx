import { TezosToolkit } from '@taquito/taquito'
import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { swapCalculateCoinReceive } from 'utils/DEX/swapUtils'
import env from 'utils/env'
import { getSettings } from 'utils/DEX/DexCalcs'
import { parseSrtToNum, slippagePersentToValue } from 'utils/utils'
import { xtzToTzBTCSwap, tzbtcToXtzSwap } from '../helpers/swap.utils'

import { State } from 'utils/interfaces'

import { Button } from 'app/App.components/Button/Button.controller'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { Slippage } from 'app/App.components/LBActionBottomFields/Slippage.contoller'

import { CustomizedText, VertInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { cyanColor } from 'styles'
import { ActionScreenWrapper } from '../LBAction.style'

type CoinsOrderType = {
  from: 'XTZ' | 'tzBTC'
  to: 'tzBTC' | 'XTZ'
}

type CoinsInputsValues = {
  XTZ: string | number
  tzBTC: string | number
}
const DEFAULT_COINS_ORDER: CoinsOrderType = {
  from: 'XTZ',
  to: 'tzBTC',
}

const DEFAULT_COINS_AMOUNT = {
  XTZ: 0,
  tzBTC: 0,
}

const dex = getSettings('liquidity')

export const LBSwap = ({ ready }: { ready: boolean }) => {
  const {
    lbData: { xtz_pool, token_pool, address, token_address },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const { accountPkh } = useSelector((state: State) => state.wallet)
  const { xtzBalance, tzBTCBalance } = useSelector((state: State) => state.user)

  const [selectedSlippage, setSelectedSlippage] = useState<number>(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippagePersent, setSlippagePersent] = useState<string | number>(SLIPPAGE_TOGGLE_VALUES[0].value.toString())
  const [minReceived, setMinReceived] = useState(0)
  const [priceImpact, setPriceImpact] = useState(0)
  const [isRevertedCoins, setIsRevertedCoins] = useState<CoinsOrderType>(DEFAULT_COINS_ORDER)
  const [inputValues, setInputValues] = useState<CoinsInputsValues>(DEFAULT_COINS_AMOUNT)

  const BALANCE_BY_COIN = useMemo(
    () => ({
      XTZ: xtzBalance,
      tzBTC: tzBTCBalance,
    }),
    [tzBTCBalance, xtzBalance],
  )

  const dynamicSwapCalculations = ({
    newSlippageValue,
    newCoinAmountValue,
    newFromValue,
    newToValue,
  }: {
    newSlippageValue?: string | number
    newCoinAmountValue?: string | number
    newFromValue?: 'XTZ' | 'tzBTC'
    newToValue?: 'XTZ' | 'tzBTC'
  }) => {
    const convertedSlippagePersentToValue = slippagePersentToValue(newSlippageValue || slippagePersent)
    const { expected, priceImpact, minimum } = swapCalculateCoinReceive(
      newFromValue || isRevertedCoins.from,
      newToValue || isRevertedCoins.to,
      parseSrtToNum(newCoinAmountValue || inputValues[isRevertedCoins.from]),
      xtz_pool,
      token_pool,
      convertedSlippagePersentToValue,
      dex,
    )

    setInputValues({
      ...inputValues,
      [isRevertedCoins.to]: parseSrtToNum(expected.toFixed(5)),
    })
    setMinReceived(minimum)
    setPriceImpact(priceImpact)
  }

  // handle slippage value changing
  const slippageChangeHandler = (value: string, isInput?: boolean) => {
    const newSlippageValue = parseSrtToNum(value) < 0 ? 0 : value
    if (+newSlippageValue >= 0 && +newSlippageValue <= 100) {
      setSlippagePersent(newSlippageValue)
      dynamicSwapCalculations({ newSlippageValue })
    }

    if (!isInput) {
      setSelectedSlippage(parseSrtToNum(value))
    }
  }

  // handling dynamic filling second input on input change
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    let { name, value } = e.target
    if (+value < 0) return

    const isTypingBottomInput = name === isRevertedCoins.to

    if (isTypingBottomInput) {
      setIsRevertedCoins({
        from: isRevertedCoins.to,
        to: isRevertedCoins.from,
      })
    }

    dynamicSwapCalculations({
      newCoinAmountValue: value,
      newFromValue: isTypingBottomInput ? isRevertedCoins.to : isRevertedCoins.from,
      newToValue: isTypingBottomInput ? isRevertedCoins.from : isRevertedCoins.to,
    })
  }

  // performing swap for xtz=>tzBTC & tzBTC=>xtz
  const swapBtnHandler = async () => {
    if (!accountPkh) return
    try {
      const Tezos = new TezosToolkit(env.rpcLink)
      const lbContract = await Tezos.wallet.at(address)
      const deadline = new Date(Date.now() + 60000).toISOString()

      // if XTZ => tzBTC perform %xtzToToken
      if (isRevertedCoins.from === 'XTZ' && isRevertedCoins.to === 'tzBTC') {
        try {
          await xtzToTzBTCSwap({
            dex,
            token_pool,
            xtz_pool,
            deadline,
            lbContract,
            xtzAmount: inputValues.XTZ,
            slippage: slippagePersent,
            accountAddress: accountPkh,
          })
        } catch (e: any) {
          console.error('swap XTZ => tzBTC error', e.message)
        }
      }

      // if tzBTC => XTZ perform %tokenToXtz
      if (isRevertedCoins.from === 'tzBTC' && isRevertedCoins.to === 'XTZ') {
        try {
          const tzBtcContract = await Tezos.wallet.at(token_address)
          await tzbtcToXtzSwap({
            dex,
            token_pool,
            xtz_pool,
            deadline,
            lbContract,
            Tezos,
            tzBtcContract,
            tzBTCAmount: inputValues.XTZ,
            slippage: slippagePersent,
            accountAddress: accountPkh,
          })
        } catch (e: any) {
          console.error('swap tzBTC => XTZ error', e.message)
        }
      }

      setInputValues({
        XTZ: 0,
        tzBTC: 0,
      })
    } catch (e: any) {
      console.error('swapBtnHandler initializing params error', e.message)
    }
  }

  // handling use max button
  const maxHandler = useCallback(
    (from: 'XTZ' | 'tzBTC', to: 'tzBTC' | 'XTZ') => {
      setIsRevertedCoins({
        from,
        to,
      })

      dynamicSwapCalculations({
        newCoinAmountValue: BALANCE_BY_COIN[from],
        newFromValue: from,
        newToValue: to,
      })
    },
    [BALANCE_BY_COIN, inputValues, slippagePersent, token_pool, xtz_pool],
  )

  return (
    <ActionScreenWrapper className="swap">
      <div className={`exchange-block ${isRevertedCoins.from !== 'XTZ' ? 'reverted' : ''}`}>
        <CustomizedText>XTZ</CustomizedText>
        <svg
          onClick={() =>
            setIsRevertedCoins({
              from: isRevertedCoins.to,
              to: isRevertedCoins.from,
            })
          }
        >
          <use xlinkHref="/icons/sprites.svg#exchange" />
        </svg>
        <CustomizedText>tzBTC</CustomizedText>
      </div>

      <div className={`input-wrapper ${isRevertedCoins.from !== 'XTZ' ? 'reverted' : ''}`}>
        <Input
          placeholder={''}
          name="XTZ"
          onChange={inputChangeHandler}
          type={'number'}
          kind={'LB'}
          value={inputValues.XTZ}
          convertedValue={parseSrtToNum(inputValues.XTZ) * coinPrices.tezos.usd}
          icon={'XTZ_tezos'}
          pinnedText={'XTZ'}
          useMaxHandler={() => maxHandler('XTZ', 'tzBTC')}
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

        <svg
          onClick={() =>
            setIsRevertedCoins({
              from: isRevertedCoins.to,
              to: isRevertedCoins.from,
            })
          }
        >
          <use xlinkHref="/icons/sprites.svg#exchange" />
        </svg>

        <Input
          placeholder={''}
          name="tzBTC"
          onChange={inputChangeHandler}
          type={'tel'}
          kind={'LB'}
          value={inputValues.tzBTC}
          convertedValue={parseSrtToNum(inputValues.tzBTC) * coinPrices.tzbtc.usd}
          icon={'tzBTC'}
          pinnedText={'tzBTC'}
          useMaxHandler={() => maxHandler('tzBTC', 'XTZ')}
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

      {ready ? (
        <Button text={'Swap'} icon={'swapBtnIcon'} onClick={swapBtnHandler} className="swap_btn LB" kind={PRIMARY} />
      ) : (
        <ConnectWallet className="swap-action" />
      )}

      <VertInfo>
        <CustomizedText fontWidth={500}>Exchange Rate</CustomizedText>

        <CustomizedText color={cyanColor} fontWidth={500}>
          1 XTZ (<CommaNumber beginningText="$" value={coinPrices.tezos.usd} /> ) = &nbsp;
          <CommaNumber
            value={coinPrices.tezos.usd / coinPrices.tzbtc.usd}
            showDecimal
            decimalsToShow={8}
            endingText="tzBTC"
          />
        </CustomizedText>
      </VertInfo>

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={priceImpact} />
        <MinimumReceived minimumRecived={[{ value: minReceived, tokenName: isRevertedCoins.to }]} />
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
            value={slippagePersent}
            onBlur={() => {
              if (slippagePersent === '') setSlippagePersent('0')
            }}
            onFocus={() => {
              if (parseSrtToNum(slippagePersent) === 0) {
                setSlippagePersent('')
              }
            }}
          />
        ) : null}
      </LBActionBottomWrapperStyled>
    </ActionScreenWrapper>
  )
}

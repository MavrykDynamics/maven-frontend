import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { getSettings } from 'utils/DEX/DexCalcs'
import { nonNumberSymbolsValidation, parseSrtToNum, slippagePercentToValue } from 'utils/utils'
// @ts-ignore
import dexterCalculations from 'dexCalcs/dist/index-mobile.min'
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
import { cyanColor, subHeaderColor } from 'styles'
import { ActionScreenWrapper } from '../LBAction.style'
import { Dex } from '../../../../../utils/DEX/Dex'
import { swapTokenToXtz, swapXtzToToken } from '../../../../../redux/actions/swap.action'

import { calculateTokenToXtz as CalcTokenToXtz, calculateXtzToToken as CalcXtzToToken } from 'utils/DEX/swapUtils'
import { LBGeneralStats } from '../../../LiquidityBaking.view'
import { PRECISION_NUMBER_EIGHT_ZEROES, PRECISION_NUMBER_SIX_ZEROES } from 'utils/consts'

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
const dexType = getSettings('liquidity')

export const LBSwap = ({ ready, generalDexStats }: { ready: boolean; generalDexStats: LBGeneralStats }) => {
  const dispatch = useDispatch()
  const { coinPrices } = useSelector((state: State) => state.tokens)
  const { xtzBalance, tzBTCBalance } = useSelector((state: State) => state.user)

  const [selectedSlippage, setSelectedSlippage] = useState<number>(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippagePercent, setSlippagePercent] = useState<string | number>(SLIPPAGE_TOGGLE_VALUES[0].value.toString())
  const [minReceived, setMinReceived] = useState(0)
  const [priceImpact, setPriceImpact] = useState(0)
  const [isRevertedCoins, setIsRevertedCoins] = useState<CoinsOrderType>(DEFAULT_COINS_ORDER)
  const [inputValues, setInputValues] = useState<CoinsInputsValues>(DEFAULT_COINS_AMOUNT)
  const [exchangeRate, setExchangeRate] = useState<number>(0)
  const [amountToSwap, setAmountToSwap] = useState(0)

  const BALANCE_BY_COIN = useMemo(
    () => ({
      XTZ: xtzBalance,
      tzBTC: tzBTCBalance,
    }),
    [tzBTCBalance, xtzBalance],
  )

  useEffect(() => {
    setInputValues(DEFAULT_COINS_AMOUNT)
  }, [ready])

  useEffect(() => {
    setExchangeRate(Number(coinPrices.tzbtc.usd))
  }, [coinPrices.tzbtc.usd])

  const calculateTokenToXtz = (amount: number) => {
    console.log('logging input of calculateTokenToXTZ', amount)
    const convertedSlippagePercentToValue = slippagePercentToValue(slippagePercent)

    const { expected, minimum, rate, priceImpact } = CalcTokenToXtz(
      amount,
      generalDexStats.tezPool,
      generalDexStats.tokenPool,
      convertedSlippagePercentToValue,
      dexType,
    )
    console.log('logging result of calculateTokenToXTZ', expected, minimum, rate, priceImpact)
    setInputValues({
      ...inputValues,
      tzBTC: amount,
      XTZ: expected,
    })

    setExchangeRate(rate)
    setMinReceived(minimum)
    setPriceImpact(priceImpact)
  }

  const calculateXtzToToken = (amount: number) => {
    const convertedSlippagePercentToValue = slippagePercentToValue(slippagePercent)
    const { expected, minimum, rate, priceImpact } = CalcXtzToToken(
      amount,
      generalDexStats.tezPool,
      generalDexStats.tokenPool,
      convertedSlippagePercentToValue,
      dexType,
    )
    setInputValues({
      ...inputValues,
      tzBTC: expected,
      XTZ: amount,
    })
    setExchangeRate(rate)
    setMinReceived(minimum)
    setPriceImpact(priceImpact)
  }

  const dynamicSwapCalculations = ({
    newSlippagePersent,
    newCoinAmountValue,
    newFromValue,
    newToValue,
  }: {
    newSlippagePersent?: string | number
    newCoinAmountValue?: string | number
    newFromValue?: 'XTZ' | 'tzBTC'
    newToValue?: 'XTZ' | 'tzBTC'
  }) => {
    const convertedSlippagePersentToValue = slippagePercentToValue(newSlippagePersent ?? slippagePercent)
    // const { expected, priceImpact, minimum } = swapCalculateCoinReceive(
    //   newFromValue || isRevertedCoins.from,
    //   newToValue || isRevertedCoins.to,
    //   parseSrtToNum(newCoinAmountValue ?? inputValues[isRevertedCoins.from]),
    //   xtz_pool,
    //   token_pool,
    //   convertedSlippagePersentToValue,
    //     dexSettings,
    // )

    // setInputValues({
    //   ...inputValues,
    //   [newFromValue || isRevertedCoins.from]: newCoinAmountValue ?? inputValues[isRevertedCoins.from],
    //   [newToValue || isRevertedCoins.to]: parseSrtToNum(expected.toFixed(5)),
    // })
    // setMinReceived(minimum)
    // setPriceImpact(priceImpact)
  }

  // handle slippage value changing
  const slippageChangeHandler = (value: string | number, isInput?: boolean) => {
    const newSlippagePercent = Number(parseSrtToNum(value) < 0 ? 0 : value)
    if (newSlippagePercent >= 0 && newSlippagePercent <= 100) {
      setSlippagePercent(value)
      dynamicSwapCalculations({ newSlippagePersent: newSlippagePercent })
    }

    if (!isInput) {
      setSelectedSlippage(parseSrtToNum(value))
    }
  }

  // handling dynamic filling second input on input change
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    let { name, value } = e.target
    // if (+value < 0 || (ready && +value > (name === 'XTZ' ? xtzBalance : tzBTCBalance))) return
    if (+value < 0) return
    const isTypingBottomInput = name === isRevertedCoins.to

    if (isTypingBottomInput) {
      setIsRevertedCoins({
        from: isRevertedCoins.to,
        to: isRevertedCoins.from,
      })
    }

    if (name === 'XTZ') {
      setAmountToSwap(parseFloat(value))
      calculateXtzToToken(parseFloat(value))
    } else {
      setAmountToSwap(parseFloat(value))
      calculateTokenToXtz(parseFloat(value))
    }
  }

  // performing swap for xtz=>tzBTC & tzBTC=>xtz
  const swapBtnHandler = async () => {
    try {
      // if XTZ => tzBTC perform %xtzToToken
      if (isRevertedCoins.from === 'XTZ' && isRevertedCoins.to === 'tzBTC') {
        dispatch(swapXtzToToken(amountToSwap, minReceived * PRECISION_NUMBER_EIGHT_ZEROES))
      }

      // if tzBTC => XTZ perform %tokenToXtz
      if (isRevertedCoins.from === 'tzBTC' && isRevertedCoins.to === 'XTZ') {
        try {
          dispatch(
            swapTokenToXtz(amountToSwap * PRECISION_NUMBER_EIGHT_ZEROES, minReceived * PRECISION_NUMBER_SIX_ZEROES),
          )
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
    [BALANCE_BY_COIN, inputValues, slippagePercent],
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
          onKeyDown={nonNumberSymbolsValidation}
          onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
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
          type={'number'}
          kind={'LB'}
          value={inputValues.tzBTC}
          convertedValue={parseSrtToNum(inputValues.tzBTC) * coinPrices.tzbtc.usd}
          icon={'tzBTC'}
          pinnedText={'tzBTC'}
          useMaxHandler={() => maxHandler('tzBTC', 'XTZ')}
          userBalance={tzBTCBalance}
          onKeyDown={nonNumberSymbolsValidation}
          onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
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

      <LBActionBottomWrapperStyled>
        <div className="exchange-rate">
          <CustomizedText color={subHeaderColor} fontWidth={500}>
            Exchange Rate
          </CustomizedText>
          <CustomizedText color={cyanColor} fontWidth={500}>
            1 XTZ (<CommaNumber beginningText="$" value={coinPrices.tezos.usd} /> ) = &nbsp;
            <CommaNumber
              value={coinPrices.tezos.usd / exchangeRate}
              showDecimal
              decimalsToShow={8}
              endingText="tzBTC"
            />
          </CustomizedText>
        </div>
        <PriceImpact priceImpact={priceImpact} />
        <MinimumReceived minimumReceived={[{ value: minReceived, tokenName: isRevertedCoins.to }]} />
        <Slippage
          onClickHandler={(value) => slippageChangeHandler(value, false)}
          selectedToogle={selectedSlippage}
          setSlippagePersent={setSlippagePercent}
          slippagePersent={slippagePercent}
        />
      </LBActionBottomWrapperStyled>
    </ActionScreenWrapper>
  )
}

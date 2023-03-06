import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ACTION_PRIMARY } from 'app/App.components/Button/Button.constants'
import { PRIMARY_COLOR, SECONDARY_COLOR } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { getSettings, SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { nonNumberSymbolsValidation, parseSrtToNum, slippagePercentToValue } from 'utils/utils'
import { State } from 'utils/interfaces'

import { Button } from 'app/App.components/Button/Button.controller'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'
import { Input, InputStatusType } from 'app/App.components/Input/Input.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { Slippage } from 'app/App.components/LBActionBottomFields/Slippage.contoller'

import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { swapTokenToXtz, swapXtzToToken } from '../../../../../redux/actions/swap.action'

import { calculateTokenToXtz as CalcTokenToXtz, calculateXtzToToken as CalcXtzToToken } from 'utils/DEX/swapUtils'
import { LBGeneralStats } from '../../../LiquidityBaking.view'
import { PRECISION_NUMBER_EIGHT_ZEROES, PRECISION_NUMBER_SIX_ZEROES } from 'utils/consts'
import { useMedia } from 'react-use'
import { ERROR } from 'app/App.components/Toaster/Toaster.constants'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { getFullNumber } from '../../../../../utils/utils'
import { log } from 'console'

type CoinsOrderType = {
  from: 'XTZ' | 'tzBTC'
  to: 'tzBTC' | 'XTZ'
}

type CoinsInputsValues = {
  XTZ: string | number
  tzBTC: string | number
}

type CoinsInputsErrors = {
  XTZ: InputStatusType
  tzBTC: InputStatusType
}

const DEFAULT_COINS_ERRORS = {
  XTZ: '' as InputStatusType,
  tzBTC: '' as InputStatusType,
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

const MIN_AMOUNT_XTZ = 0.000001
const MIN_AMOUNT_tzBTC = 0.00000001

const isValidXTZ = (xtz: string | number) => {
  const [int, decimal] = getFullNumber(xtz)?.toString().split('.') ?? ['', '']

  if (decimal?.length > 6) {
    return false
  }

  return true
}

const isValidTZBTC = (tzBTC: string | number) => {
  const [int, decimal] = getFullNumber(tzBTC)?.toString().split('.') ?? ['', '']

  if (decimal?.length > 8) {
    return false
  }

  return true
}

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
  const [inputErrors, setInputErrors] = useState<CoinsInputsErrors>(DEFAULT_COINS_ERRORS)
  const [exchangeRate, setExchangeRate] = useState<number>(0)
  const [clearOnSwitch, setClearOnSwitch] = useState(false)
  const [amountToSwap, setAmountToSwap] = useState(0)

  const isMobile = useMedia('(max-width: 500px)')

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

  const calculateTokenToXtz = (amount: number) => {
    const convertedSlippagePercentToValue = slippagePercentToValue(slippagePercent)

    const { expected, minimum, rate, priceImpact } = CalcTokenToXtz(
      amount,
      generalDexStats.tezPool,
      generalDexStats.tokenPool,
      convertedSlippagePercentToValue,
      dexType,
    )

    return { XTZ_Value: expected, minimum, priceImpact, rate: amount !== 0 ? rate : Number(coinPrices.tzbtc.usd) }
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
    return { tzBTCValue: expected, minimum, priceImpact, rate: amount !== 0 ? rate : exchangeRate }
  }

  useEffect(() => {
    const { rate } = calculateXtzToToken(1)
    setExchangeRate(rate)
  }, [generalDexStats])

  // handle slippage value changing
  const slippageChangeHandler = (value: string | number, isInput?: boolean) => {
    const newSlippagePercent = Number(parseSrtToNum(value) < 0 ? 0 : value)
    if (newSlippagePercent >= 0 && newSlippagePercent <= 100) {
      setSlippagePercent(value)
    }

    if (!isInput) {
      setSelectedSlippage(parseSrtToNum(value))
    }
  }

  // handling dynamic filling second input on input change
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    let { name, value } = e.target
    const isTypingBottomInput = name === isRevertedCoins.to
    setInputErrors(DEFAULT_COINS_ERRORS)
    setClearOnSwitch(false)

    if (+value < 0 || (ready && !isTypingBottomInput && +value > (name === 'XTZ' ? xtzBalance : tzBTCBalance))) {
      dispatch(showToaster(ERROR, 'Insufficient wallet balance', 'Please enter sufficient amount'))
      setInputErrors({
        ...inputErrors,
        [name]: ERROR,
      })
    }

    if (name === 'XTZ' && !isValidXTZ(value)) {
      dispatch(showToaster(ERROR, 'Invalid Input', `Please input a number that exists in XTZ`))
      setInputErrors({
        ...inputErrors,
        [name]: ERROR,
      })
    }

    if (name === 'tzBTC' && !isValidTZBTC(value)) {
      dispatch(showToaster(ERROR, 'Invalid Input', `Please input a number that exists in tzBTC`))
      setInputErrors({
        ...inputErrors,
        [name]: ERROR,
      })
    }

    const parsedValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value)
    if (isTypingBottomInput) {
      if (name === 'XTZ') {
        const { tzBTCValue, rate } = calculateXtzToToken(parsedValue)
        const { minimum: XTZMinimum, priceImpact: XTZriceImpact } = calculateTokenToXtz(tzBTCValue)
        if (tzBTCValue > tzBTCBalance) {
          setInputErrors({
            ...inputErrors,
            tzBTC: ERROR,
          })
        }

        if (Number(value) > xtzBalance) {
          setClearOnSwitch(true)
        }
        setAmountToSwap(tzBTCValue)
        setInputValues({ ...inputValues, tzBTC: tzBTCValue, [name]: value })
        setMinReceived(XTZMinimum)
        setPriceImpact(XTZriceImpact)

        if (rate && XTZMinimum !== 0) {
          setExchangeRate(rate)
        }
      } else {
        const { XTZ_Value, rate } = calculateTokenToXtz(parsedValue)
        const { minimum: tzBTCMinimum, priceImpact: tzBTCPI } = calculateXtzToToken(XTZ_Value)
        if (XTZ_Value > xtzBalance) {
          setInputErrors({
            ...inputErrors,
            XTZ: ERROR,
          })
        }

        if (Number(value) > tzBTCBalance) {
          setClearOnSwitch(true)
        }
        setAmountToSwap(XTZ_Value)
        setInputValues({ ...inputValues, XTZ: XTZ_Value, [name]: value })
        setMinReceived(tzBTCMinimum)
        setPriceImpact(tzBTCPI)

        if (rate) {
          setExchangeRate(Number(coinPrices.tezos.usd) / rate)
        }
      }
    } else {
      if (name === 'XTZ') {
        const { tzBTCValue, minimum, priceImpact, rate } = calculateXtzToToken(parsedValue)

        setAmountToSwap(parsedValue)
        setInputValues({ ...inputValues, tzBTC: tzBTCValue, [name]: value })
        setMinReceived(minimum)
        setPriceImpact(priceImpact)

        if (rate && minimum !== 0) {
          setExchangeRate(rate)
        }
      } else {
        const { XTZ_Value, minimum, priceImpact, rate } = calculateTokenToXtz(parsedValue) // 0.0003
        setAmountToSwap(parsedValue)
        setInputValues({ ...inputValues, XTZ: XTZ_Value, [name]: value })
        setExchangeRate(rate || exchangeRate)
        setMinReceived(minimum)
        setPriceImpact(priceImpact)

        if (rate) {
          setExchangeRate(Number(coinPrices.tezos.usd) / rate)
        }
      }
    }
  }

  // performing swap for xtz=>tzBTC & tzBTC=>xtz
  const swapBtnHandler = async () => {
    if (inputValues.XTZ <= 0) {
      dispatch(showToaster(ERROR, 'Invalid Input', `Please input a number that exists in tzBTC`))
      return
    }

    if (inputValues.tzBTC <= 0) {
      dispatch(showToaster(ERROR, 'Invalid Input', `Please input a number that exists in XTZ`))
      return
    }

    if (clearOnSwitch || inputErrors.XTZ || inputErrors.tzBTC) {
      dispatch(showToaster(ERROR, 'Insufficient wallet balance', 'Please enter sufficient amount'))
      return
    }

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
      inputChangeHandler({ target: { name: from, value: BALANCE_BY_COIN[from].toString() } })
    },
    [BALANCE_BY_COIN, inputValues, slippagePercent],
  )

  return (
    <>
      <div className={`input-wrapper ${isRevertedCoins.from !== 'XTZ' ? 'reverted' : ''} swap-input-wrapper`}>
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
          className="swap-input"
          useMaxHandler={() => maxHandler('XTZ', 'tzBTC')}
          userBalance={xtzBalance}
          inputStatus={inputErrors.XTZ}
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
          onClick={() => {
            setIsRevertedCoins({
              from: isRevertedCoins.to,
              to: isRevertedCoins.from,
            })

            inputChangeHandler({ target: { name: isRevertedCoins.to, value: String(inputValues[isRevertedCoins.to]) } })

            if (clearOnSwitch) {
              setInputValues(DEFAULT_COINS_AMOUNT)
            }
          }}
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
          className="swap-input"
          pinnedText={'tzBTC'}
          useMaxHandler={() => maxHandler('tzBTC', 'XTZ')}
          userBalance={tzBTCBalance}
          onKeyDown={nonNumberSymbolsValidation}
          inputStatus={inputErrors.tzBTC}
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

      <div className="exchange-rate">
        <CustomizedText className={PRIMARY_COLOR} fontWidth={500} fontSize={16}>
          Exc. Rate
        </CustomizedText>
        
        <CustomizedText className={SECONDARY_COLOR} fontWidth={500} fontSize={16}>
          1 XTZ (<CommaNumber beginningText="$" value={coinPrices.tezos.usd} /> ) = &nbsp;
          <CommaNumber
            value={exchangeRate}
            showDecimal
            decimalsToShow={8}
            endingText="tzBTC"
            maxSymbols={10}
            useMaxSymbols={isMobile}
          />
        </CustomizedText>
      </div>

      {ready ? (
        <Button
          text={'Swap'}
          icon={'swapBtnIcon'}
          onClick={swapBtnHandler}
          className="LB swap-btn"
          kind={ACTION_PRIMARY}
        />
      ) : (
        <ConnectWallet className="LB swap-btn" />
      )}

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={priceImpact} />
        <MinimumReceived minimumReceived={[{ value: minReceived, tokenName: isRevertedCoins.to }]} />
        <Slippage
          onClickHandler={(value) => slippageChangeHandler(value, false)}
          selectedToogle={selectedSlippage}
          setSlippagePersent={setSlippagePercent}
          slippagePersent={slippagePercent}
        />
      </LBActionBottomWrapperStyled>
    </>
  )
}

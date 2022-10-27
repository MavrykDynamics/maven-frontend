import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSettings, SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { subHeaderColor } from 'styles'

import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { CheckBox, CheckBoxLabel, CheckBoxWrapper } from '../LBAction.style'
import { State } from 'utils/interfaces'
import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'
import { Slippage } from 'app/App.components/LBActionBottomFields/Slippage.contoller'
import { calculateAddLiquidity } from 'utils/DEX/liquidityUtils'
import { parseSrtToNum, slippagePercentToValue } from 'utils/utils'
import { AddLiquidutityInputChangeEventType, CoinsInputsValues } from '../helpers/actionsScreen.types'
import { AddLiquidityDefault } from './AddLiquidityDefault.controller'
import { AddLiquidityOnlyXTZ } from './AddLiquidityOnlyXTZ.controller'
import { Button } from 'app/App.components/Button/Button.controller'
import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'
import { PRECISION_NUMBER_EIGHT_ZEROES, PRECISION_NUMBER_SIX_ZEROES } from 'utils/consts'
import { addLiquidity, addLiquidityOnlyXTZ } from 'redux/actions/liquidity.action'
import { calculateTokenToXtz, calculateXtzToToken as CalcXtzToToken } from 'utils/DEX/swapUtils'
import Icon from 'app/App.components/Icon/Icon.view'
import { InputStatusType } from 'app/App.components/Input/Input.controller'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { ERROR } from 'app/App.components/Toaster/Toaster.constants'

const DEFAULT_COINS_AMOUNT = {
  XTZ: 0,
  tzBTC: 0,
}

export interface MinCoinsData {
  minXTZ: number
  minTzBTC: number
}

const DefaultMinCoinsData: MinCoinsData = {
  minXTZ: 0,
  minTzBTC: 0,
}

export type CoinsInputsErrors = {
  XTZ: InputStatusType
  tzBTC: InputStatusType
}

export const DEFAULT_COINS_ERRORS = {
  XTZ: '' as InputStatusType,
  tzBTC: '' as InputStatusType,
}

const dexType = getSettings('liquidity')

export const LBAddLiquidity = ({ ready, generalDexStats }: { ready: boolean; generalDexStats: any }) => {
  const dispatch = useDispatch()
  const { xtzBalance, tzBTCBalance } = useSelector((state: State) => state.user)

  const [inputValues, setInputValues] = useState<CoinsInputsValues>(DEFAULT_COINS_AMOUNT)
  const [inputErrors, setInputErrors] = useState<CoinsInputsErrors>(DEFAULT_COINS_ERRORS)
  const [onlyXtzSwapData, setOnlyXtzSwapData] = useState<CoinsInputsValues>(DEFAULT_COINS_AMOUNT)
  const [onlyXtzMinCoinsData, setOnlyXtzMinCoinsData] = useState<MinCoinsData>(DefaultMinCoinsData)
  const [selectedSlippage, setSeletedToggle] = useState(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippagePercent, setSlippagePercent] = useState<string | number>(SLIPPAGE_TOGGLE_VALUES[0].value.toString())
  const [switchValue, setSwitchValue] = useState(false)
  const [lqtReceived, setLqtReceived] = useState(0)
  const [minlqtReceived, setMinLqtReceived] = useState(0)
  const [priceImpact, setPriceImpact] = useState(0)

  useEffect(() => {
    setInputValues(DEFAULT_COINS_AMOUNT)
    setOnlyXtzSwapData(DEFAULT_COINS_AMOUNT)
    setOnlyXtzMinCoinsData(DefaultMinCoinsData)
  }, [ready])

  useEffect(() => {
    setInputErrors(DEFAULT_COINS_ERRORS)
    setInputValues(DEFAULT_COINS_AMOUNT)
  }, [switchValue])

  const calcAddLiquidityXtzAndTzbtc = (amount: number, name: string) => {
    const convertedSlippagePercentToValue = slippagePercentToValue(slippagePercent)
    let inputAmount = amount
    if (name === 'tzBTC') {
      const { expected } = calculateTokenToXtz(
        amount,
        generalDexStats.tezPool,
        generalDexStats.tokenPool,
        convertedSlippagePercentToValue,
        dexType,
      )

      inputAmount = expected
    }

    const { liquidityExpected, liquidityMinimum, required, exchangeRate } = calculateAddLiquidity(
      inputAmount,
      generalDexStats.tezPool,
      generalDexStats.tokenPool,
      generalDexStats.sharesTotal,
      convertedSlippagePercentToValue,
      dexType,
    )
    console.log(
      'logging result of calcAddLiquidityXtzAndTzbtc',
      liquidityExpected,
      liquidityMinimum,
      required,
      exchangeRate,
    )

    setLqtReceived(liquidityExpected)
    setMinLqtReceived(liquidityMinimum)

    // return required // how it was
    return name === 'tzBTC' ? inputAmount : required
  }

  const calcAddLiquidityOnlyXTZ = (amount: number) => {
    // 1. Swap half of the XTZ to tzBTC
    // 2. Calc add liquidity
    // 3. Update contract calls to adjust

    const convertedSlippagePercentToValue = slippagePercentToValue(slippagePercent)
    console.log('logging input of calcAddLiquidityOnlyXTZ', amount)
    const amountOfXtzToAdd = amount / 2
    const { expected, minimum, rate, priceImpact } = CalcXtzToToken(
      amountOfXtzToAdd,
      generalDexStats.tezPool,
      generalDexStats.tokenPool,
      convertedSlippagePercentToValue,
      dexType,
    )
    const { liquidityExpected, liquidityMinimum, required, exchangeRate } = calculateAddLiquidity(
      amountOfXtzToAdd,
      generalDexStats.tezPool,
      generalDexStats.tokenPool,
      generalDexStats.sharesTotal,
      convertedSlippagePercentToValue,
      dexType,
    )
    console.log(
      'logging result of calcAddLiquidityOnlyXTZ',
      expected,
      minimum,
      liquidityExpected,
      liquidityMinimum,
      required,
      exchangeRate,
    )

    setOnlyXtzSwapData({
      ...onlyXtzSwapData,
      XTZ: amountOfXtzToAdd,
      tzBTC: expected,
    })
    setOnlyXtzMinCoinsData({
      ...onlyXtzMinCoinsData,
      minXTZ: amountOfXtzToAdd,
      minTzBTC: minimum,
    })
    setPriceImpact(priceImpact)
    setLqtReceived(liquidityExpected)
    setMinLqtReceived(liquidityMinimum)

    return required
  }

  // input handler
  const inputChangeHandler = (e: AddLiquidutityInputChangeEventType) => {
    setInputErrors(DEFAULT_COINS_ERRORS)
    const { name, value } = e.target
    if (+value < 0 || (ready && +value > (name === 'XTZ' ? xtzBalance : tzBTCBalance))) {
      dispatch(showToaster(ERROR, 'Insufficient wallet balance', 'Please enter sufficient amount'))
      setInputErrors({
        ...inputErrors,
        [name]: ERROR,
      })
      return
    }

    if (switchValue) {
      // Only XTZ input
      const tzBTCValue = calcAddLiquidityOnlyXTZ(value !== '' ? parseFloat(value.toString()) : 0)
      setInputValues({
        ...inputValues,
        tzBTC: tzBTCValue,
        XTZ: value,
      })
    } else {
      // XTZ & tzBTC inputs
      const calcValue = calcAddLiquidityXtzAndTzbtc(value !== '' ? parseFloat(value.toString()) : 0, name)

      // if we enter XTZ we dynamic calc tzBTC amount, so check it there
      if (name === 'xtz' && ready && calcValue > tzBTCBalance) {
        dispatch(showToaster(ERROR, 'Insufficient tzBTC wallet balance', 'Please enter sufficient XTZ amount'))
        setInputErrors({
          ...inputErrors,
          tzBTC: ERROR,
        })
        return
      }

      // if we enter tzBTC we dynamic calc XTZ amount, so check it there
      if (name === 'tzBTC' && ready && calcValue > xtzBalance) {
        dispatch(showToaster(ERROR, 'Insufficient XTZ wallet balance', 'Please enter sufficient tzBTC amount'))
        setInputErrors({
          ...inputErrors,
          XTZ: ERROR,
        })
        return
      }

      setInputValues({
        ...inputValues,
        [name === 'XTZ' ? 'tzBTC' : 'XTZ']: calcValue,
        [name]: value,
      })
    }
  }

  // slippage value changing handler
  const slippageChangeHandler = (value: string | number, isInput?: boolean) => {
    const newSlippagePersent = Number(parseSrtToNum(value) < 0 ? 0 : value)
    if (newSlippagePersent >= 0 && newSlippagePersent <= 100) {
      setSlippagePercent(value)
    }

    if (!isInput) setSeletedToggle(parseSrtToNum(value))
  }

  // handle add liquidity button with xtz and tzbtc
  const addLiquidityBtnHandler = async () => {
    // Only XTZ switch is not active, so providing both XTZ and tzBTC from wallet
    if (!switchValue) {
      dispatch(
        addLiquidity(
          Number(inputValues.tzBTC) * PRECISION_NUMBER_EIGHT_ZEROES,
          Math.floor(minlqtReceived),
          Number(inputValues.XTZ) * PRECISION_NUMBER_SIX_ZEROES,
        ),
      )
    } else {
      dispatch(
        addLiquidityOnlyXTZ(
          onlyXtzMinCoinsData.minTzBTC * PRECISION_NUMBER_EIGHT_ZEROES,
          onlyXtzMinCoinsData.minXTZ * PRECISION_NUMBER_SIX_ZEROES,
          Number(inputValues.tzBTC) * PRECISION_NUMBER_EIGHT_ZEROES,
          Math.floor(minlqtReceived),
          onlyXtzMinCoinsData.minXTZ * PRECISION_NUMBER_SIX_ZEROES,
        ),
      )
    }
  }

  return (
    <>
      <div className="switch-wrapper">
        <CheckBoxWrapper>
          <CheckBox
            id="checkbox"
            type="checkbox"
            checked={switchValue}
            onChange={() => {
              setInputValues(DEFAULT_COINS_AMOUNT)
              setSwitchValue(!switchValue)
            }}
          />
          <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>

        <CustomizedText fontSize={16} color={subHeaderColor} fontWidth={500}>
          Provide only XTZ
          <div className="info">
            <Icon id="infoIcon" />
            <div className="text">
              You can add liquidity with only XTZ. <br />A swap of half the XTZ to tzBTC will be done first.
            </div>
          </div>
        </CustomizedText>
      </div>

      {switchValue ? (
        <AddLiquidityOnlyXTZ
          inputValues={inputValues}
          inputErrors={inputErrors}
          inputChangeHandler={inputChangeHandler}
          lqtReceived={lqtReceived}
          setInputValues={setInputValues}
          setInputErrors={setInputErrors}
          swapData={onlyXtzSwapData}
          minCoinsForSwap={onlyXtzMinCoinsData}
        />
      ) : (
        <AddLiquidityDefault
          inputValues={inputValues}
          inputErrors={inputErrors}
          inputChangeHandler={inputChangeHandler}
          lqtReceived={lqtReceived}
          setInputValues={setInputValues}
          setInputErrors={setInputErrors}
        />
      )}

      {ready ? (
        <Button
          text={'Add Liquidity'}
          icon={'plusDark'}
          onClick={addLiquidityBtnHandler}
          className="LB addLiq-btn"
          kind={PRIMARY}
        />
      ) : (
        <ConnectWallet className="LB addLiq-btn" />
      )}

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={priceImpact} />
        <MinimumReceived minimumReceived={[{ value: minlqtReceived, tokenName: 'SIR' }]} />
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

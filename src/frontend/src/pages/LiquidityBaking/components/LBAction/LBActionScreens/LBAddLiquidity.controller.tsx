import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { subHeaderColor } from 'styles'

import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { ActionScreenWrapper, CheckBox, CheckBoxLabel, CheckBoxWrapper } from '../LBAction.style'
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
import { getSettings } from '../../../../../utils/DEX/DexCalcs'
import { PRECISION_NUMBER_EIGHT_ZEROES, PRECISION_NUMBER_SIX_ZEROES } from 'utils/consts'
import { addLiquidity, addLiquidityOnlyXTZ } from 'redux/actions/liquidity.action'
import { calculateTokenToXtz, calculateXtzToToken as CalcXtzToToken } from 'utils/DEX/swapUtils'

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
const dexType = getSettings('liquidity')
export const LBAddLiquidity = ({ ready, generalDexStats }: { ready: boolean; generalDexStats: any }) => {
  const {
    lbData: { xtz_pool, token_pool, address, token_address, lqt_total },
  } = useSelector((state: State) => state.tokens)
  const dispatch = useDispatch()
  const { accountPkh } = useSelector((state: State) => state.wallet)
  const { xtzBalance, tzBTCBalance } = useSelector((state: State) => state.user)

  const [inputValues, setInputValues] = useState<CoinsInputsValues>(DEFAULT_COINS_AMOUNT)
  const [onlyXtzSwapData, setOnlyXtzSwapData] = useState<CoinsInputsValues>(DEFAULT_COINS_AMOUNT)
  const [onlyXtzMinCoinsData, setOnlyXtzMinCoinsData] = useState<MinCoinsData>(DefaultMinCoinsData)
  const [selectedSlippage, setSeletedToggle] = useState(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippagePercent, setSlippagePercent] = useState<string | number>(SLIPPAGE_TOGGLE_VALUES[0].value.toString())
  const [switchValue, setSwitchValue] = useState(false)
  const [lastCoinUpdated, setLastCoinUpdated] = useState<null | 'XTZ' | 'tzBTC'>(null)
  const [lqtReceived, setLqtReceived] = useState(0)
  const [minlqtReceived, setMinLqtReceived] = useState(0)
  const [priceImpact, setPriceImpact] = useState(0)

  useEffect(() => {
    setInputValues(DEFAULT_COINS_AMOUNT)
    setOnlyXtzSwapData(DEFAULT_COINS_AMOUNT)
    setOnlyXtzMinCoinsData(DefaultMinCoinsData)
  }, [ready])

  const calcAddLiquidityXtzAndTzbtc = (amount: number, name: string) => {
    const convertedSlippagePercentToValue = slippagePercentToValue(slippagePercent)
    let inputAmount = amount
    if (name === 'tzBTC') {
      const { expected, minimum, rate, priceImpact } = calculateTokenToXtz(
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
    setInputValues({
      ...inputValues,
      tzBTC: required,
      XTZ: inputAmount,
    })

    setLqtReceived(liquidityExpected)
    setMinLqtReceived(liquidityMinimum)
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
    setInputValues({
      ...inputValues,
      tzBTC: required,
      XTZ: amount,
    })
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
  }

  // Dynamic calculations for only XTZ block
  const onlyXTZCalculations = (
    coinName: 'XTZ' | 'tzBTC',
    coinAmount: number | string,
    newSlippagePersent?: number | string,
  ) => {
    const convertedSlippagePersentToValue = slippagePercentToValue(newSlippagePersent ?? slippagePercent)
    setInputValues({
      ...inputValues,
      [coinName]: coinAmount,
    })

    // const tokemAmoutReceive = swapCalculateCoinReceive(
    //   'XTZ',
    //   'tzBTC',
    //   parseSrtToNum(coinAmount),
    //   xtz_pool,
    //   token_pool,
    //   convertedSlippagePersentToValue,
    //   dex,
    // )

    // setOnlyXtzSwapData({
    //   ...onlyXtzSwapData,
    //   XTZ: parseSrtToNum(coinAmount) / 2,
    //   tzBTC: tokemAmoutReceive.expected,
    // })

    // const { expected, minimum } = addLiquidityReturn(
    //   parseSrtToNum(onlyXtzSwapData.XTZ),
    //   xtz_pool,
    //   lqt_total,
    //   convertedSlippagePersentToValue,
    //   dex,
    // )
    // setLqtReceived(expected.value)
    // setMinLqtReceived(minimum.value)
  }

  // Dynamic calculations for XTZ&tzBTC block
  const xtzTzbtcCalculations = (
    coinName: 'XTZ' | 'tzBTC',
    coinAmount: number | string,
    newSlippagePersent?: number | string,
  ) => {
    const convertedSlippagePersentToValue = slippagePercentToValue(newSlippagePersent ?? slippagePercent)
    // const { liquidityExpected, liquidityMinimum, tokenRequired, xtzRequired } = addLiquidityCalculationsHandler(
    //   coinName,
    //   parseSrtToNum(coinAmount),
    //   xtz_pool,
    //   token_pool,
    //   lqt_total,
    //   convertedSlippagePersentToValue,
    //   dex,
    // )

    // setLqtReceived(liquidityExpected.value)
    // setMinLqtReceived(liquidityMinimum.value)
    // setLastCoinUpdated(coinName)
    // setInputValues({
    //   ...inputValues,
    //   ...(coinName === 'XTZ' && tokenRequired
    //     ? {
    //         tzBTC: tokenRequired.value,
    //         XTZ: coinAmount,
    //       }
    //     : {}),
    //   ...(coinName === 'tzBTC' && xtzRequired
    //     ? {
    //         XTZ: xtzRequired.value,
    //         tzBTC: coinAmount,
    //       }
    //     : {}),
    // })
  }

  // input handler
  const inputChangeHandler = (e: AddLiquidutityInputChangeEventType) => {
    const { name, value } = e.target
    if (+value < 0 || (ready && +value > (name === 'XTZ' ? xtzBalance : tzBTCBalance))) return

    if (switchValue) {
      // Only XTZ input
      calcAddLiquidityOnlyXTZ(parseFloat(value as string))
      // onlyXTZCalculations(name as 'XTZ' | 'tzBTC', value)
    } else {
      // XTZ & tzBTC inputs
      calcAddLiquidityXtzAndTzbtc(parseFloat(value as string), name)
    }
  }

  // slippage value changing handler
  const slippageChangeHandler = (value: string | number, isInput?: boolean) => {
    const newSlippagePersent = Number(parseSrtToNum(value) < 0 ? 0 : value)
    if (newSlippagePersent >= 0 && newSlippagePersent <= 100) {
      setSlippagePercent(value)

      if (switchValue) {
        // Only XTZ input
        onlyXTZCalculations('XTZ', inputValues.XTZ, newSlippagePersent)
      } else if (!switchValue && lastCoinUpdated) {
        // XTZ & tzBTC inputs
        xtzTzbtcCalculations(lastCoinUpdated, inputValues[lastCoinUpdated], newSlippagePersent)
      }
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
                setInputValues(DEFAULT_COINS_AMOUNT)
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

      {switchValue ? (
        <AddLiquidityOnlyXTZ
          inputValues={inputValues}
          inputChangeHandler={inputChangeHandler}
          lqtReceived={lqtReceived}
          setInputValues={setInputValues}
          swapData={onlyXtzSwapData}
          minCoinsForSwap={onlyXtzMinCoinsData}
        />
      ) : (
        <AddLiquidityDefault
          inputValues={inputValues}
          inputChangeHandler={inputChangeHandler}
          lqtReceived={lqtReceived}
          setInputValues={setInputValues}
        />
      )}

      {ready ? (
        <Button
          text={'Add Liquidity'}
          icon={'plusDark'}
          onClick={addLiquidityBtnHandler}
          className="addLiquidity_btn LB"
          kind={PRIMARY}
        />
      ) : (
        <ConnectWallet className="swap-action addLiq-action addLiquidity_btn" />
      )}

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={priceImpact} />
        <MinimumReceived minimumReceived={[{ value: minlqtReceived, tokenName: 'LBT' }]} />
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

import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { Slippage } from 'app/App.components/LBActionBottomFields/Slippage.contoller'
import { Button } from 'app/App.components/Button/Button.controller'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'
import { Input, InputStatusType } from 'app/App.components/Input/Input.controller'

import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { State } from 'utils/interfaces'
import { nonNumberSymbolsValidation, parseSrtToNum, slippagePercentToValue } from 'utils/utils'
import { getSettings, SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { ACTION_PRIMARY } from 'app/App.components/Button/Button.constants'
import { AddLiquidutityInputChangeEventType } from '../helpers/actionsScreen.types'
import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'
import { removeLiquidity } from '../../../../../redux/actions/liquidity.action'
import { calculateRemoveLiquidity } from '../../../../../utils/DEX/liquidityUtils'
import { PRECISION_NUMBER_EIGHT_ZEROES, PRECISION_NUMBER_SIX_ZEROES } from '../../../../../utils/consts'
import { PRIMARY_COLOR, SECONDARY_COLOR } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { ERROR } from 'app/App.components/Toaster/Toaster.constants'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'

const dex = getSettings('liquidity')

type CoinsInputsErrors = {
  SIR: InputStatusType
}

const DEFAULT_COINS_ERRORS = {
  SIR: '' as InputStatusType,
}

export const LBRemoveLiquidity = ({ ready, generalDexStats }: { ready: boolean; generalDexStats: any }) => {
  const dispatch = useDispatch()
  const { LBTBalance } = useSelector((state: State) => state.user)

  const [inputValues, setInputValues] = useState<{ SIR: number | string }>({ SIR: '0' })
  const [inputErrors, setInputErrors] = useState<CoinsInputsErrors>(DEFAULT_COINS_ERRORS)
  const [selectedSlippage, setSelectedSlippage] = useState<number>(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippagePercent, setSlippagePercent] = useState<string | number>(SLIPPAGE_TOGGLE_VALUES[0].value.toString())
  const [receivedAmount, setReceivedAmount] = useState({
    xtz: 0,
    tzbtc: 0,
  })
  const [minimumReceived, setMinimumReceived] = useState({
    xtz: 0,
    tzbtc: 0,
  })

  useEffect(() => {
    setInputValues({ SIR: '0' })
  }, [ready])

  const calculateReceivedXtzAndTzbtc = (amount: number) => {
    const convertedSlippagePercentToValue = slippagePercentToValue(slippagePercent)
    const { xtzExpected, xtzMinimum, tokenExpected, tokenMinimum, exchangeRate } = calculateRemoveLiquidity(
      amount,
      generalDexStats.tezPool,
      generalDexStats.tokenPool,
      generalDexStats.sharesTotal,
      convertedSlippagePercentToValue,
      dex,
    )

    setReceivedAmount({
      xtz: isNaN(xtzExpected) ? 0 : xtzExpected,
      tzbtc: isNaN(tokenExpected) ? 0 : tokenExpected,
    })

    setMinimumReceived({
      xtz: isNaN(xtzMinimum) ? 0 : xtzMinimum,
      tzbtc: isNaN(tokenMinimum) ? 0 : tokenMinimum,
    })
  }
  // change slippage value handler
  const slippageChangeHandler = (value: string | number, isInput?: boolean) => {
    const newSlippagePersent = Number(parseSrtToNum(value) < 0 ? 0 : value)
    if (newSlippagePersent >= 0 && newSlippagePersent <= 100) {
      setSlippagePercent(value)
      calculateReceivedXtzAndTzbtc(parseFloat(inputValues.SIR.toString()))
    }

    if (!isInput) {
      setSelectedSlippage(parseSrtToNum(value))
    }
  }

  // change input value handler
  const inputChangeHandler = (e: AddLiquidutityInputChangeEventType) => {
    const { value } = e.target
    if (+value < 0 || (ready && +value > LBTBalance)) {
      dispatch(showToaster(ERROR, 'Insufficient wallet balance', 'Please enter sufficient amount'))
      setInputErrors({
        SIR: ERROR,
      })
      return
    }

    setInputErrors(DEFAULT_COINS_ERRORS)

    calculateReceivedXtzAndTzbtc(value === '' ? 0 : parseFloat(value.toString()))
    setInputValues({
      SIR: value,
    })
  }

  const removeLiquidityBtnHandler = async () => {
    dispatch(
      removeLiquidity(
        Number(inputValues.SIR),
        receivedAmount.xtz * PRECISION_NUMBER_SIX_ZEROES,
        receivedAmount.tzbtc * PRECISION_NUMBER_EIGHT_ZEROES,
      ),
    )
    setInputValues({
      SIR: 0,
    })
  }

  return (
    <>
      <Input
        placeholder={''}
        name="Sir"
        onChange={inputChangeHandler}
        type={'number'}
        kind={'LB'}
        value={inputValues.SIR}
        icon={'sirius-icon.png'}
        pinnedText={'SIRS'}
        onKeyDown={nonNumberSymbolsValidation}
        inputStatus={inputErrors.SIR}
        onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
        useMaxHandler={() => {
          inputChangeHandler({
            target: {
              name: 'SIR',
              value: LBTBalance,
            },
          })
        }}
        className="removeLiq-input"
        userBalance={LBTBalance}
        onBlur={() => {
          if (inputValues.SIR === '') {
            setInputValues({
              ...inputValues,
              SIR: '0',
            })
          }
          setInputErrors(DEFAULT_COINS_ERRORS)
        }}
        onFocus={() => {
          if (parseSrtToNum(inputValues.SIR) === 0) {
            setInputValues({
              ...inputValues,
              SIR: '',
            })
          }
        }}
      />

      <div className="receive-info-wrapper">
        <CustomizedText className={PRIMARY_COLOR} style={{ marginBottom: '10px' }} fontSize={16}>
          You Receive
        </CustomizedText>

        <CoinSwap
          icon={{ name: 'plus', width: 12, height: 18 }}
          XTZCoinData={{
            icon: 'XTZ_tezos',
            amount: receivedAmount.xtz,
          }}
          tzBTCCoinData={{
            icon: 'tzBTC',
            amount: receivedAmount.tzbtc,
          }}
        />
      </div>

      {ready ? (
        <Button
          text={'Remove Liquidity'}
          icon={'minus'}
          onClick={removeLiquidityBtnHandler}
          className="LB removeLiq-btn"
          kind={ACTION_PRIMARY}
        />
      ) : (
        <ConnectWallet className="LB removeLiq-btn" />
      )}

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={0} />
        <MinimumReceived
          className="min-received"
          minimumReceived={[
            { value: minimumReceived.xtz, tokenName: 'XTZ' },
            { value: minimumReceived.tzbtc, tokenName: 'tzBTC' },
          ]}
        />
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

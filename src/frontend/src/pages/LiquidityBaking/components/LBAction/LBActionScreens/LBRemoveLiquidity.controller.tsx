import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { Slippage } from 'app/App.components/LBActionBottomFields/Slippage.contoller'
import { Button } from 'app/App.components/Button/Button.controller'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'
import { Input } from 'app/App.components/Input/Input.controller'

import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { ActionScreenWrapper } from '../LBAction.style'
import { CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { State } from 'utils/interfaces'
import { nonNumberSymbolsValidation, parseSrtToNum, slippagePercentToValue } from 'utils/utils'
import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { getSettings } from 'utils/DEX/DexCalcs'
import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { AddLiquidutityInputChangeEventType } from '../helpers/actionsScreen.types'
import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'
import { removeLiquidity } from '../../../../../redux/actions/liquidity.action'
import { calculateRemoveLiquidity } from '../../../../../utils/DEX/liquidityUtils'
import { PRECISION_NUMBER_EIGHT_ZEROES, PRECISION_NUMBER_SIX_ZEROES } from '../../../../../utils/consts'

const dex = getSettings('liquidity')

export const LBRemoveLiquidity = ({ ready, generalDexStats }: { ready: boolean; generalDexStats: any }) => {
  const { coinPrices } = useSelector((state: State) => state.tokens)
  const dispatch = useDispatch()
  const { LBTBalance } = useSelector((state: State) => state.user)

  const [inputValues, setInputValues] = useState({ SIR: '0' })
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
    console.log(
      'logging result of calculateReceivedXtzAndTzbtc',
      xtzExpected,
      xtzMinimum,
      tokenExpected,
      tokenMinimum,
      exchangeRate,
    )
    setInputValues({
      SIR: String(amount),
    })
    setReceivedAmount({
      xtz: xtzExpected,
      tzbtc: tokenExpected,
    })

    setMinimumReceived({
      xtz: xtzMinimum,
      tzbtc: tokenMinimum,
    })
  }
  // change slippage value handler
  const slippageChangeHandler = (value: string | number, isInput?: boolean) => {
    const newSlippagePersent = Number(parseSrtToNum(value) < 0 ? 0 : value)
    if (newSlippagePersent >= 0 && newSlippagePersent <= 100) {
      setSlippagePercent(value)
      calculateReceivedXtzAndTzbtc(parseFloat(inputValues.SIR))
    }

    if (!isInput) {
      setSelectedSlippage(parseSrtToNum(value))
    }
  }

  // change input value handler
  const inputChangeHandler = (e: AddLiquidutityInputChangeEventType) => {
    const { name, value } = e.target
    if (+value < 0 || (ready && +value > LBTBalance)) return
    calculateReceivedXtzAndTzbtc(parseFloat(value as string))
  }

  const removeLiquidityBtnHandler = async () => {
    dispatch(
      removeLiquidity(
        Number(inputValues.SIR),
        receivedAmount.xtz * PRECISION_NUMBER_SIX_ZEROES,
        receivedAmount.tzbtc * PRECISION_NUMBER_EIGHT_ZEROES,
      ),
    )
  }

  return (
    <ActionScreenWrapper className="removeLiqiudity swap">
      <Input
        placeholder={''}
        name="Sir"
        onChange={inputChangeHandler}
        type={'number'}
        kind={'LB'}
        value={inputValues.SIR}
        icon={'siriusLogo'}
        pinnedText={'SIR'}
        onKeyDown={nonNumberSymbolsValidation}
        onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
        useMaxHandler={() => {
          inputChangeHandler({
            target: {
              name: 'SIR',
              value: LBTBalance,
            },
          })
        }}
        userBalance={LBTBalance}
        onBlur={() => {
          if (inputValues.SIR === '') {
            setInputValues({
              ...inputValues,
              SIR: '0',
            })
          }
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
        <CustomizedText style={{ marginBottom: '20px' }}>You Receive</CustomizedText>

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
          className="LB"
          kind={PRIMARY}
        />
      ) : (
        <ConnectWallet className="LB" />
      )}

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={0} />
        <MinimumReceived
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
    </ActionScreenWrapper>
  )
}

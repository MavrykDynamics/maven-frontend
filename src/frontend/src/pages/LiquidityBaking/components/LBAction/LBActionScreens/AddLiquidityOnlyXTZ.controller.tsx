import { useSelector } from 'react-redux'

import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { THIRD_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from 'pages/LiquidityBaking/LiquidityBaking.styles'

import { AddLiquidutityInputChangeEventType, CoinsInputsValues } from '../helpers/actionsScreen.types'
import { State } from 'utils/interfaces'

import { nonNumberSymbolsValidation, parseSrtToNum } from 'utils/utils'

import { CustomizedText, HorisontalInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { StepBlock } from '../LBAction.style'
import { CoinsInputsErrors, DEFAULT_COINS_ERRORS, MinCoinsData } from './LBAddLiquidity.controller'

export const AddLiquidityOnlyXTZ = ({
  inputValues,
  inputErrors,
  lqtReceived,
  setInputValues,
  inputChangeHandler,
  setInputErrors,
  swapData,
  minCoinsForSwap,
}: {
  inputValues: CoinsInputsValues
  inputErrors: CoinsInputsErrors
  swapData: CoinsInputsValues
  inputChangeHandler: (arg: AddLiquidutityInputChangeEventType) => void
  lqtReceived: number
  setInputValues: (arg: CoinsInputsValues) => void
  setInputErrors: (arg: CoinsInputsErrors) => void
  minCoinsForSwap: MinCoinsData
}) => {
  const { coinPrices } = useSelector((state: State) => state.tokens)
  const { xtzBalance } = useSelector((state: State) => state.user)

  return (
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
        className="addLiq-input-XTZ"
        inputStatus={inputErrors.XTZ}
        onKeyDown={nonNumberSymbolsValidation}
        onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
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
          setInputErrors(DEFAULT_COINS_ERRORS)
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
        <div className="top">
          <StepBlock>
            <div className="step">1</div>
            Swap
          </StepBlock>

          <CoinSwap
            className="onlyXtz"
            icon={{ name: 'exchange', width: 24, height: 20 }}
            XTZCoinData={{
              icon: 'XTZ_tezos',
              amount: parseSrtToNum(swapData.XTZ),
            }}
            tzBTCCoinData={{
              icon: 'tzBTC',
              amount: parseSrtToNum(swapData.tzBTC),
            }}
          />
        </div>

        <HorisontalInfo className="liq-tokens-created">
          <CustomizedText className={PRIMARY_COLOR} fontWidth={500}>
            Minimum tzBTC Received
          </CustomizedText>
          <CustomizedText className={SECONDARY_COLOR} fontWidth={500}>
            <CommaNumber value={minCoinsForSwap.minTzBTC} showDecimal decimalsToShow={8} endingText="tzBTC" />
          </CustomizedText>
        </HorisontalInfo>
      </div>

      <div className="step-wrapper no-before" style={{ marginTop: '15px', marginBottom: '10px' }}>
        <div className="top">
          <StepBlock>
            <div className="step">2</div>
            Add Liquidity
          </StepBlock>
          <CoinSwap
            className="onlyXtz"
            icon={{ name: 'exchange', width: 24, height: 20 }}
            XTZCoinData={{
              icon: 'XTZ_tezos',
              amount: parseSrtToNum(swapData.XTZ),
            }}
            tzBTCCoinData={{
              icon: 'tzBTC',
              amount: parseSrtToNum(swapData.tzBTC),
            }}
          />
        </div>

        <HorisontalInfo className="liq-tokens-created">
          <CustomizedText className={THIRD_COLOR} fontWidth={600} fontSize={14}>
            Sirius LP tokens created
          </CustomizedText>

          <CustomizedText className={SECONDARY_COLOR} fontWidth={600} fontSize={14}>
            <CommaNumber value={isNaN(lqtReceived) ? 0 : lqtReceived} showDecimal endingText="SIRS" />
          </CustomizedText>
        </HorisontalInfo>
      </div>
    </>
  )
}

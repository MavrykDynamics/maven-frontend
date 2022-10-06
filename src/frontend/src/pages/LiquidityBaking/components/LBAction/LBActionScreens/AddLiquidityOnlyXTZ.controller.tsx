import { useSelector } from 'react-redux'

import { CoinSwap } from 'app/App.components/CoinSwap/CoinSwap.controller'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'

import { AddLiquidutityInputChangeEventType, CoinsInputsValues } from '../helpers/actionsScreen.types'
import { State } from 'utils/interfaces'

import { nonNumberSymbolsValidation, parseSrtToNum } from 'utils/utils'

import { CustomizedText, HorisontalInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { cyanColor } from 'styles'
import { StepBlock } from '../LBAction.style'
import { MinCoinsData } from './LBAddLiquidity.controller'

export const AddLiquidityOnlyXTZ = ({
  inputValues,
  lqtReceived,
  setInputValues,
  inputChangeHandler,
  swapData,
  minCoinsForSwap,
}: {
  inputValues: CoinsInputsValues
  swapData: CoinsInputsValues
  inputChangeHandler: (arg: AddLiquidutityInputChangeEventType) => void
  lqtReceived: number
  setInputValues: (arg: CoinsInputsValues) => void
  minCoinsForSwap: MinCoinsData
}) => {
  const { coinPrices } = useSelector((state: State) => state.tokens)
  const { xtzBalance } = useSelector((state: State) => state.user)

  console.log('Logging swapData: ', swapData, minCoinsForSwap)
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
            amount: parseSrtToNum(swapData.XTZ),
          }}
          tzBTCCoinData={{
            icon: 'tzBTC',
            amount: parseSrtToNum(swapData.tzBTC),
          }}
        />
        <HorisontalInfo>
          <CustomizedText fontWidth={500}>Minimum tzBTC Received</CustomizedText>
          <CustomizedText fontWidth={500} color={cyanColor}>
            <CommaNumber value={minCoinsForSwap.minTzBTC} showDecimal decimalsToShow={8} endingText="tzBTC" />
          </CustomizedText>
        </HorisontalInfo>
      </div>

      <hr />

      <div className="step-wrapper">
        <StepBlock>
          <div className="step">2</div>
          Add Liquidity
        </StepBlock>

        <CoinSwap
          icon={{ name: 'plus', width: 8, height: 14 }}
          XTZCoinData={{
            icon: 'XTZ_tezos',
            amount: parseSrtToNum(swapData.XTZ),
          }}
          tzBTCCoinData={{
            icon: 'tzBTC',
            amount: parseSrtToNum(swapData.tzBTC),
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
}

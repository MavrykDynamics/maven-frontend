import { useSelector } from 'react-redux'

import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'

import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { cyanColor } from 'styles'

import { nonNumberSymbolsValidation, parseSrtToNum } from 'utils/utils'

import { AddLiquidutityInputChangeEventType, CoinsInputsValues } from '../helpers/actionsScreen.types'
import { State } from 'utils/interfaces'
import { useMedia } from 'react-use'

export const AddLiquidityDefault = ({
  inputValues,
  lqtReceived,
  setInputValues,
  inputChangeHandler,
}: {
  inputValues: CoinsInputsValues
  inputChangeHandler: (arg: AddLiquidutityInputChangeEventType) => void
  lqtReceived: number
  setInputValues: (arg: CoinsInputsValues) => void
}) => {
  const { coinPrices } = useSelector((state: State) => state.tokens)
  const { xtzBalance, tzBTCBalance } = useSelector((state: State) => state.user)
  const isMobile = useMedia('max-width: 500px')

  return (
    <>
      <div className="input-wrapper">
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
        <span>+</span>
        <Input
          placeholder={''}
          name="tzBTC"
          onChange={inputChangeHandler}
          type={'number'}
          kind={'LB'}
          onKeyDown={nonNumberSymbolsValidation}
          onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
          value={inputValues.tzBTC}
          convertedValue={parseSrtToNum(inputValues.tzBTC) * coinPrices.tzbtc.usd}
          icon={'tzBTC'}
          pinnedText={'tzBTC'}
          useMaxHandler={() => {
            inputChangeHandler({
              target: {
                name: 'tzBTC',
                value: tzBTCBalance,
              },
            })
          }}
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

      <HorisontalInfo style={{ marginTop: '15px' }}>
        <CustomizedText fontWidth={500}>Liquidity Tokens created</CustomizedText>

        <CustomizedText fontWidth={500} color={cyanColor}>
          <CommaNumber
            value={isNaN(lqtReceived) ? 0 : lqtReceived}
            showDecimal
            endingText="SIR"
            maxSymbols={8}
            useMaxSymbols={isMobile}
          />
        </CustomizedText>
      </HorisontalInfo>
    </>
  )
}

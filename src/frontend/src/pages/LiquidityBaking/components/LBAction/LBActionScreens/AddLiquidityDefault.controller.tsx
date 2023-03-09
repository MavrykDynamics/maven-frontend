import { useSelector } from 'react-redux'

import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'

import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { cyanColor, subHeaderColor } from 'styles'

import { nonNumberSymbolsValidation, parseSrtToNum } from 'utils/utils'

import { AddLiquidutityInputChangeEventType, CoinsInputsValues } from '../helpers/actionsScreen.types'
import { State } from 'utils/interfaces'
import { useMedia } from 'react-use'
import { CoinsInputsErrors, DEFAULT_COINS_ERRORS } from './LBAddLiquidity.controller'

export const AddLiquidityDefault = ({
  inputValues,
  inputErrors,
  lqtReceived,
  setInputValues,
  setInputErrors,
  inputChangeHandler,
}: {
  inputValues: CoinsInputsValues
  inputErrors: CoinsInputsErrors
  inputChangeHandler: (arg: AddLiquidutityInputChangeEventType) => void
  lqtReceived: number
  setInputValues: (arg: CoinsInputsValues) => void
  setInputErrors: (arg: CoinsInputsErrors) => void
}) => {
  const { coinPrices } = useSelector((state: State) => state.tokens)
  const { xtzBalance, tzBTCBalance } = useSelector((state: State) => state.user)
  const isMobile = useMedia('max-width: 500px')

  const xtzUseMaxDisabled = xtzBalance * coinPrices.tezos.usd > tzBTCBalance * coinPrices.tzbtc.usd
  const tzbtcUseMaxDisabled = tzBTCBalance * coinPrices.tzbtc.usd > xtzBalance * coinPrices.tezos.usd

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
          className={`addLiq-input ${xtzUseMaxDisabled ? 'use-max-disable' : ''}`}
          inputStatus={inputErrors.XTZ}
          onKeyDown={nonNumberSymbolsValidation}
          onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
          useMaxHandler={() => {
            if (xtzUseMaxDisabled) return

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
          className={`addLiq-input ${tzbtcUseMaxDisabled ? 'use-max-disable' : ''}`}
          inputStatus={inputErrors.tzBTC}
          pinnedText={'tzBTC'}
          useMaxHandler={() => {
            if (tzbtcUseMaxDisabled) return
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
            setInputErrors(DEFAULT_COINS_ERRORS)
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

      <HorisontalInfo className="liqTokens-created">
        <CustomizedText fontWidth={500} fontSize={16} color={subHeaderColor}>
          Sirius LP tokens created
        </CustomizedText>

        <CustomizedText fontWidth={500} color={cyanColor} fontSize={16}>
          <CommaNumber
            value={isNaN(lqtReceived) ? 0 : lqtReceived}
            showDecimal
            endingText="SIRS"
            maxSymbols={8}
            useMaxSymbols={isMobile}
          />
        </CustomizedText>
      </HorisontalInfo>
    </>
  )
}

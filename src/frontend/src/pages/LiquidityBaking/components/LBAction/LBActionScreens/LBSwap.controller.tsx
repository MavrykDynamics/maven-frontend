import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { ToggleButton } from 'app/App.components/ToggleButton/Toggle-button.view'
import React, {useState} from 'react'
import { cyanColor } from 'styles'
import { CustomizedText, HorisontalInfo, VertInfo } from '../../LBHeader/LBHeader.style'
import { ActionScreenWrapper, PriceChange } from '../LBAction.style'

export const slippageToleranceToggleValues = ['0.5%', '1%', '3%', 'custom%']
const defaultInputState = {
  XTZ_input: 0,
  tz_BTC_input: 0
}

export const LBSwap = () => {
  const [selectedToogle, setSeletedToggle] = useState(slippageToleranceToggleValues[0])
  const [inputValues, setInputValues] = useState(defaultInputState)

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setInputValues({
      ...inputValues,
      [name]: value
    })
  }

  return (
    <ActionScreenWrapper className='swap'>
      <div className="exchange-block">
        <CustomizedText>
          XTZ
        </CustomizedText>

        <svg><use xlinkHref='/icons/sprites.svg#exchange' /></svg>

        <CustomizedText>
          tzBTC
        </CustomizedText>
      </div>

      <div className="input-wrapper">
        <Input 
          placeholder={'XTZ'} 
          name='XTZ_input' 
          onChange={inputChangeHandler} 
          type={'number'} 
          kind={'LB'} 
          value={inputValues.XTZ_input} 
          icon={'XTZ_tezos'} 
          pinnedText={'XTZ'} 
          useMaxHandler={() => { }} 
          userBalance={87} 
        />
        <svg><use xlinkHref='/icons/sprites.svg#exchange' /></svg>
        <Input 
          placeholder={'tzBTC'} 
          name='tz_BTC_input' 
          onChange={inputChangeHandler} 
          type={'number'} 
          kind={'LB'} 
          value={inputValues.tz_BTC_input} 
          icon={'tzBTC'} 
          pinnedText={'tzBTC'} 
          useMaxHandler={() => { }} 
          userBalance={87} 
        />
      </div>

      <VertInfo>
        <CustomizedText fontWidth={500}>
          Exchange Rate
        </CustomizedText>

        <CustomizedText color={cyanColor} fontWidth={500}>
          1 XTZ (<CommaNumber beginningText='$' value={1.60} /> ) = <CommaNumber value={0.00008000} showDecimal endingText='tzBTC' /> 
        </CustomizedText>
      </VertInfo>

      <div className="bottom-wrapper">
        <HorisontalInfo>
          <CustomizedText color={'#8D86EB'} fontWidth={500}>
            Price Impact
          </CustomizedText>

          <CustomizedText fontWidth={500}>
            <PriceChange up>
              <CommaNumber beginningText='+' value={0.0732} showDecimal endingText='%' />
            </PriceChange>
          </CustomizedText>
        </HorisontalInfo>

        <HorisontalInfo>
          <CustomizedText color={'#8D86EB'} fontWidth={500}>
            Minimum Received
          </CustomizedText>

          <CustomizedText color={cyanColor} fontWidth={500}>
            <CommaNumber value={0.00614124} endingText='LBT' />
          </CustomizedText>
        </HorisontalInfo>

        <HorisontalInfo>
          <CustomizedText color={'#8D86EB'} fontWidth={500}>
            Slippage Tolerance
          </CustomizedText>

          <ToggleButton 
            values={slippageToleranceToggleValues} 
            selected={selectedToogle} 
            handleSetSelectedToggler={(value: string) => setSeletedToggle(value)} 
            className='swap-toggler' 
          />
        </HorisontalInfo>
      </div>

    </ActionScreenWrapper>
  )
}
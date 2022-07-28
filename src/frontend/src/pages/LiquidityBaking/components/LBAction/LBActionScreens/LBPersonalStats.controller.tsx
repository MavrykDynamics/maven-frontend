import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { TzAddress } from 'app/App.components/TzAddress/TzAddress.view'
import React from 'react'

import { CustomizedText, HorisontalInfo } from '../../LBHeader/LBHeader.style'
import { ActionScreenWrapper } from '../LBAction.style'

export const LBPersonalStats = () => {
  return (
    <ActionScreenWrapper className='stats'>
      <HorisontalInfo>
        <CustomizedText color='#8D86EB' fontWidth={600}>Address</CustomizedText>
        <CustomizedText color='#86D4C9' fontWidth={500}><TzAddress type='primary' tzAddress={'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb'} hasIcon/></CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color='#8D86EB' fontWidth={600}>Your LB tokens</CustomizedText>
        <CustomizedText color='#86D4C9' fontWidth={500}><CommaNumber value={7097}/></CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color='#8D86EB' fontWidth={600}>Total LB Tokens</CustomizedText>
        <CustomizedText color='#86D4C9' fontWidth={500}><CommaNumber value={14125501}/></CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color='#8D86EB' fontWidth={600}>Pool Share</CustomizedText>
        <CustomizedText color='#86D4C9' fontWidth={500}><CommaNumber value={0.0153} endingText='%' /></CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color='#8D86EB' fontWidth={600}>Realized PL</CustomizedText>
        <CustomizedText color='#86D4C9' fontWidth={500}><CommaNumber value={234.98} endingText='XTZ'/></CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color='#8D86EB' fontWidth={600}>Unrealized PL</CustomizedText>
        <CustomizedText color='#86D4C9' fontWidth={500}><CommaNumber value={13.234} endingText='XTZ'/></CustomizedText>
      </HorisontalInfo>
    </ActionScreenWrapper>
  )
}

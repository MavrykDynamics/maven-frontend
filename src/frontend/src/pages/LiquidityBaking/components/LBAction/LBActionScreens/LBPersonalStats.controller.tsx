import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { TzAddress } from 'app/App.components/TzAddress/TzAddress.view'

import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { ActionScreenWrapper } from '../LBAction.style'

import { subHeaderColor, cyanColor } from 'styles'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'

export const LBPersonalStats = () => {
  const { address, lqt_total } = useSelector((state: State) => state.tokens.lbData)
  return (
    <ActionScreenWrapper className="stats">
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Address
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <TzAddress type="primary" tzAddress={address} hasIcon />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Your LB tokens
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={7097} />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Total LB Tokens
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={lqt_total} />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Pool Share
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={0.0153} endingText="%" />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Realized PL
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={234.98} endingText="XTZ" />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Unrealized PL
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={13.234} endingText="XTZ" />
        </CustomizedText>
      </HorisontalInfo>
    </ActionScreenWrapper>
  )
}

import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { TzAddress } from 'app/App.components/TzAddress/TzAddress.view'

import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { ActionScreenWrapper } from '../LBAction.style'

import { cyanColor, subHeaderColor } from 'styles'

export const LBGeneralStats = () => {
  return (
    <ActionScreenWrapper className="stats">
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Address
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <TzAddress type="primary" tzAddress={'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb'} hasIcon />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Latest Price
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={0.00007554} endingText="tzBTC" />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Trade volume
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={0.5301872} endingText="tzBTC" />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Average trade size
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={0.5301872} endingText="tzBTC" />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          YTVL in XTZ/tzBTC
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={9018659} />/<CommaNumber value={8789} />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          TVL in USD
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={14125501} />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Interactions
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={29} />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Unique Users
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={13} />
        </CustomizedText>
      </HorisontalInfo>
    </ActionScreenWrapper>
  )
}

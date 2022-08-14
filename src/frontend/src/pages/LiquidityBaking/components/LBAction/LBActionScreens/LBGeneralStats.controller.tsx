import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { TzAddress } from 'app/App.components/TzAddress/TzAddress.view'

import { HorisontalInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { ActionScreenWrapper } from '../LBAction.style'

import { cyanColor, subHeaderColor } from 'styles'
import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'

export const LBGeneralStats = () => {
  const {
    lbData: { address },
    stats: { tradeVolume, tvlUSD, avgTradingSize, users, interactions },
  } = useSelector((state: State) => state.tokens)
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
          Latest Price (fix)
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
          <CommaNumber value={tradeVolume} endingText="tzBTC" />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Average trade size
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={avgTradingSize} endingText="tzBTC" />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          YTVL in XTZ/tzBTC (fix)
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
          <CommaNumber beginningText="$" value={tvlUSD} />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Interactions
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={interactions} />
        </CustomizedText>
      </HorisontalInfo>
      <HorisontalInfo>
        <CustomizedText color={subHeaderColor} fontWidth={600}>
          Unique Users
        </CustomizedText>
        <CustomizedText color={cyanColor} fontWidth={500}>
          <CommaNumber value={users} />
        </CustomizedText>
      </HorisontalInfo>
    </ActionScreenWrapper>
  )
}

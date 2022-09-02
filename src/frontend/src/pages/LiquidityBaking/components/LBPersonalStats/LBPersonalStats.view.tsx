import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { VertInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { cyanColor, subHeaderColor } from 'styles'
import { LBPersonalStatsStyled } from './LBPersonalStats.style'

export const LBPersonalStatsView = ({
  showNone,
  balances,
}: {
  showNone: boolean
  balances: {
    siriusBalance: number
    xtzBalance: number
    tzBTCBalance: number
  }
}) => {
  return (
    <LBPersonalStatsStyled>
      <div className="title">My Stats</div>

      <div className="stats-grid">
        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber value={0} endingText="ꜩ" showNone={showNone} />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Unrealized PL (fix)
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber value={0} endingText="ꜩ" showNone={showNone} />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Realized PL (fix)
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber value={0} endingText="%" showNone={showNone} />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Pool Share (fix)
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber value={balances.siriusBalance} showNone={showNone} endingText=" " />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Sirius tokens
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber value={balances.xtzBalance} endingText="ꜩ" showNone={showNone} />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Estimated XTZ owned
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber value={balances.tzBTCBalance} endingText="tzBTC" showNone={showNone} />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Estimated tzBTC owned
          </CustomizedText>
        </VertInfo>
      </div>
    </LBPersonalStatsStyled>
  )
}

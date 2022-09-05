import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { VertInfo, CustomizedText } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { cyanColor, subHeaderColor } from 'styles'
import { LBPersonalStatsStyled } from './LBPersonalStats.style'
import Icon from 'app/App.components/Icon/Icon.view'

type PersonalStatsProps = {
  showNone: boolean
  balances: {
    siriusBalance: number
    xtzBalance: number
    tzBTCBalance: number
  }
}

export const LBPersonalStatsView = ({ showNone, balances }: PersonalStatsProps) => {
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
            <div className="info">
              <Icon id="infoIcon" />
              <div className="text">test text</div>
            </div>
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber value={0} endingText="ꜩ" showNone={showNone} />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Realized PL (fix)
            <div className="info">
              <Icon id="infoIcon" />
              <div className="text">test text</div>
            </div>
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber value={0} endingText="%" showNone={showNone} />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Pool Share (fix)
            <div className="info">
              <Icon id="infoIcon" />
              <div className="text">test text</div>
            </div>
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
            <div className="info">
              <Icon id="infoIcon" />
              <div className="text">test text</div>
            </div>
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber value={balances.tzBTCBalance} endingText="tzBTC" showNone={showNone} />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Estimated tzBTC owned
            <div className="info">
              <Icon id="infoIcon" />
              <div className="text">test text</div>
            </div>
          </CustomizedText>
        </VertInfo>
      </div>
    </LBPersonalStatsStyled>
  )
}

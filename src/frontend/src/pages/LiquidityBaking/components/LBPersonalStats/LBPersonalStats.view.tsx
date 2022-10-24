import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { CustomizedText, VertInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { cyanColor, subHeaderColor } from 'styles'
import { LBPersonalStatsStyled } from './LBPersonalStats.style'
import Icon from 'app/App.components/Icon/Icon.view'

type PersonalStatsProps = {
  showNone: boolean
  balances: {
    siriusBalance: number
    xtzBalance: number
    tzBTCBalance: number
    realizedPl: number
    unrealizedPL: number
    xtzPool: number
    tzBTCPool: number
    siriusPool: number
  }
  userPoolShare: number
  estimatedAssetsOwned: {
    estimatedPoolXtzOwned: number
    estimatedPoolTzBTCOwned: number
  }
  pnLStats: {
    unrealizedPnL: number
    realizedPnL: number
  }
}

export const LBPersonalStatsView = ({
  showNone,
  balances,
  userPoolShare,
  estimatedAssetsOwned,
  pnLStats,
}: PersonalStatsProps) => {
  return (
    <LBPersonalStatsStyled>
      <div className="title">My Stats</div>

      <div className="stats-grid">
        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber
              value={isFinite(pnLStats.unrealizedPnL) ? pnLStats.unrealizedPnL : 0}
              endingText="ꜩ"
              showNone={showNone}
            />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Unrealized PL
            <div className="info">
              <Icon id="infoIcon" />
              <div className="text">
                Potential gains converted into tez, calculated as current LP token balance multiplied by the difference
                between current LP token price and weighted average LP token price over all your liquidity investments
              </div>
            </div>
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber
              value={isFinite(pnLStats.realizedPnL) ? pnLStats.realizedPnL : 0}
              endingText="ꜩ"
              showNone={showNone}
            />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Realized PL
            <div className="info">
              <Icon id="infoIcon" />
              <div className="text">
                Realized potential gains converted into tez, calculated as sold LP token amount multiplied by the
                difference between close LP token price and weighted average LP token price over all your liquidity
                investments.
              </div>
            </div>
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber
              value={isFinite(userPoolShare) ? userPoolShare : 0}
              endingText="%"
              showNone={showNone}
              showDecimal
              decimalsToShow={6}
            />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Pool Share
            <div className="info">
              <Icon id="infoIcon" />
              <div className="text">Your percentage share of the pool</div>
            </div>
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber
              value={isFinite(balances.siriusBalance) ? balances.siriusBalance : 0}
              showNone={showNone}
              endingText=" "
            />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Sirius tokens
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber
              value={
                isFinite(estimatedAssetsOwned.estimatedPoolXtzOwned) ? estimatedAssetsOwned.estimatedPoolXtzOwned : 0
              }
              endingText="ꜩ"
              showNone={showNone}
              decimalsToShow={6}
            />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Estimated XTZ owned
            <div className="info">
              <Icon id="infoIcon" />
              <div className="text">To fill in</div>
            </div>
          </CustomizedText>
        </VertInfo>

        <VertInfo>
          <CustomizedText color={cyanColor} fontWidth={700} fontSize={25}>
            <CommaNumber
              value={
                isFinite(estimatedAssetsOwned.estimatedPoolTzBTCOwned)
                  ? estimatedAssetsOwned.estimatedPoolTzBTCOwned
                  : 0
              }
              endingText="tzBTC"
              showNone={showNone}
              decimalsToShow={8}
            />
          </CustomizedText>
          <CustomizedText fontWidth={500} color={subHeaderColor} className="block-name">
            Estimated tzBTC owned
            <div className="info">
              <Icon id="infoIcon" />
              <div className="text">To fill in</div>
            </div>
          </CustomizedText>
        </VertInfo>
      </div>
    </LBPersonalStatsStyled>
  )
}

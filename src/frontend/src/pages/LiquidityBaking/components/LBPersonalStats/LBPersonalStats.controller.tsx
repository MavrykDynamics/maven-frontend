import { useSelector } from 'react-redux'
import { State } from 'utils/interfaces'
import { LBPersonalStatsView } from './LBPersonalStats.view'

export const LBPersonalStats = () => {
  const { ready } = useSelector((state: State) => state.wallet)
  const { LBTBalance, xtzBalance, tzBTCBalance } = useSelector((state: State) => state.user)
  return (
    <LBPersonalStatsView
      showNone={!ready}
      balances={{
        siriusBalance: LBTBalance,
        xtzBalance,
        tzBTCBalance,
      }}
    />
  )
}

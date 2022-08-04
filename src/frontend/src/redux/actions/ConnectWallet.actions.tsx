import { TempleDAppNetwork } from '@temple-wallet/dapp'
import { CONNECT } from 'redux/action.types'
import { State } from 'utils/interfaces'
import { getUserData } from './user.action'

export const connect = ({ forcePermission = false }: { forcePermission?: boolean }) => async (
  dispatch: any,
  getState: any,
) => {
  const state: State = getState()
  try {
    if (!state.wallet) {
      throw new Error('Temple Wallet not available')
    } else {
      await state.wallet.wallet?.connect('mainnet' as TempleDAppNetwork, {
        forcePermission,
      })
      const tzs = state.wallet.wallet?.toTezos()
      const accountPkh = await tzs?.wallet.pkh()
      dispatch({
        type: CONNECT,
        tezos: tzs,
        ready: Boolean(tzs),
        accountPkh: accountPkh,
      })
      if (accountPkh) dispatch(getUserData(accountPkh))
    }
  } catch (err) {
    console.error(`Failed to connect TempleWallet:`, err)
  }
  /*
    //TODO: For use when using Beacon Wallet instead of above code for temple wallet
    try {
      if (!state.wallet) {
        dispatch(showToaster(ERROR, 'Wallet not available', ''))
        throw new Error('Wallet not available')
      } else {
        const tzs = new TezosToolkit(process.env.REACT_APP_RPC_PROVIDER as any)
        await state.wallet.wallet?.requestPermissions({
          network: {
            type: (process.env.REACT_APP_NETWORK || 'hangzhounet') as any,
          },
        })
        tzs.setWalletProvider(state.wallet.wallet)

        const accountPkh = await state.wallet.wallet.getPKH()

        dispatch({
          type: CONNECT,
          tezos: tzs,
          ready: Boolean(tzs),
          accountPkh: accountPkh,
        })
      }
    } catch (err: any) {
      dispatch(showToaster(ERROR, 'Failed to connect Wallet', err.message))
      console.error(`Failed to connect Wallet: ${err.message}`)
    }
    */
}

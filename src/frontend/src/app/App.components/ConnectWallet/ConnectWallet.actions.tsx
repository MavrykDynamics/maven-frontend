import { TempleDAppNetwork, TempleWallet } from '@temple-wallet/dapp'
import { State, UserData } from 'utils/interfaces'
// import {
//   connectWalletAction,
//   getUserDataAction,
//   USER_INFO_QUERY,
//   USER_INFO_QUERY_NAME,
//   USER_INFO_QUERY_VARIABLES,
// } from 'actions'
import { fetchFromIndexer } from 'utils/gql.heplers'
import { calcWithoutPrecision, setItemInStorage } from 'utils/utils'
import { TezosToolkit } from '@taquito/taquito'

// export const getUserData = (accountPkh: string) => async (dispatch: any, getState: any) => {
//   try {
//     const userInfoFromIndexer = await fetchFromIndexer(
//       USER_INFO_QUERY,
//       USER_INFO_QUERY_NAME,
//       USER_INFO_QUERY_VARIABLES(accountPkh),
//     )
//     const userInfoData = userInfoFromIndexer?.mavryk_user[0]
//     const userIsDelegatedToSatellite = userInfoData?.delegation_records.length > 0
//     const userInfo: UserData = {
//       myAddress: userInfoData?.address,
//       myMvkTokenBalance: calcWithoutPrecision(userInfoData?.mvk_balance),
//       mySMvkTokenBalance: calcWithoutPrecision(userInfoData?.smvk_balance),
//       participationFeesPerShare: calcWithoutPrecision(userInfoData?.participation_fees_per_share),
//       satelliteMvkIsDelegatedTo: userIsDelegatedToSatellite
//         ? userInfoData?.delegation_records[0].satellite_record?.user_id
//         : '',
//     }
//     setItemInStorage('UserData', userInfo)
//     dispatch(getUserDataAction(userInfo))
//   } catch (error: any) {
//     console.error(error)
//   }
// }

export const connect = ({ forcePermission = false }: { forcePermission?: boolean }) => async (
  dispatch: any,
  getState: any,
) => {
  const state: State = getState()
  console.log('state', state)
  return { type: 'CONNECT' }

  // try {
  //   if (!state.wallet) {
  //     throw new Error('Temple Wallet not available')
  //   } else {
  //     // @ts-ignore
  //     await state.wallet?.connect((process.env.REACT_APP_NETWORK || 'hangzhounet') as TempleDAppNetwork, {
  //       forcePermission,
  //     })
  //     const tzs = state.wallet.wallet?.toTezos()
  //     const accountPkh = await tzs?.wallet.pkh()
  //     // dispatch(connectWalletAction(tzs, accountPkh))
  //     // if (accountPkh) dispatch(getUserData(accountPkh))
  //     return connectWalletAction(tzs, accountPkh)
  //   }
  // } catch (err: any) {
  //   console.error(`Failed to connect TempleWallet: ${err.message}`)
  // }
}

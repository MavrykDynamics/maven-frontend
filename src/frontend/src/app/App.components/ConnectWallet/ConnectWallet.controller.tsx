import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State, UserData } from 'utils/interfaces'

import { ConnectWalletView } from './ConnectWallet.view'
import { TempleDAppNetwork } from '@temple-wallet/dapp'
import {
  connectWalletAction,
  getUserData,
  GET_USER_DATA,
  USER_INFO_QUERY,
  USER_INFO_QUERY_NAME,
  USER_INFO_QUERY_VARIABLES,
} from 'actions'
import { fetchFromIndexer } from 'utils/gql.heplers'
import { calcWithoutPrecision } from 'utils/utils'

type ConnectWalletProps = {
  type?: string | null
  className?: string
}

export const ConnectWallet = ({ type, className }: ConnectWalletProps) => {
  const dispatch = useDispatch()

  const state = useSelector((state: State) => state)
  const { wallet, ready, accountPkh } = useSelector((state: State) => state.wallet)
  const { myMvkTokenBalance } = useSelector((state: State) => state.user)

  const handleConnect = async () => {
    try {
      if (!wallet) {
        throw new Error('Temple Wallet not available')
      } else {
        await wallet?.connect((process.env.REACT_APP_NETWORK || 'ghostnet') as TempleDAppNetwork, {
          forcePermission: false,
        })
        const tzs = wallet?.toTezos && wallet?.toTezos()
        const accountPkh = await tzs?.wallet.pkh()
        dispatch(connectWalletAction(tzs, accountPkh))
        console.log('accountPkh', accountPkh)
        if (accountPkh) {
          const userInfoFromIndexer = await fetchFromIndexer(
            USER_INFO_QUERY,
            USER_INFO_QUERY_NAME,
            USER_INFO_QUERY_VARIABLES(accountPkh),
          )

          console.log('userInfoFromIndexer', userInfoFromIndexer)
          const userInfoData = userInfoFromIndexer?.mavryk_user[0]
          const userIsDelegatedToSatellite = userInfoData?.delegation_records.length > 0
          const userInfo: UserData = {
            myAddress: userInfoData?.address,
            myMvkTokenBalance: calcWithoutPrecision(userInfoData?.mvk_balance),
            mySMvkTokenBalance: calcWithoutPrecision(userInfoData?.smvk_balance),
            participationFeesPerShare: calcWithoutPrecision(userInfoData?.participation_fees_per_share),
            satelliteMvkIsDelegatedTo: userIsDelegatedToSatellite
              ? userInfoData?.delegation_records[0].satellite_record?.user_id
              : '',
          }
          dispatch({
            type: GET_USER_DATA,
            userData: userInfo,
          })
        }
      }
    } catch (err) {
      console.error(`Failed to connect TempleWallet: handleConnect`, err)
    }
  }

  const handleNewConnect = async () => {
    try {
      if (!wallet) {
        throw new Error('Temple Wallet not available')
      } else {
        await wallet?.connect((process.env.REACT_APP_NETWORK || 'ghostnet') as TempleDAppNetwork, {
          forcePermission: true,
        })
        const tzs = wallet?.toTezos && wallet?.toTezos()
        const accountPkh = await tzs?.wallet.pkh()
        dispatch(connectWalletAction(tzs, accountPkh))

        if (accountPkh) {
          const userInfoFromIndexer = await fetchFromIndexer(
            USER_INFO_QUERY,
            USER_INFO_QUERY_NAME,
            USER_INFO_QUERY_VARIABLES(accountPkh),
          )
          const userInfoData = userInfoFromIndexer?.mavryk_user[0]
          const userIsDelegatedToSatellite = userInfoData?.delegation_records.length > 0
          const userInfo: UserData = {
            myAddress: userInfoData?.address,
            myMvkTokenBalance: calcWithoutPrecision(userInfoData?.mvk_balance),
            mySMvkTokenBalance: calcWithoutPrecision(userInfoData?.smvk_balance),
            participationFeesPerShare: calcWithoutPrecision(userInfoData?.participation_fees_per_share),
            satelliteMvkIsDelegatedTo: userIsDelegatedToSatellite
              ? userInfoData?.delegation_records[0].satellite_record?.user_id
              : '',
          }
          dispatch({
            type: GET_USER_DATA,
            userData: userInfo,
          })
        }
      }
    } catch (err) {
      console.error(`Failed to connect TempleWallet: handleNewConnect`, err)
    }
  }
  return (
    <ConnectWalletView
      type={type}
      loading={false}
      wallet={wallet}
      ready={ready}
      accountPkh={accountPkh}
      myMvkTokenBalance={myMvkTokenBalance}
      handleConnect={handleConnect}
      handleNewConnect={handleNewConnect}
      className={className}
    />
  )
}

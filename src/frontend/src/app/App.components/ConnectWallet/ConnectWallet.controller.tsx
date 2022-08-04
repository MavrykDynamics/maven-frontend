import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State, UserData } from 'utils/interfaces'

import { ConnectWalletView } from './ConnectWallet.view'
import { TempleDAppNetwork } from '@temple-wallet/dapp'
import { fetchFromIndexer } from 'gql/gql.heplers'
import { calcWithoutPrecision } from 'utils/utils'
import { USER_INFO_QUERY, USER_INFO_QUERY_NAME, USER_INFO_QUERY_VARIABLES } from 'gql/queries/user.query'
import { GET_USER_DATA } from 'redux/action.types'
import { connectWalletAction } from 'redux/actions/wallet.action'
import { getUserData } from 'redux/actions/user.action'
import { connect } from 'redux/actions/ConnectWallet.actions'

type ConnectWalletProps = {
  type?: string | null
  className?: string
}

export const ConnectWallet = ({ type, className }: ConnectWalletProps) => {
  const dispatch = useDispatch()

  const { wallet, ready, accountPkh } = useSelector((state: State) => state.wallet)
  const { myMvkTokenBalance } = useSelector((state: State) => state.user)

  const handleConnect = async () => {
    try {
      if (!wallet) {
        throw new Error('Temple Wallet not available')
      } else {
        dispatch(connect({}))
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
        dispatch(connect({ forcePermission: true }))
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

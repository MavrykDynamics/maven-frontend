import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'utils/interfaces'

import { ConnectWalletView } from './ConnectWallet.view'
import { connect } from 'redux/actions/ConnectWallet.actions'

type ConnectWalletProps = {
  type?: string | null
  className?: string
}

export const ConnectWallet = ({ type, className }: ConnectWalletProps) => {
  const dispatch = useDispatch()

  const { wallet, ready, accountPkh } = useSelector((state: State) => state.wallet)
  const { xtzBalance } = useSelector((state: State) => state.user)

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
      xtzBalance={xtzBalance}
      handleConnect={handleConnect}
      handleNewConnect={handleNewConnect}
      className={className}
    />
  )
}

import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'utils/interfaces'

import { ConnectWalletView } from './ConnectWallet.view'
import { TempleDAppNetwork } from '@temple-wallet/dapp'
import { connectWalletAction } from 'actions'

type ConnectWalletProps = {
  type?: string | null
  className?: string
}

export const ConnectWallet = ({ type, className }: ConnectWalletProps) => {
  const dispatch = useDispatch()
  const { wallet } = useSelector((state: State) => state.walletData)
  const { myMvkTokenBalance } = useSelector((state: State) => state.walletData.user)

  const handleConnect = async () => {
    try {
      if (!wallet) {
        throw new Error('Temple Wallet not available')
      } else {
        await wallet?.connect((process.env.REACT_APP_NETWORK || 'mainnet') as TempleDAppNetwork, {
          forcePermission: false,
        })
        const tzs = wallet?.toTezos && wallet?.toTezos()
        const accountPkh = await tzs?.wallet.pkh()
        dispatch(connectWalletAction(tzs, accountPkh))
      }
    } catch (err) {
      console.error(`Failed to connect TempleWallet: handleConnect ${JSON.stringify(err)}`)
    }
  }

  const handleNewConnect = async () => {
    try {
      if (!wallet) {
        throw new Error('Temple Wallet not available')
      } else {
        await wallet?.connect((process.env.REACT_APP_NETWORK || 'mainnet') as TempleDAppNetwork, {
          forcePermission: true,
        })
        const tzs = wallet?.toTezos && wallet?.toTezos()
        const accountPkh = await tzs?.wallet.pkh()
        dispatch(connectWalletAction(tzs, accountPkh))
      }
    } catch (err) {
      console.error(`Failed to connect TempleWallet: handleNewConnect ${JSON.stringify(err)}`)
    }
  }
  return (
    <ConnectWalletView
      type={type}
      loading={false}
      wallet={wallet}
      ready={wallet?.ready}
      accountPkh={wallet?.accountPkh}
      myMvkTokenBalance={myMvkTokenBalance}
      handleConnect={handleConnect}
      handleNewConnect={handleNewConnect}
      className={className}
    />
  )
}

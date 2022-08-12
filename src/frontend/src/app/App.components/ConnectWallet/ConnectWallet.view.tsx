import * as React from 'react'

import { TzAddress } from '../TzAddress/TzAddress.view'
import { CommaNumber } from '../CommaNumber/CommaNumber.controller'
// components
import {
  ConnectWalletStyled,
  SimpleConnectedButton,
  WalletConnectedButton,
  WalletNotConnectedButton,
} from './ConnectWallet.style'

type ConnectWalletViewProps = {
  type?: string | null
  loading: boolean
  wallet: any
  ready: boolean
  accountPkh?: string
  xtzBalance: string | number | undefined
  handleConnect: () => void
  handleNewConnect: () => void
  className?: string
}

export const ConnectWalletView = ({
  type,
  loading,
  wallet,
  ready,
  accountPkh,
  xtzBalance,
  handleConnect,
  handleNewConnect,
  className,
}: ConnectWalletViewProps) => {
  return (
    <ConnectWalletStyled className={className} id={'connectWalletButton'}>
      {wallet ? (
        <>
          {ready && type !== 'simpleButton' && accountPkh ? (
            <WalletConnectedButton>
              <var>
                <TzAddress tzAddress={accountPkh} hasIcon />
              </var>
              <button onClick={handleNewConnect}>
                <svg>
                  <use xlinkHref="/icons/sprites.svg#exchange" />
                </svg>
              </button>
              <CommaNumber value={Number(xtzBalance)} loading={loading} endingText={'MVK'} />
            </WalletConnectedButton>
          ) : null}
          {type === 'simpleButton' && <SimpleConnectButtonNoAddress handleConnect={handleConnect} />}
          {!ready && type !== 'simpleButton' && <NoWalletConnectedButton handleConnect={handleConnect} />}
        </>
      ) : (
        <WalletNotConnectedButton onClick={() => window.open('https://templewallet.com/', '_blank')!.focus()}>
          Install wallet
        </WalletNotConnectedButton>
      )}
    </ConnectWalletStyled>
  )
}

export const NoWalletConnectedButton = ({ handleConnect }: { handleConnect: () => void }) => {
  return (
    <WalletNotConnectedButton onClick={handleConnect}>
      <svg>
        <use xlinkHref="/icons/sprites.svg#wallet" />
      </svg>
      <span>Connect Wallet</span>
    </WalletNotConnectedButton>
  )
}
export const SimpleConnectButtonNoAddress = ({ handleConnect }: { handleConnect: () => void }) => {
  return (
    <SimpleConnectedButton onClick={handleConnect}>
      <svg>
        <use xlinkHref="/icons/sprites.svg#wallet" />
      </svg>
      <div>Connect Wallet</div>
    </SimpleConnectedButton>
  )
}

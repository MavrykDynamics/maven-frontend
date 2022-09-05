import WertWidget from '@wert-io/widget-initializer'

import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from 'react-use'

import { ConnectWalletStyled } from './ConnectWallet.style'
import { ConnectedWalletBlock, CoinsInfoType, InstallWalletButton, NoWalletConnectedButton } from './ConnectWallet.view'
import { getWertOptions } from './Wert/WertIO.const'
import { useCallback, useState } from 'react'
import WertIoPopup from './Wert/WertIoPopup'
import { State } from 'utils/interfaces'
import { showToaster } from '../Toaster/Toaster.actions'
import { ERROR } from '../Toaster/Toaster.constants'
import { connect, disconnect } from 'redux/actions/connectWallet.actions'

type ConnectWalletProps = {
  className?: string
  closeMobileMenu?: (e: React.MouseEvent<HTMLElement>) => void
}

export const ConnectWallet = ({ className, closeMobileMenu }: ConnectWalletProps) => {
  const dispatch = useDispatch()
  const [showWertIoPopup, setShowWertIoPopup] = useState(false)
  const { wallet, ready, accountPkh } = useSelector((state: State) => state.wallet)
  const {
    coinPrices: {
      mvk: { usd: mvkUsdRate },
      tezos: { usd: xtzUsdRate },
    },
  } = useSelector((state: State) => state.tokens)
  const { mvkBalance, smvkBalance, xtzBalance } = useSelector((state: State) => state.user)
  const isMobileView = useMedia('(max-width: 870px)')

  const handleConnect = () => {
    dispatch(connect({ forcePermission: false }))
  }

  const handleNewConnect = () => {
    dispatch(connect({ forcePermission: true }))
  }

  const disconnectWallet = () => {
    dispatch(disconnect())
  }

  const showWertIoErrorToaster = () => {
    dispatch(
      showToaster(
        ERROR,
        'Wert io interaction error',
        'Error while interaction with wert io service happened, try later',
      ),
    )
  }

  const mountWertWiget = (commodity: string) => {
    const wertOptions = getWertOptions(commodity, setShowWertIoPopup, showWertIoErrorToaster)
    const wertWidgetInstance = new WertWidget(wertOptions)
    wertWidgetInstance.mount()
  }

  const coinsInfo: CoinsInfoType = {
    MVKExchangeRate: mvkUsdRate,
    userMVKBalance: mvkBalance,
    userXTZBalance: xtzBalance,
    userMVKStaked: smvkBalance,
    XTZExchnageRate: xtzUsdRate,
  }

  const detailsHandlers = {
    buyMVKHandler: () => mountWertWiget('MVK'),
    buyXTZHandler: () => mountWertWiget('XTZ'),
    stakeMVKHandler: () => window.open('https://front-dev.mavryk-dapp.pages.dev/', '_blank'),
  }

  const closeAllForMobileMenu = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setShowWertIoPopup(false)
    if (closeMobileMenu) closeMobileMenu(e)
  }, [])

  return (
    <ConnectWalletStyled className={className} id={'connectWalletButton'}>
      {/* For use of Beacon wallet, comment out below line and remove false section of this conditional */}
      {wallet ? (
        <>
          {ready && accountPkh ? (
            <>
              <ConnectedWalletBlock
                accountPkh={accountPkh}
                signOutHandler={disconnectWallet}
                changeWalletHandler={handleNewConnect}
                coinsInfo={coinsInfo}
                isMobile={isMobileView}
                detailsHandlers={detailsHandlers}
                closeMobileMenu={closeAllForMobileMenu}
              />
              <WertIoPopup closePopup={() => setShowWertIoPopup(false)} isOpened={showWertIoPopup} />
            </>
          ) : (
            <NoWalletConnectedButton handleConnect={handleConnect} />
          )}
        </>
      ) : (
        <InstallWalletButton />
      )}
    </ConnectWalletStyled>
  )
}

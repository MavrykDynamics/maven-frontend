import WertWidget from '@wert-io/widget-initializer'

import { useDispatch, useSelector } from 'react-redux'
import { useMedia } from 'react-use'

import { ConnectWalletStyled } from './ConnectWallet.style'
import { CoinsInfoType, ConnectedWalletBlock, NoWalletConnectedButton } from './ConnectWallet.view'
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
  const { ready, accountPkh } = useSelector((state: State) => state.wallet)
  const {
    coinPrices: {
      tezos: { usd: xtzUsdRate },
      tzbtc: { usd: tzBTCRate },
    },
  } = useSelector((state: State) => state.tokens)
  const { xtzBalance, LBTBalance, tzBTCBalance } = useSelector((state: State) => state.user)
  const isMobileView = useMedia('(max-width: 870px)')

  const handleConnect = () => {
    dispatch(connect())
  }

  const handleNewConnect = () => {
    dispatch(connect())
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
    userXTZBalance: xtzBalance,
    usertzBTCBalance: tzBTCBalance,
    userLBTBalance: LBTBalance,
    XTZExchnageRate: xtzUsdRate,
    tzBTCExchnageRate: Number(tzBTCRate),
    LBTExchnageRate: 1,
  }

  // TODO: clarify it with Sam
  const detailsHandlers = {
    buyTZBTCHandler: () => mountWertWiget('tzBTC'),
    buyXTZHandler: () => mountWertWiget('XTZ'),
    stakeSiriusHandler: () => mountWertWiget('Sirius'),
  }

  const closeAllForMobileMenu = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setShowWertIoPopup(false)
    if (closeMobileMenu) closeMobileMenu(e)
  }, [])

  return (
    <ConnectWalletStyled className={className} id={'connectWalletButton'}>
      {/* For use of Beacon wallet, comment out below line and remove false section of this conditional */}
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
    </ConnectWalletStyled>
  )
}

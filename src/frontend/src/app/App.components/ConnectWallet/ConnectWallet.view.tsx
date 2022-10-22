import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ACTION_PRIMARY, PRIMARY, TRANSPARENT } from '../Button/Button.constants'
import { Button } from '../Button/Button.controller'
import { CommaNumber } from '../CommaNumber/CommaNumber.controller'
import Icon from '../Icon/Icon.view'
import { BLUE } from '../TzAddress/TzAddress.constants'
import { TzAddress } from '../TzAddress/TzAddress.view'
import {
  ConnectedWalletStyled,
  SignOutButton,
  WalletNotConnectedButton,
  SimpleConnectedButton,
  ConnectedWalletDetailsItemStyled,
  MobileDetailsStyled,
} from './ConnectWallet.style'

export type CoinsInfoType = {
  userXTZBalance: number
  XTZExchnageRate: number
  tzBTCExchnageRate: number
  usertzBTCBalance: number
  userLBTBalance: number
}

type ConnectedWalletBlockProps = {
  accountPkh: string
  signOutHandler: () => void
  changeWalletHandler: () => void
  coinsInfo: CoinsInfoType
  isMobile: boolean
  detailsHandlers: {
    buyXTZHandler: () => void
    buyTZBTCHandler: () => void
  }
  closeMobileMenu: (e: React.MouseEvent<HTMLElement>) => void
}

export const MobileDetailsBlock = ({
  accountPkh,
  coinsInfo,
  signOutHandler,
  changeWalletHandler,
  detailsHandlers,
  handleCloseBtn,
  closeMobileMenu,
}: ConnectedWalletBlockProps & { handleCloseBtn: () => void }) => {
  return (
    <MobileDetailsStyled>
      <div className="close" onClick={handleCloseBtn}>
        <Icon id="close-stroke" />
      </div>
      <div className="top-visible-part ">
        <Icon id="wallet" className="wallet" />
        <var>
          <TzAddress tzAddress={accountPkh} hasIcon shouldCopy />
        </var>
        <Icon id="openLinkRight" className="openLink" />
      </div>

      <div className="details">
        <ConnectedWalletDetailsItem
          buttonText={'Buy XTZ'}
          coinAmount={coinsInfo.userXTZBalance}
          coinName={'XTZ'}
          buttonHandler={detailsHandlers.buyXTZHandler}
          subtextAmount={coinsInfo.userXTZBalance * coinsInfo.XTZExchnageRate}
          iconName={'XTZ_tezos'}
        />
        <ConnectedWalletDetailsItem
          buttonText={'But tzBTC'}
          coinAmount={coinsInfo.usertzBTCBalance}
          coinName={'tzBTC'}
          buttonHandler={(e: React.MouseEvent<HTMLElement>) => {
            closeMobileMenu(e)
            handleCloseBtn()
            detailsHandlers.buyTZBTCHandler()
          }}
          subtextAmount={coinsInfo.usertzBTCBalance * coinsInfo.tzBTCExchnageRate}
          iconName={'tzBTC'}
          disableBtn
        />
        <ConnectedWalletDetailsItem coinAmount={coinsInfo.userLBTBalance} coinName={'Sirius'} iconName={'sirius'} />

        <div className="buttons-wrapper">
          <SignOutButton onClick={signOutHandler}>Sign out</SignOutButton>
          <Button
            text="Change Wallet"
            onClick={changeWalletHandler}
            kind={PRIMARY}
            icon="exchange"
            className="LB change-wallet"
          />
        </div>
      </div>
    </MobileDetailsStyled>
  )
}

export const ConnectedWalletBlock = ({
  accountPkh,
  coinsInfo,
  signOutHandler,
  changeWalletHandler,
  detailsHandlers,
  isMobile,
  closeMobileMenu,
}: ConnectedWalletBlockProps) => {
  const [detailsShown, setDetailsShown] = useState(false)

  const mouseOverHanlder = useCallback(() => (isMobile ? undefined : setDetailsShown(true)), [isMobile])
  const mobileClickOpenHanler = useCallback(() => (isMobile ? setDetailsShown(true) : undefined), [isMobile])
  const closeHandler = useCallback(() => setDetailsShown(false), [])

  if (isMobile && detailsShown)
    return (
      <MobileDetailsBlock
        accountPkh={accountPkh}
        coinsInfo={coinsInfo}
        signOutHandler={signOutHandler}
        changeWalletHandler={changeWalletHandler}
        isMobile={isMobile}
        handleCloseBtn={closeHandler}
        detailsHandlers={detailsHandlers}
        closeMobileMenu={closeMobileMenu}
      />
    )

  return (
    <ConnectedWalletStyled onMouseOver={mouseOverHanlder} onMouseLeave={closeHandler} onClick={mobileClickOpenHanler}>
      <div className="top-visible-part ">
        <Icon id="wallet" className="wallet" />
        <var>
          <TzAddress tzAddress={accountPkh} hasIcon={false} shouldCopy={false} />
        </var>
        <Icon id="paginationArrowLeft" className="end-icon" />
      </div>

      <div className={`wallet-details ${detailsShown ? 'visible' : ''} ${isMobile ? 'mobile' : ''}`}>
        <div className="wallet-details-header">
          <div className="details-wallet ">
            <Icon id="wallet" className="wallet hover" />
            <var className="wallet-details-address hover">
              <TzAddress tzAddress={accountPkh} hasIcon type={BLUE} />
            </var>
          </div>

          <a href={`https://tzstats.com/${accountPkh}`} target="_blank" rel="noreferrer">
            <Icon id="send" className="icon-send" />
          </a>
        </div>

        <ConnectedWalletDetailsItem
          buttonText={'Buy XTZ'}
          coinAmount={coinsInfo.userXTZBalance}
          coinName={'XTZ'}
          buttonHandler={detailsHandlers.buyXTZHandler}
          subtextAmount={coinsInfo.userXTZBalance * coinsInfo.XTZExchnageRate}
          iconName={'XTZ_tezos'}
        />
        <ConnectedWalletDetailsItem
          buttonText={'Buy tzBTC'}
          coinAmount={coinsInfo.usertzBTCBalance}
          coinName={'tzBTC'}
          buttonHandler={detailsHandlers.buyTZBTCHandler}
          subtextAmount={coinsInfo.userXTZBalance * coinsInfo.tzBTCExchnageRate}
          iconName={'tzBTC'}
          disableBtn
        />
        <ConnectedWalletDetailsItem coinAmount={coinsInfo.userLBTBalance} coinName={'Sirius'} iconName={'sirius'} />

        <div className="buttons-wrapper">
          <SignOutButton onClick={signOutHandler}>Sign out</SignOutButton>
          <Button
            text="Change Wallet"
            onClick={changeWalletHandler}
            kind={PRIMARY}
            icon="exchange"
            className="change-wallet LB"
          />
        </div>
      </div>
    </ConnectedWalletStyled>
  )
}

export const NoWalletConnectedButton = ({ handleConnect }: { handleConnect: () => void }) => {
  return (
    <WalletNotConnectedButton onClick={handleConnect}>
      <Icon id="wallet" />
      <span>Connect Wallet</span>
    </WalletNotConnectedButton>
  )
}

export const InstallWalletButton = () => {
  return (
    <WalletNotConnectedButton onClick={() => window.open('https://templewallet.com/', '_blank')!.focus()}>
      Install wallet
    </WalletNotConnectedButton>
  )
}

export const SimpleConnectButtonNoAddress = ({ handleConnect }: { handleConnect: () => void }) => {
  return (
    <SimpleConnectedButton onClick={handleConnect}>
      <Icon id="wallet" />
      <div>Connect Wallet</div>
    </SimpleConnectedButton>
  )
}

type ConnectedWalletDetailsItemProps = {
  buttonText?: string
  coinName: string
  coinAmount: number
  buttonHandler?: (e: React.MouseEvent<HTMLElement>) => void
  subtextInfo?: string
  subtextAmount?: number
  iconName: string
  disableBtn?: boolean
}

const ConnectedWalletDetailsItem = ({
  buttonText,
  coinName,
  coinAmount,
  buttonHandler,
  subtextInfo,
  subtextAmount,
  iconName,
  disableBtn = false,
}: ConnectedWalletDetailsItemProps) => {
  return (
    <ConnectedWalletDetailsItemStyled>
      <div className="left-part">
        <div className="main-wrap">
          <div className="icon">
            {iconName === 'sirius' ? <img src={`/images/sirius-icon.png`} alt="" /> : <Icon id={iconName} />}
          </div>
          <CommaNumber
            value={coinAmount}
            endingText={coinName}
            showDecimal
            decimalsToShow={4}
            useMagnitude={false}
            className="main"
          />
        </div>

        {subtextAmount !== undefined ? (
          <CommaNumber
            value={subtextAmount}
            endingText={'USD'}
            showDecimal
            decimalsToShow={4}
            useMagnitude={false}
            className="subtext"
          />
        ) : (
          <div className="subtext">{subtextInfo}</div>
        )}
      </div>

      {buttonHandler && buttonText ? (
        <div className="btn-wrapper">
          <Button
            text={buttonText}
            kind={TRANSPARENT}
            onClick={buttonHandler}
            disabled={disableBtn}
            className="connect-wallet-details"
          />
          <Icon id="paginationArrowLeft" className={disableBtn ? 'disabled' : ''} />
        </div>
      ) : null}
    </ConnectedWalletDetailsItemStyled>
  )
}

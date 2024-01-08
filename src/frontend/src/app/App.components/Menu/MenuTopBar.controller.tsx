import {ConnectWallet} from 'app/App.components/ConnectWallet/ConnectWallet.controller'
import Icon from 'app/App.components/Icon/Icon.view'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {TopBarLinks} from './TopBarLinks/TopBarLinks.controller'
import {MenuLogo, MenuTopStyled} from './MenuTopBar.style'
import {MobileTopBar} from './TopBarLinks/MobileTopBar.controller'
import {useCallback, useState} from 'react'
import {useMedia} from 'react-use'
import {State} from 'utils/interfaces'
import {LIGHT_THEME} from 'redux/actions/preferences.action'

type MenuTopBarProps = {
  openChangeNodePopupHandler: () => void
}

export const SocialIcons = () => (
  <div className="social-wrapper">
    <a href="https://twitter.com/Mavryk_Finance" target="_blank" rel="noreferrer">
      <Icon id="socialTwitter" />
    </a>
    <a href="https://discord.com/invite/7VXPR4gkT6" target="_blank" rel="noreferrer">
      <Icon id="socialDiscord" />
    </a>
    <a href="https://t.me/Mavryk_Finance" target="_blank" rel="noreferrer">
      <Icon id="socialTelegram" />
    </a>
    <a href="https://blog.mavrykdynamics.com/" target="_blank" rel="noreferrer">
      <Icon id="socialMedium" />
    </a>
    <a href="https://github.com/mavenfinance/" target="_blank" rel="noreferrer">
      <Icon id="socialGitHub" />
    </a>
  </div>
)

export const PRODUCTS_LINKS = [
  {
    name: 'Dapp',
    href: 'https://ghostnet.mavenfinance.io/',
    path: '/dashboard/lending',
  },
  { name: 'Liquidity Baking', href: 'liquidity-baking', path: '/liquidity-baking' },
  { name: 'Maven Bakeries', href: 'bakery', path: '/bakery' },
]

export const ABOUT_LINKS = [
  { name: 'MVN Token (Soon)', href: '/', disabled: true },
  { name: 'Team', href: 'https://mavenfinance.io/#team', path: 'https://mavenfinance.io/#team' },
  // { name: 'Who we are', href: 'https://mavenfinance.io/' },
  // { name: 'Roadmap', href: 'https://mavenfinance.io/#roadmap' },
]

export const BLOG_LINKS = []

export const DOCS_LINKS = [
  { name: 'Litepaper', href: 'https://mavenfinance.io/litepaper', path: 'https://mavenfinance.io/litepaper' },
  { name: 'DAO docs', href: 'https://docs.mavenfinance.io/', disabled: false },
  { name: 'Security Audits (Soon)', href: '/', disabled: true },
  { name: 'Github', href: 'https://github.com/mavenfinance/', disabled: false },
]

export const MenuTopBar = ({ openChangeNodePopupHandler }: MenuTopBarProps) => {
  const { themeSelected } = useSelector((state: State) => state.preferences)
  const [showMobileTopBar, setShowMobileTopBar] = useState(false)
  const isMobileView = useMedia('(max-width: 870px)')

  const logoImg = themeSelected === LIGHT_THEME ? '/logo-light.svg' : '/logo-dark.svg'
  const logoMobile = '/logo-mobile.svg'

  const burgerClickHandlerWrapped = useCallback((e) => {
    e.stopPropagation()
    setShowMobileTopBar(false)
  }, [])

  return (
    <MenuTopStyled>
      <div className="left-side">
        <Link to="/">
          <MenuLogo alt="logo" className={'desktop-logo'} src={logoImg} />
          <MenuLogo alt="logo" className={'mobile-logo'} src={logoMobile} />
        </Link>
      </div>
      <div className="grouped-links">
        <TopBarLinks groupName={'Products'} groupLinks={PRODUCTS_LINKS} />
        <TopBarLinks groupName={'About'} groupLinks={ABOUT_LINKS} />
        <TopBarLinks groupName={'Blog 🔥'} groupLinks={BLOG_LINKS} groupNameLink="https://blog.mavrykdynamics.com/" />
        <TopBarLinks groupName={'Docs'} groupLinks={DOCS_LINKS} />
      </div>
      <div className="right-side">
        <SocialIcons />
        {/* Need this condition cuz of wert io container, technically without it will be 2 containers, and wert will take this container on mobile, not the mobile one */}
        {!isMobileView ? <ConnectWallet className="connect-wallet-small" /> : null}
        <div className="settingsIcon" onClick={openChangeNodePopupHandler}>
          <Icon id="gear" />
        </div>
      </div>

      <div className="mobile-menu">
        <div className="settingsIcon" onClick={openChangeNodePopupHandler}>
          <Icon id="gear" />
        </div>

        <Link to="/">
          <MenuLogo alt="logo" className={'mobile-logo'} src={logoMobile} />
        </Link>

        <div className="top-bar-toggler" onClick={() => setShowMobileTopBar(!showMobileTopBar)}>
          {showMobileTopBar ? <Icon id="close-stroke" /> : <Icon id="burger-menu" />}
        </div>
      </div>

      <MobileTopBar show={showMobileTopBar} closeMobileMenu={burgerClickHandlerWrapped} />
    </MenuTopStyled>
  )
}

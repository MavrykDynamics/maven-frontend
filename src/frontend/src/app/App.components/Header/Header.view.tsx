import { TOGGLE_DARKTHEME } from 'actions'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import Toggle from 'react-toggle'

// prettier-ignore
import { HeaderGrid, HeaderIcon, HeaderLogo, HeaderStyled } from "./Header.style";

export const HeaderView = () => {
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled)
  const dispatch = useDispatch()

  const isLitepaperPage = window.location.pathname === '/litepaper'

  /**
   * handle scroll for desktop (parallax)
   */
  const [scrollPositionDesktop, setScrollPositionDesktop] = useState(0)
  const handleScroll = () => {
    setScrollPositionDesktop(window.pageYOffset)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  /**
   * handle scroll for mobile (Pure CSS)
   */
  const scrollPositionMobile = useSelector((state: any) => state.preferences.scrollPosition)

  // const logoUrl = darkThemeEnabled || (!darkThemeEnabled && !isLitepaperPage && scrollPositionMobile < 800 && scrollPositionDesktop < 900) ? "/logo-dark.svg" : "/logo-light.svg";
  const showBg = scrollPositionMobile > 800 || scrollPositionDesktop > 900 || isLitepaperPage

  const logoUrl = darkThemeEnabled ? '/logo-dark.svg' : '/logo-light.svg'
  const darkColor = darkThemeEnabled ? 'rgb(8, 6, 40)' : 'transparent'
  const browserColor = showBg ? darkColor : 'transparent'

  return (
    <HeaderStyled showBg={showBg}>
      <Helmet>
        <meta name="theme-color" content={browserColor} />
      </Helmet>
      <HeaderGrid showBg={showBg}>
        <Link to="/">
          <HeaderLogo showBg={showBg} src={logoUrl} />
        </Link>

        <Link to="/litepaper">Litepaper</Link>

        <HashLink
          to="/#calculator"
          scroll={(el) =>
            window.scrollTo({
              behavior: 'smooth',
              top: el.getBoundingClientRect().top + window.pageYOffset - 124,
            })
          }
        >
          Calculator
        </HashLink>
        <HashLink
          to="/#features"
          scroll={(el) =>
            window.scrollTo({
              behavior: 'smooth',
              top: el.getBoundingClientRect().top + window.pageYOffset - 74,
            })
          }
        >
          Features
        </HashLink>
        <HashLink
          to="/#tokenomics"
          scroll={(el) =>
            window.scrollTo({
              behavior: 'smooth',
              top: el.getBoundingClientRect().top + window.pageYOffset - 60,
            })
          }
        >
          Tokenomics
        </HashLink>
        <HashLink
          to="/#satellites"
          scroll={(el) =>
            window.scrollTo({
              behavior: 'smooth',
              top: el.getBoundingClientRect().top + window.pageYOffset - 124,
            })
          }
        >
          Satellites
        </HashLink>
        <a href="https://blogs.mavryk.finance/" target="_blank" rel="noreferrer">
          Blog
        </a>
        <label>
          <Toggle
            //defaultChecked={themeMode}
            defaultChecked={darkThemeEnabled}
            icons={{
              checked: <HeaderIcon src="/images/moon.svg" />,
              unchecked: <HeaderIcon src="/images/sun.svg" />,
            }}
            aria-label="Dark mode toggle"
            onChange={() => dispatch({ type: TOGGLE_DARKTHEME })}
          />
        </label>
      </HeaderGrid>
    </HeaderStyled>
  )
}

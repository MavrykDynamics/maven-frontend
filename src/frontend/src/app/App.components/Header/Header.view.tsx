import { TOGGLE_DARKTHEME } from 'actions';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import Toggle from 'react-toggle'

// prettier-ignore
import { HeaderGrid, HeaderIcon, HeaderLogo, HeaderStyled } from "./Header.style";

export const HeaderView = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
  const dispatch = useDispatch();

  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const logoUrl = darkThemeEnabled || scrollPosition < 900 ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <HeaderStyled showBg={scrollPosition > 900}>
      <HeaderGrid showBg={scrollPosition > 900}>
        <Link to="/">
          <HeaderLogo src={logoUrl} />
        </Link>

        <div />

        <Link to="/litepaper">Litepaper</Link>

        <HashLink
          to="/#calculator"
          scroll={(el) =>
            window.scrollTo({
              behavior: 'smooth',
              top: el.getBoundingClientRect().top + window.pageYOffset - 100,
            })
          }
        >
          Calculator
        </HashLink>
        <HashLink
          to="/#satellites"
          scroll={(el) =>
            window.scrollTo({
              behavior: 'smooth',
              top: el.getBoundingClientRect().top + window.pageYOffset,
            })
          }
        >
          Satellites
        </HashLink>
        <HashLink
          to="/#highlights"
          scroll={(el) =>
            window.scrollTo({
              behavior: 'smooth',
              top: el.getBoundingClientRect().top + window.pageYOffset,
            })
          }
        >
          Highlights
        </HashLink>
        <HashLink
          to="/#tokenomics"
          scroll={(el) =>
            window.scrollTo({
              behavior: 'smooth',
              top: el.getBoundingClientRect().top + window.pageYOffset - 100,
            })
          }
        >
          Tokenomics
        </HashLink>
        <label>
          <Toggle
            //defaultChecked={themeMode}
            defaultChecked={darkThemeEnabled}
            icons={{
              checked: <HeaderIcon src='/images/moon.svg'/>,
              unchecked: <HeaderIcon src='/images/sun.svg'/>
            }}
            aria-label="Dark mode toggle"
            onChange={() => dispatch({type: TOGGLE_DARKTHEME})} />
        </label>
      </HeaderGrid>
    </HeaderStyled>
  )
}

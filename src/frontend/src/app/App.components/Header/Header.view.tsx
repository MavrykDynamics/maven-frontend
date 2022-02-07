import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import Toggle from 'react-toggle'

import { TOGGLE_DARKTHEME } from 'actions';
import { useDispatch, useSelector } from 'react-redux';

// prettier-ignore
import { HeaderGrid, HeaderLogo, HeaderStyled } from "./Header.style";

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

  return (
    <HeaderStyled showBg={scrollPosition > 900}>
      <HeaderGrid>
        <Link to="/">
          <HeaderLogo alt="logo" src="/logo.svg" />
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
            icons={{ checked: "🌙", unchecked: "🔆" }}
            aria-label="Dark mode toggle"
            onChange={() => dispatch({type: TOGGLE_DARKTHEME})} />
        </label>
      </HeaderGrid>
    </HeaderStyled>
  )
}

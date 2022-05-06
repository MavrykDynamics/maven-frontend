import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// prettier-ignore
import { FooterBottom, FooterContainer, FooterDescription, FooterLinks, FooterLogo, FooterSocials, FooterStyled, FooterTop } from "./Footer.style";

export const FooterView = () => {
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled)
  const logoUrl = darkThemeEnabled ? '/logo-dark.svg' : '/logo-light.svg'

  return (
    <FooterStyled id="footer">
      <FooterContainer>
        <FooterTop>
          <div>
            <Link to="/">
              <FooterLogo alt="logo" src={logoUrl} />
            </Link>
            <FooterDescription>
              Mavryk is a DAO operated financial ecosystem that lets users borrow and earn on their terms, while
              participating in the governance of the platform.
            </FooterDescription>
          </div>

          <FooterSocials>
            <a href="https://twitter.com/Mavryk_Finance" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#twitter" />
              </svg>
            </a>
            <a href="https://t.me/Mavryk_Finance" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#telegram" />
              </svg>
            </a>
            <a href="https://medium.com/@Mavryk_Finance" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#medium" />
              </svg>
            </a>
            <a href="https://discord.com/invite/7VXPR4gkT6" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#discord" />
              </svg>
            </a>
            <a href="https://github.com/mavrykfinance/" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#gitHub" />
              </svg>
            </a>
          </FooterSocials>
        </FooterTop>
        <FooterBottom>
          <div>© Mavryk Finance {new Date().getFullYear()}</div>
          {/* <FooterLinks>
            <Link to="privacy">Privacy Policy</Link>
          </FooterLinks> */}
        </FooterBottom>
      </FooterContainer>
    </FooterStyled>
  )
}

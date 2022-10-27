import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { DARK_THEME, LIGHT_THEME } from 'redux/actions/preferences.action'
import { State } from 'utils/interfaces'

// prettier-ignore
import { FooterBottom, FooterContainer, FooterDescription, FooterLogo, FooterSocials, FooterStyled, FooterTop } from "./Footer.style";

export const FooterView = ({ className }: { className?: string }) => {
  const { themeSelected } = useSelector((state: State) => state.preferences)
  const logoUrl = themeSelected !== LIGHT_THEME ? '/logo-dark.svg' : '/logo-light.svg'

  return (
    <FooterStyled id="footer" className={className}>
      <FooterContainer>
        <FooterTop className="top">
          <div className="logo-descr">
            <Link to="/">
              <FooterLogo alt="logo" src={logoUrl} />
            </Link>
            <FooterDescription>
              Mavryk is a DAO operated financial ecosystem that lets users borrow and earn on their terms, while
              participating in the governance of the platform.
            </FooterDescription>

            <FooterBottom className="mob">
              <div>© Mavryk Finance {new Date().getFullYear()}</div>
              {/* <FooterLinks>
            <Link to="privacy">Privacy Policy</Link>
          </FooterLinks> */}
            </FooterBottom>
          </div>

          <FooterSocials>
            <a href="https://twitter.com/Mavryk_Finance" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#twitter" />
              </svg>
            </a>
            <a href="https://discord.com/invite/7VXPR4gkT6" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#discord" />
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
            <a href="https://github.com/mavrykfinance/" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#gitHub" />
              </svg>
            </a>
          </FooterSocials>
        </FooterTop>
        <FooterBottom>
          <div className="hide">© Mavryk Finance {new Date().getFullYear()}</div>
          {/* <FooterLinks>
            <Link to="privacy">Privacy Policy</Link>
          </FooterLinks> */}
          <div className="aditional-links">
            <a href="https://docs.google.com/document/d/1jW-XtRPv3TsCV2meV2ajgkQ6dI0iEwuz9xgZwnyMliw/edit?usp=sharing">
              Privacy Policy
            </a>
            <a href="https://docs.google.com/document/d/1R0LA7CmVQjH7vr-FvWOy96LRxJ_XU3HXLXnqNZjZlJQ/edit?usp=sharing">
              Terms of Use
            </a>
          </div>
        </FooterBottom>
      </FooterContainer>
    </FooterStyled>
  )
}

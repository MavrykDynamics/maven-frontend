import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {LIGHT_THEME} from 'redux/actions/preferences.action'
import {State} from 'utils/interfaces'

// prettier-ignore
import {
  FooterBottom,
  FooterContainer,
  FooterDescription,
  FooterLogo,
  FooterSocials,
  FooterStyled,
  FooterTop
} from "./Footer.style";

type Props = {
  className?: string
}

export const FooterView = ({ className }: Props) => {
  const { themeSelected } = useSelector((state: State) => state.preferences)
  const logoUrl = themeSelected !== LIGHT_THEME ? '/logo-dark.svg' : '/logo-light.svg'

  return (
    <FooterStyled className={className} id="footer">
      <FooterContainer>
        <FooterTop className="top">
          <div className="logo-descr">
            <Link to="/">
              <FooterLogo alt="logo" src={logoUrl} />
            </Link>
            <FooterDescription>
              Maven Finance is a DAO operated financial ecosystem that lets users borrow and earn on their terms, while
              participating in the governance of the platform.
            </FooterDescription>

            <FooterBottom className="mob">
              <div>© Maven Finance {new Date().getFullYear()}</div>
              {/* <FooterLinks>
            <Link to="privacy">Privacy Policy</Link>
          </FooterLinks> */}
            </FooterBottom>
          </div>

          <FooterSocials>
            <a href="https://twitter.com/MavenFinanceDAO" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#twitter" />
              </svg>
            </a>
            <a href="https://discord.com/invite/7VXPR4gkT6" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#discord" />
              </svg>
            </a>
            <a href="https://t.me/MavenFinance" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#telegram" />
              </svg>
            </a>
            <a href="https://blog.mavenfinance.io/" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#medium" />
              </svg>
            </a>
            <a href="https://github.com/mavenfinance/" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#gitHub" />
              </svg>
            </a>
          </FooterSocials>
        </FooterTop>
        <FooterBottom>
          <div className="hide">© Maven Finance {new Date().getFullYear()}</div>
          {/* <FooterLinks>
            <Link to="privacy">Privacy Policy</Link>
          </FooterLinks> */}

          <div className="links">
            <div className="powered-by">
              Powered by&nbsp;
              <a href="https://tzkt.io" target="_blank" rel="noreferrer">
                TzKT API
              </a>
              &nbsp;&&nbsp;
              <a href=" https://dipdup.io" target="_blank" rel="noreferrer">
                DipDup
              </a>
            </div>
            <div className="aditional-links">
              <a
                target="_blank"
                href="https://docs.google.com/document/d/1jW-XtRPv3TsCV2meV2ajgkQ6dI0iEwuz9xgZwnyMliw/edit?usp=sharing"
                rel="noreferrer"
              >
                Privacy Policy
              </a>
              <a
                target="_blank"
                href="https://docs.google.com/document/d/1R0LA7CmVQjH7vr-FvWOy96LRxJ_XU3HXLXnqNZjZlJQ/edit?usp=sharing"
                rel="noreferrer"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </FooterBottom>
      </FooterContainer>
    </FooterStyled>
  )
}

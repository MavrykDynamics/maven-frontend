import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// prettier-ignore
import { FooterBottom, FooterContainer, FooterDescription, FooterLinks, FooterLogo, FooterSocials, FooterStyled, FooterTop } from "./Footer.style";

export const FooterView = () => {
  const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
  const logoUrl = darkThemeEnabled ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <FooterStyled id="footer">
      <FooterContainer>
        <FooterTop>
          <div>
            <Link to="/">
              <FooterLogo alt="logo" src={logoUrl} />
            </Link>
            <FooterDescription>
              Mavryk is a decentralized finance ecosystem designed to allow users to borrow and earn, to unlock the
              world from legacy financial systems.
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
            <a href="https://www.linkedin.com/company/mavryk-finance/" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#linkedin" />
              </svg>
            </a>
            <a href="https://discord.gg/CGn69gDqtF" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#discord" />
              </svg>
            </a>
          </FooterSocials>
        </FooterTop>
        <FooterBottom>
          <div>© Mavryk. 2021</div>
          <FooterLinks>
            <Link to="privacy">Privacy Policy</Link>
          </FooterLinks>
        </FooterBottom>
      </FooterContainer>
    </FooterStyled>
  )
}

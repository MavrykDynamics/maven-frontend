import { Link } from 'react-router-dom'

// prettier-ignore
import { FooterContainer, FooterDescription, FooterLinks, FooterLogo, FooterSocials, FooterStyled, FooterTop } from "./Footer.style";

export const FooterView = () => {
  return (
    <FooterStyled>
      <FooterContainer>
        <FooterTop>
          <div>
            <Link to="/">
              <FooterLogo alt="logo" src="/images/logo-white.svg" />
            </Link>
            <FooterDescription>
              Mavryk is a decentralized finance ecosystem designed to allow users to borrow and earn, to unlock the
              world from legacy financial systems.
            </FooterDescription>
            <div>© Mavryk. 2021</div>
          </div>

          <div />

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
        <FooterLinks>
          <Link to="privacy">Privacy Policy</Link>
        </FooterLinks>
      </FooterContainer>
    </FooterStyled>
  )
}

import * as React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { Page } from 'styles/components'

// prettier-ignore
import { JubontronContainer, JubontronSubTitle, JubontronTitle, JumbotronButton, JumbotronButtons, JumbotronSocials, JumbotronStyled } from './Jumbotron.style'

export const JumbotronView = () => {
  return (
    <JumbotronStyled>
      <Page>
        <JubontronContainer>
          <JubontronTitle>
            <h1>A DeFi Bank for the People</h1>
          </JubontronTitle>
          <JubontronSubTitle>
            Mavryk is a cooperatively run financial ecosystem that lets users borrow and earn on their terms, while
            participating in the governance of the platform.
          </JubontronSubTitle>
          <JumbotronButtons>
            <HashLink
              to="/#newsletter"
              scroll={(el) =>
                window.scrollTo({
                  behavior: 'smooth',
                  top: el.getBoundingClientRect().top + window.pageYOffset - 80,
                })
              }
            >
              <JumbotronButton>Sign Up</JumbotronButton>
            </HashLink>
            <Link to="/litepaper">
              <JumbotronButton secondary>Litepaper</JumbotronButton>
            </Link>
          </JumbotronButtons>
          <JumbotronSocials>
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
            <a href="https://github.com/mavrykfinance/" target="_blank" rel="noreferrer">
              <svg>
                <use xlinkHref="/icons/sprites.svg#gitHub" />
              </svg>
            </a>
          </JumbotronSocials>
        </JubontronContainer>
      </Page>
    </JumbotronStyled>
  )
}

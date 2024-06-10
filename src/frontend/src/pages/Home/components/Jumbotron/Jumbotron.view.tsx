import {Page} from 'styles/components'

// prettier-ignore
import {
  BUTTON_PULSE,
  JubontronContainer,
  JubontronSubTitle,
  JubontronTitle,
  JumbotronButton,
  JumbotronButtons,
  JumbotronSocials,
  JumbotronStyled
} from './Jumbotron.style'

export const JumbotronView = () => {

  const isDisabled = true

  const jumbotronButtonClasses = isDisabled ? 'disabled': BUTTON_PULSE

  return (
    <JumbotronStyled>
      <Page>
        <JubontronContainer>
          <JubontronTitle>
            <h1>A DeFi Bank for the People</h1>
          </JubontronTitle>
          <JubontronSubTitle>
            Maven is a DAO operated financial ecosystem that lets users borrow and earn on their terms, while
            participating in the governance of the platform.
          </JubontronSubTitle>
          <JumbotronButtons>
            <a href="https://atlasnet.mavenfinance.io/" target="_blank" rel="noreferrer">
              <JumbotronButton className={BUTTON_PULSE}>Enter DAPP</JumbotronButton>
            </a>

            {/* <HashLink */}
            {/*  to="/#newsletter"*/}
            {/*  scroll={(el) =>*/}
            {/*    window.scrollTo({*/}
            {/*      behavior: 'smooth',*/}
            {/*      top: el.getBoundingClientRect().top + window.pageYOffset - 80,*/}
            {/*    })*/}
            {/*  }*/}
            {/*>*/}
            {/*  <JumbotronButton>Sign Up</JumbotronButton>*/}
            {/*</HashLink> */}
          </JumbotronButtons>
          <JumbotronSocials>
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
            <a href="https://github.com/mavenfinance/" target="_blank" rel="noreferrer">
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

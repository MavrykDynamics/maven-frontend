import * as React from 'react'
import { Link } from 'react-router-dom'
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
            <Link to="/#newsletter" onClick={() => document.getElementById('newsletter')!.scrollIntoView()}>
              <JumbotronButton>Sign Up</JumbotronButton>
            </Link>
            <Link to="/litepaper">
              <JumbotronButton secondary>Litepaper</JumbotronButton>
            </Link>
          </JumbotronButtons>
          <JumbotronSocials />
        </JubontronContainer>
      </Page>
    </JumbotronStyled>
  )
}

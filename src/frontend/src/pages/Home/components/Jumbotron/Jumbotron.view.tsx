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
            <div>A De-Fi Bank for the People</div>
          </JubontronTitle>
          <JubontronSubTitle>
            Mavryk is a decentralized finance ecosystem designed for community governance and allow users to borrow,
            earn, and unlock the world from legacy financial systems.
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

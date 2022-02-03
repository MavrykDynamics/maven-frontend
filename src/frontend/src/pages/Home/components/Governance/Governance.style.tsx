import styled from 'styled-components/macro'
import { backgroundColor, Page } from 'styles'

export const GovernanceStyled = styled.div`
  //background: url('./images/governance-bg.svg'), #1C1C3F;
  background: #1C1C3F;
  background-repeat: no-repeat;
  background-position: bottom right;
  margin-bottom: 100px;
  padding: 50px 0;
`

export const GovernanceContent = styled(Page)`
  > h1 {
    color: ${backgroundColor};
  }

  > img {
    margin: 20px auto 100px auto;
    display: block;
  }
`

export const GovernanceImage = styled.div`
  background-image: url('/images/governance.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 200px;

  @media (max-width: 500px) {
    background-image: url('/images/governance-cycle-mobile.svg');
    height: 1200px;
  }
`

export const GovernanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  //grid-gap: 40px;

  > div {
    position: relative;
    z-index: 0;
    grid-column: span 4;
  }
`
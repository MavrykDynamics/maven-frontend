import styled from 'styled-components/macro'
import { backgroundColor, Page, subTextColor } from 'styles'

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
    color: ${subTextColor};
  }

  > img {
    margin: 20px auto 100px auto;
    display: block;
  }
`

export const GovernanceImage = styled.div<{img: string, height?: string, backgroundSize?: string}>`
  background-image: url(${props => props.img || ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => props.backgroundSize || "contain"};
  height: ${props => props.height || "200px"};

  @media (max-width: 500px) {
    background-image: url(${props => props.img || ""});
    height: ${props => props.height || "350"};
  }
`

export const GovernanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  > div {
    position: relative;
    grid-column: span 2;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`

export const GovernanceList = styled.div`
  display: none;
  
  @media (max-width: 1000px) {
    display: block;
  }
`
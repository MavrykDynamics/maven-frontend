import styled from 'styled-components/macro'
import { Page } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const GovernanceStyled = styled.div<{theme: MavrykTheme}>`
  //background: url('./images/governance-bg.svg'), ${({theme}) => theme.containerColor};
  background: ${({theme}) => theme.containerColor};
  background-repeat: no-repeat;
  background-position: bottom right;
  margin-bottom: 100px;
  padding: 50px 0;
`

export const GovernanceContent = styled(Page)<{theme: MavrykTheme}>`
  > h1 {
    color: ${({theme}) => theme.subTextColor};
  }

  > img {
    margin: 20px auto 100px auto;
    display: block;
  }
`

export const GovernanceParallaxLayer = styled.div<{zIndex: number}>`
  z-index: ${props => props.zIndex || "0"};
`

export const GovernanceImage = styled.div<{img: string, height?: string, backgroundSize?: string}>`
  background-image: url(${props => props.img || ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => props.backgroundSize || "contain"};
  height: ${props => props.height || "200px"};
  margin: auto auto 20px auto;

  @media (max-width: 500px) {
    background-image: url(${props => props.img || ""});
  }
`

export const GovernanceImagePlanet = styled.div<{img: string, height?: string, top?: string, backgroundSize?: string}>`
  position: absolute;
  background-image: url(${props => props.img || ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: ${props => props.backgroundSize || "contain"};
  height: ${props => props.height || "200px"};
  width: 100%;
  margin: auto auto 20px auto;
  top: ${props => props.top || "-50%"};

  @media (max-width: 500px) {
    background-image: url(${props => props.img || ""});
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
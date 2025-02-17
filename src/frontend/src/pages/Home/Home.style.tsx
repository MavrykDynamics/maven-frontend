import styled from 'styled-components/macro'
import {MavenTheme} from 'utils/interfaces'

export const CONTAINER_WIDTH = '1480px'

export const HomeStyled = styled.div`
  --carousel-button-size: 80px;
  --carousel-button-indent: -120px;
  --carousel-button-bg: transparent;

  margin-top: -100px;

  @media (max-width: 1000px) {
    margin-top: 0px;
    overflow-x: hidden;
    overflow-y: auto;
    overflow-anchor: auto;
    perspective: 300px;
  }
`

export const HomeNoParallax = styled.div<{ theme: MavenTheme }>`
  @media (max-width: 1000px) {
    position: relative;
    padding-top: 50px;
    transform-style: preserve-3d;
    transform: translateZ(0) scale(1);
    z-index: 10;
    background-color: ${({ theme }) => theme.backgroundColor};
    margin-top: -1px;
  }
`

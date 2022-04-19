import styled from 'styled-components/macro'
import { MavrykTheme } from 'utils/interfaces'

export const CONTAINER_WIDTH = '1480px'

export const HomeStyled = styled.div`
  margin-top: -100px;

  @media (max-width: 1000px) {
    margin-top: 0px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    overflow-anchor: auto;
    perspective: 300px;
  }
`

export const HomeNoParallax = styled.div<{ theme: MavrykTheme }>`
  @media (max-width: 1000px) {
    position: relative;
    padding-top: 50px;
    transform-style: preserve-3d;
    transform: translateZ(0) scale(1);
    z-index: 10;
    background-color: ${({ theme }) => theme.backgroundColor};
  }
`

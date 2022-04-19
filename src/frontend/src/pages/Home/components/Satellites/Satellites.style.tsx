import styled from 'styled-components/macro'
import { MavrykTheme } from 'utils/interfaces'

export const SatellitesStyled = styled.section<{ theme: MavrykTheme }>`
  overflow: hidden;
  position: relative;
  text-align: center;
  background: ${({ theme }) => theme.satellitesGradient};

  h2 {
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 30px;
  }

  p {
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
  }
`

export const SatellitesFrontFigure = styled.figure<{ theme: MavrykTheme }>`
  margin: 0;
  position: absolute;
  bottom: -10px;
  width: 100vw;
  left: 0;

  img {
    width: 100%;
  }
`

export const SatellitesImage = styled.figure<{ src: string; srcMobile: string }>`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 900px;
  margin: 0;
  margin-top: 140px;

  @media (max-width: 500px) {
    background-image: url(${(props) => props.srcMobile});
    height: 650px;
  }
`

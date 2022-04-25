import styled from 'styled-components/macro'
import { MavrykTheme } from 'utils/interfaces'

export const SatellitesStyled = styled.section<{ theme: MavrykTheme }>`
  overflow: hidden;
  position: relative;
  text-align: center;
  background: ${({ theme }) => theme.satellitesGradient};
  padding: 0 120px;

  @media (max-width: 1000px) {
    padding: 0 40px;
  }
  @media (max-width: 700px) {
    padding: 0 20px;
  }

  h2 {
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 30px;
    color: ${({ theme }) => theme.headerSectionsColor};

    @media (max-width: 1000px) {
      font-size: 36px;
      line-height: 1.5;
      margin-bottom: 16px;
      padding-top: 40px;
    }

    @media (max-width: 700px) {
      font-size: 24px;
    }

    @media (max-width: 500px) {
      padding-top: 16px;
    }
  }

  p {
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;

    @media (max-width: 1000px) {
      font-size: 15px;
      line-height: 1.5;
      margin-bottom: 32px;
    }
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
    display: block;
    min-height: 50px;
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
  min-height: 50px;

  @media (max-width: 1000px) {
    height: 700px;
    margin-top: 100px;
  }

  @media (max-width: 700px) {
    height: 450px;
  }

  @media (max-width: 500px) {
    background-image: url(${(props) => props.srcMobile});
    height: 300px;
    background-size: contain;
    margin-top: 64px;
    margin-bottom: -32px;
  }

  @media (max-width: 374px) {
    height: 250px;
  }
`

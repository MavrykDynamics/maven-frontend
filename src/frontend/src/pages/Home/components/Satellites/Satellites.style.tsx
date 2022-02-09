import styled from 'styled-components/macro'

export const SatellitesStyled = styled.div`
  background-image: url('/images/satellite-bg.svg');
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  z-index: 2;

  padding: 100px 20px 300px 20px;
  margin: -100px auto -200px auto;

  max-width: 100vw;
  width: 1280px;
  position: relative;
`

export const SatellitesImage = styled.div<{src: string, srcMobile: string}>`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 700px;
  transition: all 0.25s linear;

  @media (max-width: 500px) {
    background-image: url(${(props) => props.srcMobile});
    height: 650px;
  }
`

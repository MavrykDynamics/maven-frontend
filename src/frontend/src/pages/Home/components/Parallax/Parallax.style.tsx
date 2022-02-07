import styled from 'styled-components/macro'

export const ParallaxStyled = styled.div`
`

export const ParallaxDesktop = styled.div`
  display: block;
  @media (max-width: 1000px) {
    display: none;
  }
`

export const ParallaxGroup = styled.div`
  display: none;
  @media (max-width: 1000px) {
    display: block;
    position: relative;
    height: 100vh;
    width: 100vw;
    transform-style: preserve-3d;
  }
`

export const ParallaxLayer = styled.div<{ img: string, zIndex: number, translateZ: string, scale: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("${props => props.img || ""}") no-repeat center;
  background-size: cover;
  transform: translateZ(${props => props.translateZ || "0px"}) scale(${props => props.scale || "0"});
  z-index: ${props => props.zIndex || "0"};
`
import styled from 'styled-components/macro'

export const HomeStyled = styled.div`
  margin-top: -100px;
  
  @media (max-width: 1000px) {
    margin-top: 0px;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    perspective: 300px;
  }
`

export const HomeParallax = styled.div`
  display: block;
  @media (max-width: 1000px) {
    display: none;
  }
`

export const HomeParallaxGroup = styled.div`
  display: none;
  @media (max-width: 1000px) {
    display: block;
    position: relative;
    height: 100vh;
    width: 100vw;
    transform-style: preserve-3d;
  }
`

export const HomeParallaxPage = styled.div`
  @media (max-width: 1000px) {
    position: relative;
    padding-top: 50px;
    transform-style: preserve-3d;
    transform: translateZ(0) scale(1);
    z-index: 10;
    background-color: #171735;
  }
`

export const HomeParallaxLayer = styled.div<{ img: string, zIndex: number, translateZ: string, scale: number }>`
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
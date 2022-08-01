import styled from 'styled-components/macro'

export const ParallaxStyled = styled.div`
  overflow: hidden;
`

export const ParallaxDesktop = styled.div`
  display: block;

  > div {
    width: 100%;
    padding-bottom: 200px;
    margin-bottom: -2px;

    [data-testid='layer-8'] {
      background-position: center bottom !important;
    }

    @media (max-width: 1000px) {
      height: 100vh;
      padding-bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  &.lb {
    > div {
      @media (max-width: 1000px) {
        height: fit-content;
      }
    }
  }
`

export const ParallaxLayer = styled.div<{ img: string; zIndex: number; translateZ: string; scale: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('${(props) => props.img || ''}') no-repeat center;
  background-size: cover;
  transform: translateZ(${(props) => props.translateZ || '0px'}) scale(${(props) => props.scale || '0'});
  z-index: ${(props) => props.zIndex || '0'};

  @media (max-width: 700px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

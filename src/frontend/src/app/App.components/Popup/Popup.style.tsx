import styled from 'styled-components/macro'
import {MavenTheme} from 'utils/interfaces'

export const PopupStyled = styled.div`
  .popup-enter {
    opacity: 0;
  }

  .popup-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }

  .popup-exit {
    opacity: 1;
  }

  .popup-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`

export const PopupContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0000007a;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
`
export const PopupNewsletter = styled.div<{ theme: MavenTheme }>`
  width: 1232px;
  height: 576px;
  margin: 16px;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  position: relative;

  @media (max-width: 1290px) {
    padding: 0 20px;
  }

  @media (max-width: 700px) {
    padding: 10px;
  }

  h2 {
    margin-bottom: 40px;
  }

  form {
    margin-bottom: 76px;

    @media (max-width: 1000px) {
      margin-bottom: 128px;
    }

    @media (max-width: 700px) {
      margin-bottom: 100px;
    }
  }

  figure {
    position: absolute;
    margin: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    img {
      position: relative;
      left: 85px;
      width: auto;
      min-width: 120%;
      bottom: -132px;

      @media (max-width: 1100px) {
        bottom: -100px;
      }

      @media (max-width: 1000px) {
        bottom: -90px;
      }

      @media (max-width: 700px) {
        bottom: -60px;
      }

      @media (max-width: 500px) {
        bottom: 0;
        left: 0;
      }
    }
  }

  section {
    overflow: hidden;
    background-size: 133%;
    background-position-y: 30%;
    border-radius: 15px;
    background-image: url(${({ theme }) => theme.subscribeBachground}), ${({ theme }) => theme.skyGradient};

    @media (max-width: 1232px) {
      background-size: cover;
    }
  }
`

export const PopupClose = styled.div`
  cursor: pointer;
  z-index: 101;
  position: fixed;
  top: 230px;
  right: calc(50vw - 620px);

  @media (max-width: 1315px) {
    top: 230px;
    right: 40px;
  }

  @media (max-width: 700px) {
    top: 20px;
    right: 20px;
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: #fff;
  }
`

// margin: 200px auto 100px auto;
// padding: 0 20px;
//   max-width: calc(100vw - 40px);
//   width: 1280px;
//   position: relative;

//   @media (max-width: 700px) {
//     padding: 0 10px;
//     max-width: calc(100vw - 20px);
//    }

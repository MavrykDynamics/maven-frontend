import styled from 'styled-components/macro'

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
  padding-top: 10px;
`
export const PopupNewsletter = styled.div`
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
    padding: 100px 10px 0px 10px;
  }

  h2 {
    margin-bottom: 40px;
  }

  form {
    margin-bottom: 170px;

    @media (max-width: 1000px) {
      margin-bottom: 128px;
    }

    @media (max-width: 700px) {
      margin-bottom: 100px;
    }
  }

  section {
    overflow: hidden;
    border-radius: 15px;
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

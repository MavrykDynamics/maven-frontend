import styled, { css } from 'styled-components'
import { cyanColor, titleColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const PolicyStyled = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: ${({ theme }) => theme.backgroundColor};
  border: 1px solid ${({ theme }) => theme.priceImpact};
  border-radius: 10px;
  height: fit-content;
  max-width: 576px;
  max-height: 615px;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .popup_btn {
    max-width: 200px;
    margin: 40px auto 0 auto;

    > div {
      padding: 10px;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: ${({ theme }) => theme.btnBackroundColor};
    }
  }

  > .title {
    position: relative;
    color: ${({ theme }) => theme.policyPopupTextColor};
    font-weight: 600;
    font-size: 22px;
    line-height: 22px;

    &::before {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 77px;
      height: 4px;
      background: ${({ theme }) => theme.policyPopupTextColor};
    }
  }

  .main_text {
    max-height: 340px;
    margin-top: 42px;
    overflow-y: scroll;
    color: ${({ theme }) => theme.policyPopupTextColor};
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    padding-right: 25px;
    position: relative;
    z-index: 100;

    b {
      line-height: 120%;
    }

    &:after {
      content: '';
      display: block;
      min-height: 50px;
      position: sticky;
      bottom: -3px;
      pointer-events: none;
      background: ${({ theme }) => `linear-gradient(transparent 0%,  ${theme.backgroundColor} 100%)`};
    }

    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
    }

    .text {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
    }
  }

  .checkbox_wrapper {
    display: flex;
    align-items: center;
    column-gap: 15px;
    margin-top: 20px;

    p {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: ${({ theme }) => theme.policyPopupTextColor};
      cursor: pointer;
    }

    .container {
      display: block;
      position: relative;
      cursor: pointer;
      height: 24px;
      width: 24px;
      font-size: 22px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 24px;
      width: 24px;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 24px;
      width: 24px;
      background: ${({ theme }) => theme.darkestBackroundColor};
      border-radius: 5px;
      border: 1px solid #503eaa;

      svg {
        width: 12px;
        height: 9px;
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        fill: ${({ theme }) => theme.toggleButtonColorSelected};
      }
    }

    .container:hover input ~ .checkmark {
      background: ${({ theme }) =>
        theme.theme === 'dark' || theme.theme === 'space' ? theme.backgroundColor : theme.darkestBackroundColor};
    }

    .container input:checked ~ .checkmark {
      background-color: #503eaa;
      svg {
        display: block;
      }
    }
  }

  @media screen and (max-width: 800px) {
    max-width: 90vw;
    height: fit-content;
    max-height: 100vh;
    padding: 40px 20px;
    margin-top: env(safe-area-inset-top);
    margin-bottom: env(safe-area-inset-bottom);
    top: 45%;

    > .title {
      font-size: 20px;
    }

    .main_text {
      .text {
        font-size: 12px;
        line-height: 20px;
      }
    }

    .checkbox_wrapper {
      column-gap: 15px;

      p {
        margin-left: 5px;
        padding-top: 10px;
        font-size: 12px;
        line-height: 20px;
      }
    }

    .popup_btn {
      > div {
        padding: 10px;
      }
      margin: 20px auto 0 auto;
    }
  }
`

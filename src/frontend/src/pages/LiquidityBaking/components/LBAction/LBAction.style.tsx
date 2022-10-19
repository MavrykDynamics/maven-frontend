import styled, { css } from 'styled-components'
import { cyanColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const LBActionStyled = styled.div<{ theme: MavrykTheme; isShowingChartMobile?: boolean }>`
  z-index: 1;
  padding: 20px 40px 50px 40px;
  background: ${({ theme }) => theme.darkBackroundColor};
  border: 1px solid ${({ theme }) => theme.lbBorder};
  border-radius: 10px;
  width: calc(50% - 15px);
  position: relative;

  @media screen and (max-width: 1340px) {
    padding: 20px 15px 50px 15px;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    max-width: 769px;
    padding: 20px 40px 50px 40px;
    margin: 0 auto;
  }

  @media screen and (max-width: 600px) {
    padding: 20px 25px 20px 25px;
  }

  @media screen and (max-width: 550px) {
    padding: 20px 15px 20px 15px;
  }

  @media screen and (max-width: 769px) {
    .mobile-chart {
      display: block;
    }

    ${({ isShowingChartMobile }) =>
      isShowingChartMobile
        ? css`
            padding: 30px 20px 30px 10px;
          `
        : ''}
  }

  @media screen and (min-width: 769px) {
    .mobile-chart {
      display: none;
    }
  }
`

export const ToggleButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  margin: 0 auto 0 auto;
  margin-bottom: 30px;
  width: fit-content;
  position: relative;

  @media screen and (max-width: 520px) {
    margin-bottom: 30px;
    width: 100%;

    .top {
      justify-content: space-between;
      column-gap: 0px;
    }

    .action-toggler {
      width: 100%;
      margin: 0;

      &.main {
        width: 80%;
      }
    }
  }

  .top {
    column-gap: 20px;
    display: flex;
    @media screen and (max-width: 520px) {
      .main {
        > div {
          width: 50%;
        }
      }
    }

    .toggleBlock {
      @media screen and (min-width: 769px) {
        display: none;
      }
    }
  }

  @media screen and (max-width: 1340px) {
    div {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 450px) {
    .action-toggler {
      .toggle-btn {
        font-size: 14px;
        padding: 10px 8px;
      }
    }
  }
`

export const ActionScreenWrapper = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  flex-direction: column;

  &.liquidity {
    .step-wrapper {
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      position: relative;
      margin-top: 20px;
      padding: 5px 0;

      .top {
        display: flex;
        justify-content: space-between;

        div:first-child {
          color: ${({ theme }) => theme.toggleButtonColor};
        }
      }

      &:not(.no-before):before {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        top: -10px;
        background: #503eaa;
      }

      &:after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: -20px;
        background: #503eaa;
      }

      > div:last-child {
        padding-left: 25px;
      }

      @media screen and (max-width: 525px) {
        .top {
          row-gap: 15px;
          flex-direction: column;
        }

        .liq-tokens-created {
          div {
            font-size: 14px;
          }
        }

        > div:last-child {
          padding-left: 0;
        }
      }
    }

    .switch-wrapper {
      display: flex;
      align-items: center;
      column-gap: 10px;
    }
  }

  &.removeLiqiudity {
    .receive-info-wrapper {
      position: relative;
      margin: 20px 0;

      &:before {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        top: -10px;
        background: #503eaa;
      }

      &:after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: -20px;
        background: #503eaa;
      }
    }

    .min-received {
    }
  }

  &.swap {
    .input-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;

      > svg {
        width: 24px;
        height: 24px;
        cursor: pointer;
        fill: ${({ theme }) => theme.toggleButtonColor};

        &:hover {
          fill: ${cyanColor};
        }
      }

      span {
        font-size: 45px;
        font-weight: 300;
        color: ${({ theme }) => theme.headingColor};
      }

      &.reverted {
        flex-direction: column-reverse;
      }
    }

    .bottom-wrapper {
      margin-top: 40px;
      row-gap: 15px;
      display: flex;
      flex-direction: column;
    }

    @media screen and (max-width: 500px) {
    }
  }

  @media screen and (max-width: 1340px) {
    div {
      font-size: 16px;
    }
  }
`

export const PriceChange = styled.div<{ up?: boolean; theme: MavrykTheme }>`
  color: ${({ up, theme }) => (up ? theme.priceImpact : theme.downColor)};
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
`

export const StepBlock = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: #8d86eb;
  position: relative;
  padding-left: 35px;
  display: flex;
  align-items: center;

  .step {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #503eaa;
    border-radius: 50%;
    color: #8d86eb;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 23px;
    height: 23px;
  }
`

export const CheckBoxWrapper = styled.div`
  position: relative;
`
export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 35px;
  height: 19px;
  border-radius: 15px;
  background: transparent;
  border: 1px solid #503eaa;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin: 1px;
    background: #8d86eb;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`
export const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 35px;
  height: 19px;
  margin: 0;
  &:checked + ${CheckBoxLabel} {
    background: #503eaa;
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      margin-left: 17px;
      transition: 0.2s;
    }
  }
`

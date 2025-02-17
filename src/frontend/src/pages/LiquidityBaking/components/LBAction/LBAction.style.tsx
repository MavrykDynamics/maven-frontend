import styled, {css} from 'styled-components'
import {MavenTheme} from 'utils/interfaces'

export const LBActionStyled = styled.div<{ theme: MavenTheme; isShowingChartMobile?: boolean }>`
  z-index: 1;
  padding: 20px 40px 20px 40px;
  background: ${({ theme }) => theme.cards};
  border: 1px solid ${({ theme }) => theme.strokeCards};
  border-radius: 10px;
  width: calc(50% - 5px);
  position: relative;
  min-height: 560px;
  height: 100vh;
  max-height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    > svg {
      user-select: none;
      width: 21px;
      height: 21px;
      cursor: pointer;
      fill: ${({ theme }) => theme.linksAndButtons};
      transition: opacity 300ms;

      &:hover {
        opacity: 0.8;
      }
    }

    span {
      font-size: 37px;
      font-weight: 300;
      color: ${({ theme }) => theme.regularText};
    }

    &.reverted {
      flex-direction: column-reverse;
    }
  }

  .swap-input {
    @media screen and (max-width: 550px) {
      margin-bottom: 40px;
    }
  }

  .swap-btn {
    margin: 0 auto;
    margin-top: auto;
  }

  // remove liquidity stuff
  .receive-info-wrapper {
    position: relative;
    margin-top: auto;

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
      bottom: -13px;
      background: #503eaa;
    }
  }

  .removeLiq-input {
    margin: 20px auto;
  }

  .removeLiq-btn {
    margin: 0 auto;
    margin-top: auto;
  }

  // add liquidity stuff
  .liqTokens-created {
    margin-top: 20px;
  }

  .addLiq-input {
    margin: 10px auto;
    @media screen and (max-width: 550px) {
      margin-bottom: 20px;
    }
  }

  .addLiq-input-XTZ {
    margin: 10px auto 30px auto;
  }

  .addLiq-btn {
    margin: 0 auto;
    margin-top: auto;
  }

  .step-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    position: relative;
    margin-top: 10px;

    .top {
      display: flex;
      justify-content: space-between;
      column-gap: 7px;
    }

    &:not(.no-before):before {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      top: -7px;
      background: #503eaa;
    }

    &:after {
      content: '';
      width: 100%;
      height: 1px;
      position: absolute;
      bottom: -7px;
      background: #503eaa;
    }

    > div:last-child {
      padding-left: 35px;
    }

    @media screen and (max-width: 525px) {
      .top {
        row-gap: 5px;
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
    margin-bottom: -6px;
  }

  // adaptive
  @media screen and (max-width: 1340px) {
    padding: 20px 15px 20px 15px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 20px 40px 20px 40px;
    margin: 0 auto;
  }

  @media screen and (max-width: 600px) {
    padding: 20px 25px 20px 25px;
  }

  @media screen and (max-width: 550px) {
    padding: 20px 15px 20px 15px;
    max-height: 650px;
    min-height: 650px;

    .liqTokens-created {
      margin-top: auto;
    }
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
  row-gap: 12px;
  margin: 0 auto 0 auto;
  margin-bottom: 30px;
  width: fit-content;
  position: relative;

  .toggle-btn {
    width: 199px;
  }

  .main {
    .toggle-btn {
      width: 149px;
    }
  }

  &.addLiquidity {
    margin-bottom: 20px;
  }

  &.removeLiquidity {
    margin-bottom: 25px;
  }

  &.swap {
    margin-bottom: 70px;
  }

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
    align-items: center;

    @media screen and (max-width: 520px) {
      .main {
        > div {
          width: 50%;
        }
      }
    }

    .toggleBlock {
      @media screen and (min-width: 770px) {
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

export const PriceChange = styled.div<{ up?: boolean; theme: MavenTheme }>`
  color: ${({ up, theme }) => (up ? theme.priceImpact : theme.downColor)};
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
`

export const StepBlock = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: ${({ theme }) => theme.mainHeadingText};
  position: relative;
  padding-left: 35px;
  display: flex;
  align-items: center;

  .step {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.divider};
    border-radius: 50%;
    color: ${({ theme }) => theme.mainHeadingText};
    font-weight: 700;
    font-size: 16px;
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
export const CheckBoxLabel = styled.label<{ theme: MavenTheme }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 35px;
  height: 19px;
  border-radius: 15px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.strokeColor};
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    margin: 1px;
    background: ${({ theme }) => theme.nSelectedColor};
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
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      margin-left: 17px;
      background: ${({ theme }) => theme.linksAndButtons};
      transition: 0.2s;
    }
  }
`

export const ExchangeRate = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: 10px;
  column-gap: 15px;
  flex-wrap: wrap;

  font-weight: 600;
  font-size: 14px;
  line-height: 21px;

  .exchange-rate-title {
    color: ${({ theme }) => theme.subHeadingText};
  }

  .exchange-rate-value {
    display: flex;
    width: fit-content;
    color: ${({ theme }) => theme.primaryText};

    p {
      margin: 0;
    }
  }
`

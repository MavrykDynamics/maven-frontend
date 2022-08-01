import styled from 'styled-components'

export const LBActionStyled = styled.div`
  z-index: 1;
  grid-row-start: 2;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-end: 4;
  padding: 20px 25px 50px 25px;
  height: fit-content;
  background: #160e3f;
  border: 1px solid #503eaa;
  border-radius: 10px;

  hr {
    height: 2px;
    width: 100%;
    background: #503eaa;
    color: transparent;
    margin: 0;
    border: none;
    margin: 22px 0;
  }

  @media screen and (max-width: 1340px) {
    padding: 20px 15px 50px 15px;
  }

  @media screen and (max-width: 1024px) {
    width: calc(100vw - 5%);
    max-width: 400px;
    margin: 0 auto;
  }
`

export const ToggleButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  margin-bottom: 42px;

  @media screen and (max-width: 1340px) {
    div {
      font-size: 14px;
    }
  }
`

export const ActionScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &.stats {
    row-gap: 20px;
  }

  &.liquidity {
    .step-wrapper {
      display: flex;
      flex-direction: column;
      row-gap: 20px;
    }

    .switch-wrapper {
      padding-right: 25px;
      .top {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  &.swap {
    .exchange-block {
      display: flex;
      column-gap: 10px;
      margin: 0 auto;
      svg {
        width: 24px;
        height: 18px;
        transform: rotate(90deg);
      }
    }

    .input-wrapper {
      margin: 24px 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      svg {
        width: 24px;
        height: 18px;
      }
    }

    .bottom-wrapper {
      margin-top: 40px;
      row-gap: 15px;
      display: flex;
      flex-direction: column;
    }
  }

  @media screen and (max-width: 1340px) {
    div {
      font-size: 16px;
    }
  }
`

export const PriceChange = styled.div<{ up?: boolean }>`
  color: ${({ up }) => (up ? '#27AE60' : '#FF4343')};
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
`

export const StepBlock = styled.div`
  font-weight: 700;
  font-size: 25px;
  line-height: 25px;
  color: #77a4f2;
  position: relative;
  padding-left: 50px;
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
    font-size: 25px;
    line-height: 25px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 38px;
    height: 38px;
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

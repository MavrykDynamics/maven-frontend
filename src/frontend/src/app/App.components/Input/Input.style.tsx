import styled, { keyframes } from 'styled-components/macro'
import { downColor, titleColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const InputStyled = styled.div<{ theme: MavrykTheme }>`
  position: relative;
  width: 100%;
  margin: 18px 0;

  .useMax {
    position: absolute;
    top: -20px;
    right: 10px;
    cursor: pointer;
    color: ${({ theme }) => theme.linksAndButtons};
    transition: opacity 0.25s;

    &:hover {
      opacity: 0.8;
    }
  }

  .balance {
    position: absolute;
    bottom: -22px;
    right: 10px;
    display: flex;
    row-gap: 5px;
    p {
      margin: 0;
    }
  }
`

export const InputComponentContainer = styled.div<{ theme: MavrykTheme }>`
  display: block;
  position: relative;

  .LB-coin-info {
    display: flex;
    position: absolute;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    right: 17px;

    svg,
    img {
      width: 28px;
      height: 28px;
      margin-right: 10px;
      fill: ${({ theme }) => theme.darkBackroundColor};

      &.error-icon {
        stroke: ${downColor};
        width: 20px;
      }
    }
  }

  .transfer_result {
    position: absolute;
    left: 14px;
    bottom: 2px;

    p {
      margin: 0;
      color: ${({ theme }) => theme.topbarMenuAndPlaceholders};
    }
  }

  .pinned-text {
    color: ${({ theme }) => theme.topbarMenuAndPlaceholders};
  }
`

export const InputComponent = styled.input<{ theme: MavrykTheme }>`
  width: 100%;
  height: 54px;
  background-color: ${({ theme }) => theme.nBackgroundColor};
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.strokeColor};
  margin: 0;
  color: ${({ theme }) => theme.headerColor};
  -webkit-appearance: none;
  appearance: none;
  display: block;
  position: relative;
  padding: 13px 45px 13px 20px;
  border-radius: 10px;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  will-change: border-color, box-shadow;
  font-size: 14px;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }

  &::placeholder {
    font-size: 16px;
    padding-top: 0;
    color: #c0dbff;
    opacity: 0.6;
  }

  &.search {
    color: ${({ theme }) => theme.headerColor};
  }

  &.LB {
    font-weight: 600;
    font-size: 22px;
    line-height: 22px;
    padding-top: 0;
    padding-left: 10px;
    color: ${({ theme }) => theme.topbarMenuAndPlaceholders};
    background-color: ${({ theme }) => theme.nBackgroundColor};
    border: 1px solid ${({ theme }) => theme.strokeColor};
  }

  &.no-subtext {
    padding-bottom: 0;
  }

  &::placeholder:not(.search) {
    color: ${({ theme }) => theme.inputPlaceholder};
  }

  &:disabled {
    opacity: 0.4;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.containerColor};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryColor}19;
    border-color: ${({ theme }) => theme.primaryColor}7F;
  }

  &.error {
    border-color: ${({ theme }) => theme.downColor};
    color: ${({ theme }) => theme.downColor};
    &:focus {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.downColor}7F;
    }
  }

  &.success {
    border: 1px solid ${({ theme }) => theme.upColor};
    color: ${({ theme }) => theme.upColor};
    &:focus {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.upColor}7F;
    }
  }
`

export const InputLabel = styled.div<{ theme: MavrykTheme }>`
  position: absolute;
  right: 16px;
  top: 18px;
  color: ${({ theme }) => theme.headerColor};
  font-size: 18px;
  font-weight: 600;

  /* &.error {
    color: ${({ theme }) => theme.downColor};
  }

  &.success {
    color: ${({ theme }) => theme.upColor};
  } */
`

const zoomIn = keyframes`
  from {
    transform:scale(.2);
    opacity:0
  }
  to {
    transform:scale(1);
    opacity:1
  }
`

export const InputStatus = styled.div<{ theme: MavrykTheme }>`
  display: block;
  position: absolute;
  top: 14px;
  right: 16px;
  z-index: 1;
  line-height: 13px;
  text-align: center;
  visibility: visible;
  pointer-events: none;
  will-change: transform, opacity;

  &.with-text {
    right: 66px;
  }

  &.error {
    background-image: url('/icons/input-error.svg');
    animation: ${zoomIn} 0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
    height: 15px;
    width: 15px;
  }

  &.success {
    background-image: url('/icons/input-success.svg');
    animation: ${zoomIn} 0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
    height: 12px;
    width: 17px;
  }
`

export const InputIcon = styled.svg<{ theme: MavrykTheme }>`
  display: block;
  position: absolute;
  top: 20px;
  left: 10px;
  z-index: 1;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  visibility: visible;
  pointer-events: none;
`

const slideDown = keyframes`
  from {
    transform: translate3d(0, -10px, 0);
    opacity:0
  }
  to {
    transform: translate3d(0, 0px, 0);
    opacity:1
  }
`

export const InputErrorMessage = styled.div<{ theme: MavrykTheme }>`
  color: ${({ theme }) => theme.downColor};
  line-height: 24px;
  will-change: transform, opacity;
  animation: ${slideDown} 0.3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:first-letter {
    text-transform: uppercase;
  }
`

export const InputSpacer = styled.div`
  height: 10px;
`

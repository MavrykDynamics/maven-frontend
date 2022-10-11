import styled, { keyframes } from 'styled-components/macro'
import { MavrykTheme } from 'utils/interfaces'

import { backgroundColor, cyanColor, darkColor, headerColor, primaryColor, skyColor, titleColor } from '../../../styles'
import { BUTTON_RADIUS } from '../../../styles/constants'

export const clickWave = keyframes`
  from {
    box-shadow: 0 0 0 0 ${primaryColor};
  }
  to {
    box-shadow: 0 0 0 5px ${primaryColor}00;
  }
`

export const ButtonStyled = styled.button<{ theme: MavrykTheme }>`
  padding: 0;
  height: 50px;
  border: none;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  border-radius: ${BUTTON_RADIUS};
  will-change: box-shadow;
  width: 100%;
  user-select: none;

  &:hover {
    opacity: 0.8;
  }

  &.disabled {
    opacity: 0.6;
    cursor: default;
  }

  &.clicked {
    animation: ${clickWave} 1250ms cubic-bezier(0.19, 1, 0.22, 1);
    animation-fill-mode: forwards;
  }

  &.primary:not(.disabled) {
    color: ${({ theme }) => theme.containerColor};
    background-color: ${({ theme }) => theme.btnBackroundColor};
  }

  &.secondary {
    color: ${({ theme }) => theme.primaryColor};
    background-color: ${({ theme }) => theme.containerColor};
    border: 1.5px solid ${({ theme }) => theme.primaryColor};
  }

  &.transparent {
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.containerColor};
  }

  &.loading {
    pointer-events: none;
    opacity: 0.8;
  }

  &.actionPrimary {
    color: ${({ theme }) => theme.containerColor};
    background-color: ${({ theme }) => theme.actionPrimaryBtnColor};
  }

  &.actionSecondary {
    color: ${({ theme }) => theme.actionPrimaryBtnColor};
    background-color: transparent;
    border: 2px solid ${({ theme }) => theme.actionPrimaryBtnColor};
  }

  &.removeLiquidity_btn {
    max-width: 400px;
    margin: 10px auto 0 auto;
  }

  &.addLiquidity_btn {
    max-width: 400px;
    margin: 40px auto 0 auto;
  }

  &.swap_btn {
    max-width: 400px;
    margin: 0 auto 25px auto;
  }

  &.LB {
    color: ${({ theme }) => theme.toggleButtonColorSelected};

    svg {
      stroke: ${({ theme }) => theme.toggleButtonColorSelected};
      fill: ${({ theme }) => theme.toggleButtonColorSelected};
    }
  }

  &.toggleChart {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.primaryColor};
    transition: 0.5s all;
    svg {
      width: 24px;
      height: 24px;
      margin: 0;
    }

    @media screen and (max-width: 1200px) and (min-width: 1070px) and (max-width: 490px) {
      width: 30px;
      height: 30px;
    }

    @media screen and (max-width: 490px) {
      width: 30px;
      height: 30px;
    }
  }

  &.connect-wallet-details {
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 15px;
    color: ${cyanColor};
    opacity: 0.8;
    background-color: transparent;

    &:hover {
      opacity: 1;
    }
  }

  &.theme-btn {
    height: 38px;
    width: 31%;
    border: 1px solid ${({ theme }) => theme.toggleButtonBgSelected};
    color: ${({ theme }) => theme.toggleButtonBgSelected};
    border-radius: 8px;
    transition: 0.4s all;
    background-color: transparent;

    &:hover,
    &.selected {
      border: 1px solid ${cyanColor};
      color: ${cyanColor};
    }
  }

  &.change-wallet {
    width: 185px;

    svg {
      stroke: unset;
      stroke-width: 0.3;
      transform: rotate(90deg);
    }
  }

  &.start_verification {
    border: 1px solid ${cyanColor};
    color: ${headerColor};
    background: ${({ theme }) => theme.settingsConfigmBG};

    svg {
      stroke: ${headerColor};
      fill: ${headerColor};
      stroke-width: 0.3;
    }
  }
`

export const ButtonText = styled.div<{ theme: MavrykTheme }>`
  > div {
    text-align: center;
    margin: auto;
    display: inline-block;
    line-height: 24px;
    vertical-align: top;
  }
  &.primary {
    color: ${({ theme }) => theme.textColor};
  }

  &.secondary {
    color: ${({ theme }) => theme.primaryColor};
  }

  &.transparent {
    color: ${({ theme }) => theme.primaryColor};
  }

  &.votingFor {
    color: ${darkColor};
  }
  &.votingAgainst {
    color: ${darkColor};
  }
  &.votingAbstain {
    color: ${darkColor};
  }
`

export const ButtonIcon = styled.svg<{ theme: MavrykTheme }>`
  width: 24px;
  height: 24px;
  display: inline-block;
  vertical-align: sub;
  margin-right: 15px;

  &.primary {
    stroke: ${({ theme }) => theme.containerColor};
  }

  &.secondary {
    stroke: ${({ theme }) => theme.primaryColor};
  }

  &.transparent {
    stroke: ${({ theme }) => theme.textColor};
  }

  &.actionPrimary {
    stroke: ${({ theme }) => theme.containerColor};
  }

  &.actionSecondary {
    stroke: ${({ theme }) => theme.actionPrimaryBtnColor};
  }
`

const turn = keyframes`
  100% {
      transform: rotate(360deg);
  }
`

export const ButtonLoadingIcon = styled.svg<{ theme: MavrykTheme }>`
  width: 16px;
  height: 16px;
  margin-top: 4px;
  margin-right: 15px;
  vertical-align: sub;
  stroke: ${({ theme }) => theme.textColor};
  stroke-width: 1px;
  stroke-dashoffset: 94.248;
  stroke-dasharray: 47.124;
  animation: ${turn} 1.6s linear infinite forwards;

  &.primary {
    stroke: ${({ theme }) => theme.containerColor};
  }

  &.secondary {
    stroke: ${({ theme }) => theme.primaryColor};
  }

  &.transparent {
    stroke: ${({ theme }) => theme.textColor};
  }

  &.actionPrimary {
    stroke: ${({ theme }) => theme.containerColor};
  }

  &.actionSecondary {
    stroke: ${({ theme }) => theme.primaryColor};
  }
`

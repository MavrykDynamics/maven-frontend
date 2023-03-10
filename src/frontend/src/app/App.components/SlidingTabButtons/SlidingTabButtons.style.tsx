import styled, { css, keyframes } from 'styled-components/macro'

import { primaryColor } from '../../../styles'
import { BUTTON_RADIUS } from '../../../styles/constants'
import { MavrykTheme } from 'utils/interfaces'
import { PRIMARY, SECONDARY, TRANSPARENT } from './SlidingTabButtons.constants'

export const clickWave = keyframes`
  from {
    box-shadow: 0 0 0 0 ${primaryColor};
  }
  to {
    box-shadow: 0 0 0 5px ${primaryColor}00;
  }
`

export const clickSlide = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100px);
  }
`
export const SlidingTabButtonsStyled = styled.div<{ theme: MavrykTheme }>`
  background-color: ${({ theme }) => theme.nBackgroundColor};
  border: 1px solid ${({ theme }) => theme.strokeColor};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 20px;

  > * {
    &:first-child {
      margin-left: 1px;
    }
    &:last-child {
      margin-right: 1px;
    }
  }

  &.disabled {
    opacity: 0.7;
    cursor: not-allowed;

    > button {
      cursor: not-allowed;
    }
  }
`

export const ButtonStyled = styled.button<{ disabled: boolean; theme: MavrykTheme }>`
  width: 100%;
  border: none;
  cursor: pointer;
  height: 40px;
  padding: 0 22px;
  border-radius: ${BUTTON_RADIUS};
  user-select: none;
  // use outside the theme because we need the same color for all themes
  color: #8d86eb;
  background: transparent;

  &.selected {
    color: ${({ theme }) => theme.cards};
    background: ${({ theme }) => theme.forTabs};
  }

  &.loading {
    pointer-events: none;
    opacity: 0.8;
  }

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.7;
          cursor: not-allowed;
        `
      : ''}
`

export const ButtonText = styled.div<{ theme: MavrykTheme }>`
  > div {
    text-align: center;
    margin: auto;
    display: inline-block;
    vertical-align: top;

    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
  }
  &.${PRIMARY} {
    color: ${({ theme }) => theme.textColor};
  }

  &.${SECONDARY} {
    color: ${({ theme }) => theme.primaryColor};
  }

  &.${TRANSPARENT} {
    color: ${({ theme }) => theme.primaryColor};
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

  &.${PRIMARY} {
    stroke: ${({ theme }) => theme.containerColor};
  }

  &.${SECONDARY} {
    stroke: ${({ theme }) => theme.primaryColor};
  }

  &.${TRANSPARENT} {
    stroke: ${({ theme }) => theme.textColor};
  }
`

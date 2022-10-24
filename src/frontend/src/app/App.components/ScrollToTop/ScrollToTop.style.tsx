import styled, { css } from 'styled-components'
import { MavrykTheme } from 'utils/interfaces'

export const StyledScrollToTop = styled.div<{ theme: MavrykTheme; show: boolean }>`
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 57px;
  height: 92px;
  z-index: 11;
  transition: 0.1s all;
  opacity: 0;
  visibility: hidden;

  svg {
    width: 57px;
    height: 92px;
    stroke: ${({ theme }) => theme.scrollToTop};
    fill: transparent;
  }

  ${({ show }) =>
    show
      ? css`
          opacity: 1;
          visibility: visible;
        `
      : ''}

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 57px;
    height: 92px;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.scrollToTop};
    border-radius: 40px;
    z-index: -1;
    opacity: 0.7;
  }

  &:before {
    animation: pulse 2s ease-out infinite;
  }

  &:after {
    animation: pulse 2s 0.5s ease-out infinite;
  }
  @keyframes pulse {
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  @media screen and (max-width: 965px) {
    display: none;
  }
`

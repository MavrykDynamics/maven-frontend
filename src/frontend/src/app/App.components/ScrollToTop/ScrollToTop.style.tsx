import styled, { css } from 'styled-components'
import { MavrykTheme } from 'utils/interfaces'

export const StyledScrollToTop = styled.div<{ theme: MavrykTheme; show: boolean }>`
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 11;
  transition: 0.1s all;
  opacity: 0;
  visibility: hidden;
  animation: upDown 2s ease infinite;
  border-radius: 40px;
  border: 2px solid ${({ theme }) => theme.scrollToTop};

  svg {
    width: 57px;
    height: 92px;
    stroke: ${({ theme }) => theme.scrollToTop};
    fill: ${({ theme }) => theme.scrollToTop};
  }

  @media screen and (max-width: 1645px) {
    padding: 10px 5px 5px 5px;
    right: 7px;
    bottom: 7px;
    svg {
      width: 21px;
      height: 27px;
    }
  }

  ${({ show }) =>
    show
      ? css`
          opacity: 1;
          visibility: visible;
        `
      : ''}

  // old pulse animation
  /* &:before,
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
  } */
  /* @keyframes pulse {
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  } */

  @keyframes upDown {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }

  @media screen and (max-width: 965px) {
    display: none;
  }
`

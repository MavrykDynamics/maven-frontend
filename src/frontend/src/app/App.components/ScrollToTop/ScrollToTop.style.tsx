import styled, { css } from 'styled-components'
import { MavrykTheme } from 'utils/interfaces'

export const StyledScrollToTop = styled.div<{ theme: MavrykTheme; show: boolean }>`
  position: fixed;
  bottom: 100px;
  right: 7%;
  width: 57px;
  height: 92px;
  z-index: 11;
  transition: 0.5s all;
  opacity: 0;

  svg {
    width: 57px;
    height: 92px;
    stroke: ${({ theme }) => theme.linkedinLinkColor};
    fill: transparent;
  }

  ${({ show }) =>
    show
      ? css`
          opacity: 1;
        `
      : ''}

  @media screen and (max-width: 1860px) {
    right: 3%;
  }

  @media screen and (max-width: 965px) {
    display: none;
  }
`

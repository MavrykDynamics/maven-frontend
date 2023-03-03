import styled, { css } from 'styled-components'
import { MavrykTheme } from 'utils/interfaces'

export const PRIMARY_COLOR = 'primary'
export const SECONDARY_COLOR = 'secondary'

export const LBStyled = styled.div<{ theme: MavrykTheme }>`
  background-image: ${({ theme }) =>
    `url(${theme.theme === 'light' ? theme.primaryLightDesktopBg : theme.primaryDarkDesktopBg})`};

  @media screen and (max-width: 769px) {
    background-image: ${({ theme }) =>
      `url(${theme.theme === 'light' ? theme.primaryLightMobBg : theme.primaryDarkMobBg})`};
  }
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  padding-bottom: 100px;

  .content-wrapper {
    padding-top: 90px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-width: 1440px;
    margin: 0 auto;
  }

  .middle-block {
    display: flex;
    justify-content: space-between;
  }

  @media screen and (max-width: 1540px) {
    .content-wrapper {
      padding: 90px 45px 70px 45px;
    }
  }

  @media screen and (max-width: 1200px) {
    .content-wrapper {
      padding: 90px 25px 70px 25px;
    }
  }

  @media screen and (max-width: 1024px) {
    .middle-block {
      flex-direction: column;
      row-gap: 10px;
    }

    padding-bottom: 0px;
  }

  @media screen and (max-width: 769px) {
    .desktop-chart {
      display: none;
    }
  }

  @media screen and (max-width: 445px) {
    .content-wrapper {
      padding: 90px 15px 70px 15px;
    }
  }
`

export const VertInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`

export const HorisontalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.slippage {
    @media screen and (max-width: 500px) {
      display: grid;
      row-gap: 5px;
      height: fit-content;
      grid-template:
        'name mobileInfo'
        'controls controls';
    }

    > div:nth-child(1) {
      grid-area: name;
    }

    .controls-wrapper {
      display: flex;
      justify-content: space-between;
      grid-area: controls;

      #inputStyled {
        width: fit-content;
      }

      .swap-toggler {
        .toggle-btn {
          padding: 8px 13px;

          @media screen and (max-width: 625px) {
            padding: 9px 13px;
          }
        }
      }
    }

    .mobile-info {
      display: none;
      grid-area: mobileInfo;
      @media screen and (max-width: 500px) {
        display: block;

        > div {
          display: block;
          width: unset;

          p {
            text-align: right;
          }
        }
      }
    }
  }
`

export const CustomizedText = styled.div<{
  fontSize?: number
  fontWidth?: number
  color?: string
  link?: boolean
  lineHeight?: number
  isDarkTheme?: boolean
  theme: MavrykTheme
}>`
  font-weight: ${({ fontWidth }) => (fontWidth ? fontWidth : 400)};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '18px')};
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}px` : '18px')};
  color: ${({ color, theme }) => (theme.isDarkTheme ? (color ? color : theme.skyColor) : theme.headerTeam)};
  display: flex;
  width: fit-content;

  ${({ link }) =>
    link
      ? css`
          text-decoration: underline;
        `
      : ''}

  .info {
    margin-left: 5px;
    cursor: pointer;
    position: relative;

    svg {
      width: 16px;
      height: 16px;
      fill: ${({ theme }) => theme.primaryTextCardColor};
    }

    .text {
      font-size: 12px;
      position: absolute;
      bottom: 150%;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      white-space: pre-line;
      padding: 3px 5px;
      border-radius: 3px;
      line-height: 15px;
      background: ${({ theme }) => theme.tooltipBg};
      color: ${({ theme }) => theme.tooltipColor};
      opacity: 0;
      transition: 0.2s all;
      visibility: hidden;
      width: max-content;
      max-width: 330px;
    }

    .text::after {
      content: ' ';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: ${({ theme }) => theme.tooltipBg} transparent transparent transparent;
    }

    &:hover {
      .text {
        visibility: visible;
        opacity: 1;
      }

      svg {
        fill: ${({ theme }) => theme.selectedColor};
      }
    }

    @media screen and (max-width: 650px) {
      .text {
        max-width: 270px;
      }
    }

    @media screen and (max-width: 500px) {
      .text {
        max-width: 250px;
      }
    }
  }

  p {
    margin: 0;
  }

  &.${PRIMARY_COLOR} {
    color: ${({ theme }) => theme.primaryTextCardColor};
  }

  &.${SECONDARY_COLOR} {
    color: ${({ theme }) => theme.headingThirdCardColor};
  }
`

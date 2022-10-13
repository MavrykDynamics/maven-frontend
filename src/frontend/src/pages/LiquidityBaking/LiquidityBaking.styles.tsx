import styled, { css } from 'styled-components'
import { cyanColor, headerColor, skyColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const LBStyled = styled.div<{ theme: MavrykTheme }>`
  background-image: ${({ theme }) =>
    `url(${theme.theme === 'dark' ? 'images/lb/lb-dark-desktop-bg.svg' : 'images/lb/lb-light-desktop-bg.svg'})`};

  @media screen and (max-width: 769px) {
    background-image: ${({ theme }) =>
      `url(${theme.theme === 'dark' ? 'images/lb/lb-dark-mob-bg.svg' : 'images/lb/lb-light-mob-bg.svg'})`};
  }
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  padding-bottom: 100px;

  .content-wrapper {
    padding-top: 150px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    max-width: 1440px;
    margin: 0 auto;
  }

  .middle-block {
    display: flex;
    justify-content: space-between;
  }

  @media screen and (max-width: 1500px) {
    .content-wrapper {
      padding: 110px 25px 70px 25px;
    }
  }

  @media screen and (max-width: 960px) {
    .middle-block {
      flex-direction: column;
      row-gap: 30px;
    }

    padding-bottom: 0px;
  }

  @media screen and (max-width: 769px) {
    .desktop-chart {
      display: none;
    }
  }

  @media screen and (max-width: 425px) {
    .content-wrapper {
      padding: 110px 15px 70px 15px;
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
          padding: 8px 12px;
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
  color: ${({ color, theme }) => (theme.isDarkTheme ? (color ? color : skyColor) : theme.headerTeam)};
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
      fill: ${({ theme }) => theme.toggleButtonColor};
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
        fill: ${cyanColor};
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
`

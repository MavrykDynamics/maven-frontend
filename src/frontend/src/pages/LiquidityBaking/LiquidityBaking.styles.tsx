import styled, {css} from 'styled-components'
import {MavenTheme} from 'utils/interfaces'

export const PRIMARY_COLOR = 'primary'
export const SECONDARY_COLOR = 'secondary'
export const THIRD_COLOR = 'third'
export const ACTIVE_COLOR = 'active'

export const LBStyled = styled.div<{ theme: MavenTheme }>`
  background-image: ${({ theme }) =>
    `url(${theme.topDesktopBackground}), url(${theme.bottomDesktopBackground}), ${theme.backgroundGradient}`};
  background-position: center 100px, bottom, center;
  background-repeat: no-repeat;
  background-size: contain;

  .content-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 90px 0 100px 0;
    row-gap: 10px;
    max-width: 1440px;
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

  &.header {
    align-items: center;
  }

  @media screen and (max-width: 769px) {
    &.header {
      align-items: start;
    }
  }
`

export const HorisontalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .commaNumber {
    display: inline-block;
  }

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
  link?: boolean
  lineHeight?: number
  isDarkTheme?: boolean
  theme: MavenTheme
}>`
  font-weight: ${({ fontWidth }) => (fontWidth ? fontWidth : 400)};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '18px')};
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}px` : '18px')};

  width: fit-content;

  ${({ link }) =>
    link
      ? css`
          text-decoration: underline;
        `
      : ''}

  .info {
    display: inline-block;
    margin-left: 5px;
    cursor: pointer;
    position: relative;

    svg {
      width: 16px;
      height: 16px;
      fill: ${({ theme }) => theme.subHeadingText};
    }

    .text {
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;

      position: absolute;
      bottom: 150%;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      white-space: pre-line;
      padding: 3px 5px;
      border-radius: 3px;
      background-color: ${({ theme }) => theme.messagesBackground};
      color: ${({ theme }) => theme.topbarMenuAndPlaceholders};
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

      svg {
        width: 14px;
        height: 14px;
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
    color: ${({ theme }) => theme.mainHeadingText};
  }

  &.${SECONDARY_COLOR} {
    color: ${({ theme }) => theme.primaryText};
  }

  &.${THIRD_COLOR} {
    color: ${({ theme }) => theme.subHeadingText};
  }

  &.${ACTIVE_COLOR} {
    color: ${({ theme }) => theme.linksAndButtons};
  }
`

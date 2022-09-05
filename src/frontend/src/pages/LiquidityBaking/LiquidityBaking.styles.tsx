import styled, { css } from 'styled-components'
import { cyanColor, headerColor, skyColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const LBStyled = styled.div`
  background-image: url('images/lb_bg.png');
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
      padding: 150px 25px 70px 25px;
    }
  }

  @media screen and (max-width: 960px) {
    .middle-block {
      flex-direction: column;
      row-gap: 30px;
    }

    padding-bottom: 0px;
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
  position: relative;
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

    svg {
      width: 16px;
      height: 16px;
      fill: #8d86eb;
    }

    .text {
      font-size: 12px;
      position: absolute;
      bottom: 130%;
      right: 0;
      display: block;
      white-space: pre-line;
      padding: 3px 5px;
      border-radius: 7px;
      line-height: 15px;
      background: #160e3f;
      border: 1px solid #503eaa;
      color: #8d86eb;
      opacity: 0;
      transition: 0.3s all;
      visibility: hidden;
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
  }

  p {
    margin: 0;
  }
`

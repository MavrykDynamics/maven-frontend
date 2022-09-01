import styled, { css } from 'styled-components'
import { skyColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const LBStyled = styled.div`
  background-image: url('images/lb_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding-bottom: 580px;
  position: relative;

  .content-wrapper {
    padding-top: 150px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 112px 670px 650px 645px;
    column-gap: 20px;
    row-gap: 30px;
    max-width: 1440px;
    margin: 0 auto;
  }

  @media screen and (max-width: 1070px) {
    .content-wrapper {
      display: flex;
      row-gap: 20px;
      flex-direction: column;
      padding-bottom: 70px;
    }
  }

  #footer {
    position: absolute;
    width: 100%;
    bottom: 0;
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
  ${({ link }) =>
    link
      ? css`
          text-decoration: underline;
        `
      : ''}

  p {
    margin: 0;
  }
`

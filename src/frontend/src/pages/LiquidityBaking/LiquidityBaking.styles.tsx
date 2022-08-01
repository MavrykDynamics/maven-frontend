import styled, { css } from 'styled-components'
import { skyColor } from 'styles'

export const LBStyled = styled.div`
  .content-wrapper {
    padding-top: 150px;
    display: grid;
    grid-template-columns: minmax(400px, 33%) minmax(auto, 67%);
    grid-template-rows: 112px 502px 685px;
    gap: 20px;
    min-height: calc(100vh - 200px);
    max-width: 1440px;
    width: calc(100vw - 5%);
    margin: 0 auto;
  }

  @media screen and (max-width: 1024px) {
    .content-wrapper {
      display: flex;
      row-gap: 20px;
      flex-direction: column;
      padding-bottom: 70px;
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
`

export const CustomizedText = styled.div<{
  fontSize?: number
  fontWidth?: number
  color?: string
  link?: boolean
  lineHeight?: number
}>`
  font-weight: ${({ fontWidth }) => (fontWidth ? fontWidth : 400)};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '18px')};
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}px` : '18px')};
  color: ${({ color }) => (color ? color : skyColor)};
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

import styled, { css } from "styled-components";

export const LBHeaderStyled = styled.div`
  background: #160E3F;
  border: 1px solid #503EAA;
  border-radius: 10px;
  grid-column-end: 3;
  grid-column-start: 1;
  height: 112px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .title {
    display: flex;
    align-items: center;

    h1 {
      &::after {
        display: none;
      }
    }

    svg {
      margin-right: 25px;
      width: 90px;
      height: 55px;
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
`

export const CustomizedText = styled.div<{fontSize?: number; fontWidth?: number; color?: string; link?: boolean, lineHeight?: number}>`
  font-weight: ${({fontWidth}) => fontWidth ? fontWidth : 400};
  font-size: ${({fontSize}) => fontSize ? `${fontSize}px` : '18px'};
  line-height: ${({lineHeight}) => lineHeight ? `${lineHeight}px` : '18px'};
  color: ${({color}) => color ? color : '#77A4F2'};

  ${({link}) => link ? css`text-decoration: underline;` : ''}
`
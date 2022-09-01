import styled, { css } from 'styled-components'
import { MavrykTheme } from 'utils/interfaces'

export const LBFAQStyled = styled.div<{ theme: MavrykTheme }>`
  grid-column-end: 3;
  grid-column-start: 1;
  grid-row-start: 4;
  grid-row-end: 5;
  z-index: 1;
  /* 
  background: #160e3f;
  border: 1px solid #503eaa; */
  background: ${({ theme }) => theme.darkBackroundColor};
  border: 1px solid ${({ theme }) => theme.lbBorder};
  border-radius: 10px;
  padding: 50px 40px 80px 40px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const FAQ_ITEM_SMALLER_TEXT = (last?: boolean) => css`
  margin-bottom: ${last ? '0' : '35px'};
  div {
    font-size: 16px;

    &.title {
      font-size: 20px;
      line-height: 22px;
    }
  }
`

export const FaqItem = styled.div<{ last?: boolean }>`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  position: relative;
  margin-bottom: 45px;

  ${({ last }) =>
    last
      ? css`
          margin-bottom: 0;
        `
      : css`
          &::before {
            content: '';
            position: absolute;
            bottom: -32px;
            left: 0;
            height: 2px;
            width: 100%;
            background: #503eaa;
          }
        `}

  @media screen and (max-width: 1280px) and (max-width: 1024px) {
    &::before {
      bottom: -20px;
    }
    margin-bottom: ${({ last }) => (last ? '0' : '35px')};
  }

  @media screen and (max-width: 1165px), screen and (max-width: 600px) {
    ${({ last }) => FAQ_ITEM_SMALLER_TEXT(last)}
  }

  @media screen and (max-width: 1024px) {
    margin-bottom: ${({ last }) => (last ? '0' : '45px')};
    div {
      font-size: 18px;

      &.title {
        font-size: 25px;
        line-height: 30px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    ${({ last }) => FAQ_ITEM_SMALLER_TEXT(last)}
  }
`

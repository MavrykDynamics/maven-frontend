import styled from 'styled-components'
import { MavrykTheme } from 'utils/interfaces'

export const LBHeaderStyled = styled.div<{ theme: MavrykTheme }>`
  background: ${({ theme }) => theme.cards};
  border: 1px solid ${({ theme }) => theme.strokeCards};
  border-radius: 10px;
  min-height: 90px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 5px;

  .title {
    display: flex;
    align-items: center;
    column-gap: 25px;

    div {
      font-weight: 700;
      font-size: 32px;
      line-height: 32px;

      &::after {
        display: none;
      }
    }

    img {
      width: 60px;
      height: 60px;
    }
  }

  .info-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 55%;

    div:not(.block-name) {
      font-weight: 600;
      font-size: 22px;
      line-height: 22px;
    }
  }

  .block-name {
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
  }

  @media screen and (max-width: 1260px) {
    flex-direction: column;
    row-gap: 30px;
    padding: 20px;

    .info-wrapper {
      width: fit-content;
      flex-wrap: wrap;
      column-gap: 50px;
      row-gap: 30px;
    }
  }

  @media screen and (max-width: 650px) {
    .info-wrapper {
      padding: 0 10px;
      display: grid;
      grid-template-columns: repeat(2, fit-content(48%));
      gap: 40px;

      div:nth-child(1) {
        order: 1;
      }

      div:nth-child(3) {
        order: 2;
      }

      div:nth-child(2) {
        order: 3;
      }

      div:nth-child(4) {
        order: 4;
      }
    }
  }

  @media screen and (max-width: 500px) {
    padding: 15px 10px;

    .title {
      column-gap: 10px;

      div {
        font-size: 25px;
        line-height: 30px;
      }

      img {
        width: 50px;
        height: 50px;
      }
    }

    .info-wrapper {
      padding: 0;
      width: fit-content;
      margin: 0 auto;
      grid-template-columns: repeat(2, fit-content(50%));
      gap: 10px;

      div:not(.block-name) {
        font-size: 18px;
      }
    }
  }
`

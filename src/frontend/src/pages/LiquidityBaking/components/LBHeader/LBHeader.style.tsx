import styled from 'styled-components'
import { MavrykTheme } from 'utils/interfaces'

export const LBHeaderStyled = styled.div<{ theme: MavrykTheme }>`
  background: ${({ theme }) => theme.darkBackroundColor};
  border: 1px solid ${({ theme }) => theme.lbBorder};
  border-radius: 10px;
  min-height: 112px;
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
      &::after {
        display: none;
      }
      font-size: 35px;
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
  }

  @media screen and (max-width: 1400px) {
    .title {
      div {
        &::after {
          display: none;
        }
        font-size: 28px;
      }
    }

    .block-name {
      font-size: 17px;
    }

    div {
      line-height: 10px;
      font-size: 17px;
    }
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
      justify-content: center;

      .block-name {
        font-size: 20px;
      }

      div {
        line-height: 20px;
        font-size: 20px;
        align-items: center;
      }
    }
  }

  @media screen and (max-width: 650px) {
    .title {
      > div {
        line-height: 110%;
      }
    }

    .info-wrapper {
      padding: 0 10px;
      display: grid;
      grid-template-columns: repeat(2, fit-content(48%));
      gap: 20px;

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

      div {
        line-height: 19px;
        font-size: 19px;
        align-items: flex-start;

        .block-name {
          line-height: 25px;
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    padding: 15px 10px;
    .title {
      column-gap: 10px;
      div {
        font-size: 25px;
        line-height: 110%;
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
      grid-template-columns: repeat(2, fit-content(42%));
      div {
        line-height: 16px;
        font-size: 16px;

        .block-name {
          line-height: 14px;
          font-size: 14px;
        }
      }
    }
  }
`

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
    width: 58%;
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

  @media screen and (max-width: 510px) {
    padding: 15px 10px;
    .title {
      column-gap: 10px;
      div {
        font-size: 24px;
        line-height: 100%;
      }

      img {
        width: 50px;
        height: 50px;
      }
    }
  }

  @media screen and (max-width: 420px) {
    .title {
      div {
        font-size: 20px;
      }

      img {
        width: 45px;
        height: 45px;
      }
    }
  }
`

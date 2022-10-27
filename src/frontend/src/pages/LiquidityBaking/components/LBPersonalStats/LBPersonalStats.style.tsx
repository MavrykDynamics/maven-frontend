import styled from 'styled-components'
import { MavrykTheme } from 'utils/interfaces'
import { LBActionStyled } from '../LBAction/LBAction.style'

export const LBPersonalStatsStyled = styled(LBActionStyled)<{ theme: MavrykTheme }>`
  background-image: url('images/stats_bg.png');
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto;

  .title {
    font-weight: 700;
    font-size: 30px;
    color: ${({ theme }) => theme.headingColor};
  }

  .stats-grid {
    padding-left: 22px;
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 82px);
    column-gap: 50px;
    row-gap: 50px;
    height: 100%;

    > div {
      row-gap: 20px;

      p {
        display: flex;
        align-items: center;
        svg {
          height: 16px;
          width: 16px;
          margin-left: 3px;
          fill: ${({ theme }) => theme.priceImpact};
        }
      }
    }
  }

  @media screen and (max-width: 1400px) {
    .stats-grid {
      column-gap: 35px;
      > div {
        row-gap: 7px;
        div:not(.block-name) {
          font-size: 22px;
          line-height: 100%;
        }

        .block-name {
          font-size: 17px;
        }
      }
    }
  }

  @media screen and (max-width: 1160px) {
    .stats-grid {
      column-gap: 30px;
      div {
        div {
          font-size: 29px;
        }

        .block-name {
          font-size: 14px;
        }
      }
    }
  }

  @media screen and (max-width: 1060px) {
    .stats-grid {
      div {
        div:not(.block-name) {
          font-size: 18px;
        }

        .block-name {
          font-size: 13px;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    height: 600px;
  }

  @media screen and (max-width: 650px) {
    background-image: none;
    height: fit-content;
    padding-bottom: 30px;

    .title {
      font-size: 25px;
    }

    .stats-grid {
      margin-top: 20px;
      padding: 0;
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      > div {
        flex-direction: row-reverse;
        justify-content: space-between;
        column-gap: 25px;

        > div:not(.block-name) {
          font-weight: 500;
          white-space: nowrap;
          margin-left: 7px;

          P {
            font-size: 16px;

            svg {
            }
          }
        }

        .block-name {
          font-size: 14px;
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    column-gap: 10px;
    background-size: contain;
  }
`

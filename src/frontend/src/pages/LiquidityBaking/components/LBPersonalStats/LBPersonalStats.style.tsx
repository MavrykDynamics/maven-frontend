import styled from 'styled-components'
import { MavrykTheme } from 'utils/interfaces'
import { LBActionStyled } from '../LBAction/LBAction.style'

export const LBPersonalStatsStyled = styled(LBActionStyled)<{ theme: MavrykTheme }>`
  background-image: url('images/stats_bg.png');
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto;

  &:hover {
    z-index: 2;
  }

  .title {
    font-weight: 700;
    font-size: 25px;
    color: ${({ theme }) => theme.mainHeadingText};
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

        font-weight: 700;
        font-size: 40px;
        line-height: 40px;

        white-space: nowrap;

        svg {
          height: 30px;
          width: 30px;

          margin-left: 3px;
          fill: ${({ theme }) => theme.primaryText};
        }
      }
    }

    .block-name {
      font-weight: 600;
      font-size: 22px;
      line-height: 22px;
    }
  }

  @media screen and (max-width: 1400px) {
    .stats-grid {
      column-gap: 35px;

      > div {
        row-gap: 7px;

        p {
          font-size: 36px;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) and (max-width: 1160px) {
    .stats-grid {
      column-gap: 30px;

      > div {
        p {
          font-size: 24px;

          svg {
            height: 20px;
            width: 20px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    min-height: unset;
    height: 420px;

    .stats-grid {
      margin-top: 20px;
      column-gap: 20px;
      row-gap: 5px;

      > div {
        p {
          font-size: 32px;

          svg {
            height: 25px;
            width: 25px;
          }
        }
      }
    }
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

        p,
        .block-name {
          font-size: 14px;
          line-height: 21px;

          svg {
            height: 12px;
            width: 12px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    column-gap: 10px;
    background-size: contain;
  }
`

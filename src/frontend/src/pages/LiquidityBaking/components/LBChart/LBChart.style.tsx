import styled from 'styled-components'
import { BLOCK_RADIUS } from 'styles/constants'
import { MavrykTheme } from 'utils/interfaces'

export const ChartStyled = styled.div<{ theme: MavrykTheme }>`
  background: ${({ theme }) => theme.darkBackroundColor};
  border: 1px solid ${({ theme }) => theme.lbBorder};
  border-radius: ${BLOCK_RADIUS};
  padding-top: 30px;
  z-index: 1;
  height: 610px;
  width: 100%;
  row-gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &.mobile-chart {
    border: none;
    padding-top: 0;

    .chart-controlls {
      align-items: center;

      .chart-info {
        img {
          width: 40px;
        }
      }
    }

    @media screen and (max-width: 425px) {
      .chart-controlls {
        padding: 0 10px 0 15px;
      }
    }

    @media screen and (max-width: 769px) {
      .chart-controlls {
        margin-bottom: 10px;
      }
    }
  }

  .right-wrapper-mobile {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    column-gap: 15px;
    margin-top: 10px;

    .chart-toggler {
      margin: 0;
      max-height: 40px;

      .toggle-btn {
        padding: 11px 25px;
        font-size: 16px;
      }
    }

    @media screen and (max-width: 550px) {
      align-items: center;
      .chart-toggler {
        .toggle-btn {
          padding: 10px 14px;
          font-size: 14px;
        }
      }
    }
  }

  .chart-controlls {
    padding: 0 20px 0 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .right-wrapper {
      display: flex;
      align-items: center;
      column-gap: 15px;

      .LB {
        margin: 0;
      }
    }

    .chart-info {
      display: flex;
      align-items: center;
      column-gap: 10px;
      height: fit-content;
      > svg {
        transform: rotate(90deg);
        width: 21px;
        height: 21px;
        fill: ${({ theme }) => theme.toggleButtonColor};
      }

      .info {
        display: flex;
        flex-direction: column;

        p {
          margin-top: 3px;
          display: flex;
          align-items: center;
          font-size: 16px;
        }

        svg {
          height: 16px;
          width: 16px;
          margin-left: 3px;
          fill: ${({ theme }) => theme.priceImpact};
        }

        .value {
          color: ${({ theme }) => theme.priceImpact};
        }
      }
    }
  }
`

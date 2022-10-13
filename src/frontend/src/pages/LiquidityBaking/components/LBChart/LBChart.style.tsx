import styled from 'styled-components'
import { cyanColor } from 'styles'
import { BLOCK_RADIUS } from 'styles/constants'
import { MavrykTheme } from 'utils/interfaces'

export const ChartStyled = styled.div<{ theme: MavrykTheme }>`
  background: ${({ theme }) => theme.darkBackroundColor};
  border: 1px solid ${({ theme }) => theme.lbBorder};
  border-radius: ${BLOCK_RADIUS};
  padding-top: 25px;
  z-index: 1;

  height: 100%;
  width: 100%;
  row-gap: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &.mobile-chart {
    border: none;
    padding-top: 0;

    .chart-wrapper {
      width: 100%;

      @media screen and (max-width: 570px) {
        width: 105%;
      }
    }

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
  }

  .right-wrapper-mobile {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    column-gap: 15px;

    .chart-toggler {
      margin: 0;
      max-height: 40px;

      .toggle-btn {
        padding: 10px 25px;
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
      svg {
        transform: rotate(90deg);
        width: 21px;
        height: 21px;
        fill: #8d86eb;
      }

      .info {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .chart-wrapper {
    height: 560px;
    width: 97%;

    > div {
      height: 550px !important;
      min-height: 550px !important;

      .apexcharts-tooltip {
        background: #160e3f;
        border: 1px solid #86d4c9;
        border-radius: 10px;
        padding: 6px 9px;
        display: flex;
        flex-direction: column;
        row-gap: 5px;
      }

      .apexcharts-toolbar {
        top: -8px !important;
      }
    }

    #apexchartscandlestickChart {
      width: 100% !important;
      height: 100% !important;

      svg {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
`

import styled from 'styled-components'
import { titleColor } from 'styles'
import { BLOCK_RADIUS } from 'styles/constants'
import { MavrykTheme } from 'utils/interfaces'

export const ChartStyled = styled.div<{ theme: MavrykTheme }>`
  grid-column-start: 1;
  grid-column-end: 3;
  background: ${({ theme }) => theme.darkBackroundColor};
  border: 1px solid ${({ theme }) => theme.lbBorder};
  /* background: #160e3f; */
  /* border: 1px solid ${titleColor}; */
  border-radius: ${BLOCK_RADIUS};
  grid-row-start: 3;
  grid-row-end: 4;
  padding-top: 25px;
  z-index: 1;

  height: 100%;
  width: 100%;
  row-gap: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .chart-controlls {
    padding: 0 20px 0 30px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .right-wrapper {
      display: flex;
      column-gap: 15px;
    }

    .chart-info {
      display: flex;
      align-items: center;
      column-gap: 10px;
      svg {
        transform: rotate(90deg);
        width: 21px;
        height: 21px;
      }

      .info {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .right-wrapper-mobile {
    display: none;
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

  @media screen and (max-width: 1200px) and (min-width: 1070px) {
    .chart-controlls {
      .right-wrapper {
        align-items: center;
      }
    }
  }

  @media screen and (max-width: 720px) {
    height: fit-content;
    .chart-controlls {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 20px;
      margin-bottom: 10px;
    }
  }

  @media screen and (max-width: 550px) {
    .chart-controlls {
      .right-wrapper {
        display: none;
      }
    }

    .right-wrapper-mobile {
      width: 100%;
      margin-left: 0;
      justify-content: center;
      column-gap: 15px;
      display: flex;
      margin-bottom: 10px;

      > div {
        margin: 0;
      }
    }
  }
`

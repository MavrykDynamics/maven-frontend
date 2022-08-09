import styled from 'styled-components'
import { titleColor } from 'styles'
import { BLOCK_RADIUS } from 'styles/constants'

export const ChartStyled = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  background: #160e3f;
  border: 1px solid ${titleColor};
  border-radius: ${BLOCK_RADIUS};
  grid-row-start: 2;
  grid-row-end: 3;
  z-index: 1;

  height: 502px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .chart-wrapper {
    height: 420px;
    width: 100%;

    > div {
      height: 450px !important;
      min-height: 450px !important;

      .apexcharts-tooltip {
        background: #160e3f;
        border: 1px solid #86d4c9;
        border-radius: 10px;
        padding: 6px 9px;
        display: flex;
        flex-direction: column;
        row-gap: 5px;
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

import styled from 'styled-components'
import { LBActionStyled } from '../LBAction/LBAction.style'

export const LBPersonalStatsStyled = styled(LBActionStyled)`
  background-image: url('images/stats_bg.png');
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto;

  .title {
    font-weight: 700;
    font-size: 30px;
    color: #8d86eb;
  }

  .stats-grid {
    padding-left: 22px;
    margin-top: 10%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 82px);
    column-gap: 50px;
    row-gap: 10%;
    height: 100%;

    > div {
      row-gap: 20px;
    }
  }

  @media screen and (max-width: 1160px) {
    .stats-grid {
      div {
        div {
          font-size: 22px;
        }

        .block-name {
          font-size: 16px;
        }
      }
    }
  }

  @media screen and (max-width: 960px) {
    height: 600px;
  }

  @media screen and (max-width: 650px) {
    background-image: none;
    height: fit-content;
    padding-bottom: 30px;

    .stats-grid {
      margin-top: 20px;
      padding: 0;
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      > div {
        flex-direction: row-reverse;
        justify-content: space-between;

        > div:not(.block-name) {
          font-weight: 500;

          P {
            font-size: 18px;
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

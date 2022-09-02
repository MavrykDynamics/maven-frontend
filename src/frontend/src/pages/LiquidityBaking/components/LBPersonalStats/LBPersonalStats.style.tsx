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
`

import styled from 'styled-components'

export const CoinSwapStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;

  .svg-wrapper {
    margin: 0 20px;

    svg {
      stroke: #77a4f2;
      transform: rotate(90deg);
    }
  }
`

export const CoinSwapCoinWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 36px;
    height: 36px;
    margin-right: 15px;
  }
`

import styled from 'styled-components'
import { MavrykTheme } from 'utils/interfaces'

export const CoinSwapStyled = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;

  .svg-wrapper {
    margin: 0 20px;

    svg {
      stroke: ${({ theme }) => theme.labelColor};
      transform: rotate(90deg);
    }
  }
`

export const CoinSwapCoinWrapper = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  align-items: center;

  svg {
    width: 36px;
    height: 36px;
    margin-right: 15px;
    fill: ${({ theme }) => theme.darkBackroundColor};
  }
`

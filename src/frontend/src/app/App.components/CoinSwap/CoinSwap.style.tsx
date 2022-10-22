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
      stroke: none;
      fill: ${({ theme }) => theme.labelColor};
      transform: rotate(90deg);
    }
  }

  &.onlyXtz {
    > div {
      font-size: 18px;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    div {
      font-size: 14px;
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

  @media screen and (max-width: 600px) {
    svg {
      width: 30px;
      height: 30px;
      margin-right: 7px;
    }
  }

  @media screen (min-width: 961px) and (max-width: 1200px) {
    div {
      width: min-content;
    }
  }
`

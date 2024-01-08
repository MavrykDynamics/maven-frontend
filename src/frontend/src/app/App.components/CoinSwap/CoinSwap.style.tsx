import styled from 'styled-components'
import {MavenTheme} from 'utils/interfaces'

export const CoinSwapStyled = styled.div<{ theme: MavenTheme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;

  .svg-wrapper {
    margin: 0 20px;

    svg {
      stroke: none;
      fill: ${({ theme }) => theme.mainHeadingText};
      transform: rotate(90deg);
    }
  }

  &.onlyXtz {
    > div {
      font-size: 14px;

      div {
        font-size: 14px;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    div {
      font-size: 14px;
    }
  }
`

export const CoinSwapCoinWrapper = styled.div<{ theme: MavenTheme }>`
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

  @media screen and (min-width: 1024px) and (max-width: 1250px) {
    div {
      font-size: 15px;
    }

    svg {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
`

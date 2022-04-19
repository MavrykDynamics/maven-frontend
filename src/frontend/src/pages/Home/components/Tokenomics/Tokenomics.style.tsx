import styled from 'styled-components/macro'
import { MavrykTheme } from 'utils/interfaces'

export const TokenomicsStyled = styled.section<{ theme: MavrykTheme }>`
  text-align: center;
  padding-top: 64px;

  h2 {
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
  }

  img {
    position: relative;
    top: -25px;
  }

  @media (max-width: 700px) {
    max-width: 100vw;
  }
`

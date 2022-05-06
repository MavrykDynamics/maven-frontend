import styled from 'styled-components/macro'
import { MavrykTheme } from 'utils/interfaces'

export const TokenomicsStyled = styled.section<{ theme: MavrykTheme }>`
  text-align: center;
  padding-top: 64px;
  padding-bottom: 120px;

  @media (max-width: 1000px) {
    padding-top: 16px;
    padding-bottom: 32px;
  }

  @media (max-width: 700px) {
    padding-bottom: 0;
  }

  h2 {
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    color: ${({ theme }) => theme.headerDarkColor};

    @media (max-width: 1000px) {
      font-size: 36px;
      line-height: 1.5;
      margin-bottom: 16px;
      padding-top: 40px;
    }

    @media (max-width: 700px) {
      font-size: 24px;
    }

    @media (max-width: 500px) {
      padding-top: 16px;
    }
  }

  img {
    position: relative;
    margin-top: 50px;
    max-width: 100%;
    min-height: 50px;

    @media (max-width: 700px) {
      top: 0;
      display: block;
      margin-top: 64px;
      margin-bottom: 64px;
    }

    @media (max-width: 500px) {
      margin-top: 32px;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 700px) {
    max-width: 100vw;
  }
`

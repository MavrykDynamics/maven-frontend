import styled from 'styled-components/macro'
import { subHeaderColor } from 'styles/colors'
import { MavrykTheme } from 'utils/interfaces'

import { CONTAINER_WIDTH } from '../../Home.style'

export const PartnersStyled = styled.section`
  margin-top: 120px;
  width: ${CONTAINER_WIDTH};
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: calc(100vw - 40px);
  margin-bottom: 112px;

  h2 {
    text-align: center;
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 44px;
    color: ${subHeaderColor};
  }

  @media (max-width: 1000px) {
    margin-top: 0px;
    margin-bottom: 32px;
  }

  @media (max-width: 700px) {
    margin-bottom: 0;
  }
`

export const PartnersGrid = styled.div<{ theme: MavrykTheme }>`
  .partner-cluster {
    width: 330px;
    display: flex;
    align-items: center;

    @media (max-width: 1000px) {
      width: 280px;
    }

    @media (max-width: 620px) {
      width: 180px;
    }

    @media (max-width: 400px) {
      width: 130px;
      padding-left: 0 !important;
    }

    img {
      width: 80%;
    }

    div {
      height: 74px;
      border-radius: 45px;
      background-color: ${({ theme }) => theme.clusterBg};
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      @media (max-width: 1000px) {
        height: 64px;
      }

      @media (max-width: 620px) {
        height: 50px;
      }

      @media (max-width: 400px) {
        height: 42px;
      }
    }
  }

  .partner-neo-facto {
    img {
      height: 100px;

      @media (max-width: 1000px) {
        height: 70px;
      }
    }
  }

  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-gap: 40px;

  > a {
    position: relative;
    z-index: 0;
    text-align: center;
    grid-column: span 5;
    margin-bottom: 40px;

    > img {
      width: 100%;
      @media (max-width: 1000px) {
        width: 100%;
      }
    }
  }

  > a:nth-child(5),
  a:nth-child(6),
  a:nth-child(7),
  a:nth-child(8),
  a:nth-child(9) {
    grid-column: span 4;
  }

  > a:nth-child(14),
  a:nth-child(15),
  a:nth-child(16),
  a:nth-child(17) {
    grid-column: span 4;
  }

  @media (max-width: 1240px) {
    .empty {
      display: none;
    }

    .partner-nomadic {
      padding-right: 40px;
    }

    .partner-cluster {
      padding-left: 40px;
    }

    grid-template-columns: repeat(15, 1fr);
    grid-gap: 16px;

    > a:nth-child(6),
    a:nth-child(7),
    a:nth-child(8) {
      grid-column: span 5;
    }
    > a:nth-child(4),
    a:nth-child(5),
    a:nth-child(9),
    a:nth-child(10) {
      grid-column: span 7;
    }

    > a:nth-child(14),
    a:nth-child(15),
    a:nth-child(16),
    a:nth-child(17) {
      grid-column: span 5;
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(15, 1fr);

    > a:nth-child(6),
    a:nth-child(7),
    a:nth-child(8) {
      grid-column: span 5;
    }
    > a:nth-child(4),
    a:nth-child(5),
    a:nth-child(9),
    a:nth-child(10) {
      grid-column: span 7;
    }
  }

  @media (max-width: 700px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    a {
      width: 45%;
    }
  }

  @media (max-width: 620px) {
    a {
      width: 45%;
    }
  }

  @media (max-width: 400px) {
    .partner-nomadic {
      padding-right: 20px !important;
    }
  }
`

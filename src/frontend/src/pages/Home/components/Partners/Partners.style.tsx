import styled from 'styled-components/macro'
import { subHeaderColor } from 'styles/colors'
import { CONTAINER_WIDTH } from '../../Home.style'

export const PartnersStyled = styled.section`
  margin-top: 120px;
  width: ${CONTAINER_WIDTH};
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: calc(100vw - 40px);

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

export const PartnersGrid = styled.div`
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

  > a:before {
    width: 90px;
    height: 90px;
    left: calc(50% - 45px);
    top: calc(50% - 45px);
    content: '';
    background: #9cb8e2;
    opacity: 0.08;
    position: absolute;
    border-radius: 100%;
    z-index: -1;

    @media (max-width: 1000px) {
      width: 48px;
      height: 48px;
      left: calc(50% - 24px);
      top: calc(50% - 24px);
    }
  }

  @media (max-width: 1240px) {
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

    div {
      display: none;
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
`

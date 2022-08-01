import styled, { css } from 'styled-components'
import { skyColor, titleColor } from 'styles'

export const LBHeaderStyled = styled.div`
  background: #160e3f;
  border: 1px solid ${titleColor};
  border-radius: 10px;
  grid-column-end: 3;
  grid-column-start: 1;
  min-height: 112px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .title {
    display: flex;
    align-items: center;

    div {
      &::after {
        display: none;
      }
      font-size: 35px;
    }

    svg {
      margin-right: 25px;
      width: 90px;
      height: 55px;
    }
  }

  .info-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 55%;
  }

  @media screen and (max-width: 1200px) {
    .block-name {
      font-size: 15px;
    }

    div {
      line-height: 10px;
      font-size: 16px;
    }

    .info-wrapper {
      width: 50%;
    }
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    row-gap: 30px;
    padding: 20px;

    .info-wrapper {
      width: fit-content;
      flex-wrap: wrap;
      column-gap: 50px;
      row-gap: 30px;
      justify-content: center;

      .block-name {
        font-size: 18px;
      }

      div {
        line-height: 18px;
        font-size: 18px;
        align-items: center;
      }
    }
  }

  @media screen and (max-width: 480px) {
    .title {
      div {
        font-size: 28px;
      }

      svg {
        margin-right: 15px;
        width: 60px;
        height: 55px;
      }
    }
  }
`

import styled from 'styled-components'

// types
import { MavrykTheme } from 'utils/interfaces'

// components
import { Button } from 'app/App.components/Button/Button.controller'

export const BakeryStyled = styled.div<{ theme: MavrykTheme }>`
  background-image: ${({ theme }) =>
    `url(${theme.topDesktopBackground}), url(${theme.bottomDesktopBackground}), ${theme.backgroundGradient}`};
  background-position: center 100px, bottom, center;
  background-repeat: no-repeat;
  background-size: contain;

  h1 {
    margin: 10px 0 30px 0;

    font-weight: 700;
    font-size: 35px;
    line-height: 35px;

    color: ${({ theme }) => theme.mainHeadingText};

    &::after {
      height: 0;
    }
  }

  p {
    margin: 0;

    font-weight: 500;
    font-size: 18px;
    line-height: 27px;

    color: ${({ theme }) => theme.regularText};
  }

  a {
    color: ${({ theme }) => theme.linksAndButtons};
    text-decoration: underline;
  }

  .main-content {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 110px 0 100px 0;
    row-gap: 20px;
    max-width: 1440px;
  }

  .grid-two-columns,
  .grid-three-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    row-gap: 20px;
  }

  .grid-three-columns {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .grid-column-gap {
    column-gap: 100px;
  }

  .paragraph-max-width {
    max-width: 845px;
  }

  .addresses {
    margin: 20px 0;

    span {
      margin-right: 10px;

      font-weight: 600;
      font-size: 18px;
      line-height: 27px;

      color: ${({ theme }) => theme.regularText};
    }

    .address {
      display: flex;
      align-items: center;
      white-space: nowrap;

      div {
        font-weight: 600;
        font-size: 18px;
        line-height: 27px;

        transition: opacity 0.3;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .centring-wrapper {
    display: flex;
    justify-content: center;
  }

  .space-between-horizontal {
    display: flex;
    justify-content: space-between;
  }

  .space-between-vertical {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .slider {
    margin: 10px 0 20px 0;

    button {
      margin: 0;
      white-space: nowrap;
    }
  }

  .mobile {
    display: none;
  }

  @media screen and (max-width: 1540px) {
    .main-content {
      padding: 110px 45px 70px 45px;
    }
  }

  @media screen and (max-width: 1300px) {
    .grid-two-columns {
      h1 {
        max-width: 350px;
      }
    }
  }

  @media screen and (max-width: 1200px) {
    .main-content {
      padding: 110px 25px 70px 25px;
    }
  }

  @media screen and (max-width: 990px) {
    .grid-two-columns {
      grid-template-columns: 1fr;

      h1 {
        max-width: 100%;
      }

      .media-margin-top-1 {
        margin-top: 40px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .main-content {
      padding: 100px 10px 60px 10px;
    }

    .grid-two-columns {
      .media-margin-top-2 {
        margin-top: 20px;
      }
    }

    .grid-three-columns {
      grid-template-columns: 1fr;
      row-gap: 10px;
    }

    .desktop {
      display: none;
    }

    .mobile {
      display: block;
    }

    .addresses {
      span {
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;

        margin-right: 0;
      }

      .address {
        div {
          font-weight: 600;
          font-size: 16px;
          line-height: 22px;
        }
      }
    }
  }
`

export const Card = styled.div`
  padding: 40px;

  background-color: ${({ theme }) => theme.cards};
  border: 1px solid ${({ theme }) => theme.strokeCards};
  border-radius: 10px;

  p {
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .coming-soon {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 30px;

    font-size: 18px;
    font-weight: 600;
    line-height: 27px;

    color: ${({ theme }) => theme.primaryText};
  }

  @media screen and (max-width: 600px) {
    padding: 20px;

    h1 {
      font-weight: 700;
      font-size: 25px;
      line-height: 30px;

      margin-bottom: 10px;
    }

    p {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;

      margin-bottom: 20px;

      &:last-of-type {
        margin-bottom: 10px;
      }
    }

    button {
      margin-top: 30px;
      margin-bottom: 10px;
    }

    .address {
      span,
      div {
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
      }
    }
  } ;
`

export const CardWithBackground = styled(Card)<{ theme: MavrykTheme }>`
  min-height: 425px;
  background-image: url(${({ theme }) => theme.mavrykFinanceBg});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto;

  @media screen and (max-width: 1400px) {
    p {
      width: 55%;
    }
  }

  @media screen and (max-width: 900px) {
    height: 760px;
    background-position: bottom center;
    background-size: 400px 290px;

    p {
      width: 100%;
    }
  }

  @media screen and (max-width: 600px) {
    height: 660px;
    background-size: 320px 230px;
  }
`

export const MiniCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 25px 10px;

  background-color: ${({ theme }) => theme.messagesBackground};
  border-radius: 10px;

  svg {
    width: 50px;
    height: 50px;
    fill: ${({ theme }) => theme.mainHeadingText};
  }

  h4 {
    margin: 10px 0;

    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: ${({ theme }) => theme.mainHeadingText};
    text-transform: capitalize;
  }

  span,
  .commaNumber {
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
    text-align: end;

    color: ${({ theme }) => theme.primaryText};
  }

  @media screen and (max-width: 600px) {
    display: grid;
    grid-template-columns: 35px 80px auto;
    column-gap: 15px;
    padding: 0 15px;
    height: 70px;

    svg {
      width: 40px;
      height: 40px;
    }

    span {
      text-align: end;
    }

    h4 {
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
    }
  }
`

export const ButtonStyled = styled(Button)`
  margin: 50px 0 20px 0;
  max-width: 370px;

  font-weight: 600;
  font-size: 16px;
  line-height: 16px;

  &.actionPrimary {
    fill: ${({ theme }) => theme.cards};
  }

  &.actionSecondary {
    fill: ${({ theme }) => theme.linksAndButtons};
  }
`

export const RoundButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;

  border-radius: 50%;
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    opacity: 0.8;
  }

  &.actionPrimary {
    background-color: ${({ theme }) => theme.linksAndButtons};
    border: 2px solid ${({ theme }) => theme.linksAndButtons};

    svg {
      fill: ${({ theme }) => theme.cards};
    }
  }

  &.actionSecondary {
    background-color: transparent;
    border: 2px solid ${({ theme }) => theme.linksAndButtons};

    svg {
      fill: ${({ theme }) => theme.linksAndButtons};
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`

export const BakeryChartStyled = styled.div<{ theme: MavrykTheme }>`
  padding: 20px;
  width: 60%;

  border: 1px solid ${({ theme }) => theme.strokeCards};
  border-radius: 10px;

  .header {
    width: max-content;

    h3 {
      font-weight: 600;
      font-size: 14px;

      color: ${({ theme }) => theme.mainHeadingText};
    }

    p {
      margin: 0;

      font-weight: 600;
      font-size: 18px;

      color: ${({ theme }) => theme.primaryText};
    }

    .percentages {
      text-align: end;

      span {
        font-weight: 600;
        font-size: 12px;
      }

      .green {
        color: ${({ theme }) => theme.upColor};
      }

      .red {
        color: ${({ theme }) => theme.downColor};
      }
    }

    .info {
      display: flex;

      svg {
        margin-right: 10px;
        width: 36px;
        height: 36px;
      }
    }
  }

  @media screen and (max-width: 1300px) {
    width: 50%;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    p:last-of-type {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;

      margin: 0;
    }

    .header {
      .percentages {
        display: none;
      }
    }
  }
`

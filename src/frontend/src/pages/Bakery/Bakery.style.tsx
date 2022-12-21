import styled from "styled-components";

// types
import { MavrykTheme } from "utils/interfaces";

// components
import { Footer } from "app/App.components/Footer/Footer.controller";

export const BakeryStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 80px;
  padding-top: 30px;
  row-gap: 20px;
  max-width: 1440px;

  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ theme }) =>
    `url(${theme.theme === 'light' ? 'images/bakery/bakery-light-desktop-bg.svg' : 'images/bakery/bakery-dark-desktop-bg.svg'})`};

  h1 {
    margin: 10px 0 30px 0;

    font-weight: 700;
    font-size: 35px;
    line-height: 35px;

    color: ${({ theme }) => theme.headingColor};

    &::after {
      height: 0;
    }
  }

  p {
    margin: 0;

    font-weight: 500;
    font-size: 18px;
    line-height: 27px;

    color: ${({ theme }) => theme.textSkyColor};
  }

  a {
    color: ${({ theme }) => theme.navColor};
  }

  .grid-two-columns,
  .grid-three-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
  }

  .grid-three-columns {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .paragraph-max-width {
    max-width: 845px;
  }

  .address {
    display: flex;
    align-items: center;
    margin: 25px 0 35px 0;

    span {
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;

      color: ${({ theme }) => theme.textSkyColor};
    }

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

  @media screen and (max-width: 769px) {
    background-image: ${({ theme }) =>
      `url(${theme.theme === 'light' ? 'images/bakery/bakery-light-mob-bg.svg' : 'images/bakery/bakery-dark-mob-bg.svg'})`};
  }
`

export const FooterStyled = styled(Footer)<{ theme: MavrykTheme }>`
  background-color: ${({ theme }) => theme.darkestBackroundColor};
`

export const Card = styled.div`
  padding: 40px;

  background-color: ${({ theme }) => theme.darkBackroundColor};
  border: 1px solid ${({ theme }) => theme.socialBackroundColor};
  border-radius: 10px;

  p {
    margin-bottom: 30px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`

export const CardWithBackground = styled(Card)`
  min-height: 425px;
  background-image: url('images/mavryk-finance.svg');
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto;
`

export const MiniCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 25px 0;

  background-color: ${({ theme }) => theme.tooltipBg};
  border-radius: 10px;

  h4 {
    margin: 10px 0;

    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: ${({ theme }) => theme.textSkyColor};
    text-transform: capitalize;
  }

  span {
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;

    color: ${({ theme }) => theme.tooltipValue};
  }
`

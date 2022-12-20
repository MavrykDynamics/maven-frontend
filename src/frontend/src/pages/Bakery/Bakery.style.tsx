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
  }

  p {
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;

    color: ${({ theme }) => theme.textDarkColor};
  }

  a {
    color: ${({ theme }) => theme.navColor};
  }

  .grid-two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
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

  background-color: ${({ theme }) => theme.darkestBackroundColor};
  border: 1px solid ${({ theme }) => theme.socialBackroundColor};
  border-radius: 10px;
`

export const MiniCard = styled.div`
  background-color: ${({ theme }) => theme.tooltipBg};

  h4 {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: ${({ theme }) => theme.textDarkColor};
  }

  span {
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;

    color: ${({ theme }) => theme.tooltipValue};
  }
`

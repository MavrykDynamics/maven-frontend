import styled from "styled-components";

// types
import { MavrykTheme } from "utils/interfaces";

// components
import { Footer } from "app/App.components/Footer/Footer.controller";

export const BakeryStyled = styled.div`
  background-image: ${({ theme }) =>
  `url(${theme.theme === 'light' ? 'images/bakery/bakery-light-desktop-bg.svg' : 'images/bakery/bakery-dark-desktop-bg.svg'})`};

  @media screen and (max-width: 769px) {
    background-image: ${({ theme }) =>
      `url(${theme.theme === 'light' ? 'images/lb/lb-light-mob-bg.svg' : 'images/lb/lb-dark-mob-bg.svg'})`};
  }

  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  padding-bottom: 100px;
`

export const FooterStyled = styled(Footer)<{ theme: MavrykTheme }>`
  background-color: ${({ theme }) => theme.darkestBackroundColor};
`

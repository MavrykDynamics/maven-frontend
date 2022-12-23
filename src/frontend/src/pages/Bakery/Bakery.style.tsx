import styled from "styled-components";

// types
import { MavrykTheme } from "utils/interfaces";

// components
import { Footer } from "app/App.components/Footer/Footer.controller";
import { Button } from "app/App.components/Button/Button.controller";

export const BakeryStyled = styled.div<{ theme: MavrykTheme }>`
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ theme }) =>
    `url(${theme.theme === 'light' ? theme.primaryLightDesktopBg : theme.primaryDarkDesktopBg})`
  };

  h1 {
    margin: 10px 0 30px 0;

    font-weight: 700;
    font-size: 35px;
    line-height: 35px;

    color: ${({ theme }) => theme.headingCardColor};

    &::after {
      height: 0;
    }
  }

  p {
    margin: 0;

    font-weight: 500;
    font-size: 18px;
    line-height: 27px;

    color: ${({ theme }) => theme.primaryTextCardColor};
  }

  a {
    color: ${({ theme }) => theme.secondaryTextCardColor};
    text-decoration: underline;
  }

  .main-content {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding-top: 110px;
    padding-bottom: 100px;
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

  .address {
    display: flex;
    align-items: center;
    margin: 25px 0 35px 0;

    span {
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;

      color: ${({ theme }) => theme.primaryTextCardColor};
    }

    div {
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;

      color: ${({ theme }) => theme.secondaryTextCardColor};
      transition: opacity 0.3;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
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

  @media screen and (max-width: 769px) {
    background-image: ${({ theme }) =>
       `url(${theme.theme === 'light' ? theme.primaryLightMobBg : theme.primaryDarkMobBg})`
  }};
`

export const FooterStyled = styled(Footer)<{ theme: MavrykTheme }>`
  background-color: ${({ theme }) => theme.darkestBackroundColor};
`

export const Card = styled.div`
  padding: 40px;

  background-color: ${({ theme }) => theme.darkBackroundColor};
  border: 1px solid ${({ theme }) => theme.borderCard};
  border-radius: 10px;

  p {
    margin-bottom: 30px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`

export const CardWithBackground = styled(Card)<{ theme: MavrykTheme }>`
  min-height: 425px;
  background-image: url(${({ theme }) => theme.mavrykFinanceBg});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto;
`

export const MiniCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 25px 0;

  background-color: ${({ theme }) => theme.secondaryBgCardColor};
  border-radius: 10px;

  svg {
    width: 50px;
    height: 50px;
    fill: ${({ theme }) => theme.headingSecondaryCardColor};
  }

  h4 {
    margin: 10px 0;

    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    color: ${({ theme }) => theme.headingSecondaryCardColor};
    text-transform: capitalize;
  }

  span {
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;

    color: ${({ theme }) => theme.secondaryTextCardColor};
  }
`

export const ButtonStyled = styled(Button)`
  margin: 50px 0 20px 0;
  width: 367px;

  &.actionSecondary {
    fill: ${({ theme }) => theme.navColor};
  }
`

export const RoundButton =  styled.a`
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

  &.actionPrimary {
    color: ${({ theme }) => theme.containerColor};
    background-color: ${({ theme }) => theme.actionPrimaryBtnColor};
  }

  &.actionSecondary {
    color: ${({ theme }) => theme.actionPrimaryBtnColor};
    background-color: transparent;
    border: 2px solid ${({ theme }) => theme.actionPrimaryBtnColor};

    svg {
      fill: ${({ theme }) => theme.navColor};
    }
  }
`
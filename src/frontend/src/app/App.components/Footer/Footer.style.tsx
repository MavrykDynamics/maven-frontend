import styled from 'styled-components/macro'
import { Page } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const FooterStyled = styled.footer<{ theme: MavrykTheme }>`
  --max-container: calc(100vw - 550px);
  background-color: ${({ theme }) => theme.darkBackroundColor};
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
  font-size: 18px;

  @media (max-width: 1200px) {
    --max-container: calc(100vw - 300px);
  }

  @media (max-width: 1000px) {
    font-size: 16px;
    --max-container: calc(100vw - 80px);
  }

  &.LB {
    --max-container: 90vw;

    div {
      > div {
        color: ${({ theme }) => theme.footerText};
      }
    }

    @media (min-width: 1700px) {
      --max-container: calc(100vw - 550px);
    }
  }
`

export const FooterContainer = styled.div`
  padding: 60px 20px;

  @media (max-width: 1500px) {
    padding: 60px 40px;
  }

  @media (max-width: 700px) {
    padding: 32px 20px;
  }
`

export const FooterTop = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: var(--max-container);
  display: flex;
  font-weight: 500;
  align-items: baseline;
  margin-bottom: 15px;

  @media (max-width: 700px) {
    flex-direction: column;
    text-align: center;
  }
`
export const FooterBottom = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: var(--max-container);
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 700px) {
    justify-content: space-evenly;
    margin-top: 20px;
  }
`
export const FooterSocials = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-bottom: 16px;

  @media (max-width: 700px) {
    margin-right: auto;
  }

  a {
    width: 60px;
    height: 60px;
    display: flex;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    @media (max-width: 700px) {
      margin-right: 5px;
      margin-left: 5px;
      width: 50px;
      height: 50px;
    }
  }

  svg {
    height: 30px;
    fill: ${({ theme }) => theme.socialColor};

    @media (max-width: 700px) {
      height: 25px;
    }
  }
`

export const FooterLogo = styled.img`
  margin-top: -3px;
  z-index: 1;
  width: 270px;

  @media (max-width: 700px) {
    margin-top: 0;
    width: 200px;
  }
`

export const FooterButton = styled.div<{ theme: MavrykTheme }>`
  cursor: pointer;
  background: ${({ theme }) => theme.textColor};
  border-radius: 5px;
  padding: 10px;
  color: ${({ theme }) => theme.backgroundColor};
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
`

export const FooterDescription = styled.div`
  margin: 10px 0;
  max-width: 665px;
  font-weight: 400;
  line-height: 20px;
  margin-top: 16px;
  padding-right: 32px;

  @media (max-width: 700px) {
    margin-bottom: 20px;
    padding-right: 0;
  }
`

export const FooterLinks = styled.div<{ theme: MavrykTheme }>`
  float: right;
  text-align: center;
  margin-right: 10px;
  text-decoration: underline;

  a {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.textColor};
  }
`

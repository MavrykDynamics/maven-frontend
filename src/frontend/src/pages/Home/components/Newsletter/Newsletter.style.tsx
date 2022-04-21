import styled from 'styled-components/macro'
import { Page, primaryColor, secondaryColor, textColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const NewsletterStyled = styled.section<{ theme: MavrykTheme }>`
  background-image: url(${({ theme }) => theme.subscribeBachground}), ${({ theme }) => theme.subscribeGradient};
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: contain;
  text-align: center;
  position: relative;

  @media (max-width: 1000px) {
    padding: 0 16px;
  }

  h2 {
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    padding-top: 80px;
    margin-bottom: 60px;
    color: ${({ theme }) => theme.headerSectionsColor};

    @media (max-width: 1000px) {
      font-size: 36px;
      line-height: 1.5;
      margin-bottom: 32px;
      padding-top: 40px;
    }

    @media (max-width: 700px) {
      font-size: 24px;
    }
  }
`

export const NewsletterGrid = styled.div`
  display: flex;
  justify-content: center;
`

export const NewsletterFigure = styled.figure`
  position: absolute;
  margin: 0;
  left: 0;
  bottom: -8px;
  z-index: 2;
  width: 100%;

  img {
    width: 100%;
    transform: scaleX(-1);
  }
`

export const NewsletterForm = styled.form<{ theme: MavrykTheme }>`
  width: 694px;
  max-width: 100%;
  margin-bottom: 250px;
  position: relative;
  z-index: 4;

  @media (max-width: 700px) {
    margin-bottom: 150px;
  }

  input {
    background: ${({ theme }) => theme.backgroundColor}75;
    border-radius: 15px;
    border: none;
    line-height: 60px;
    width: 100%;
    padding: 0 0 0 20px;
    margin: 0 0 32px 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.textColor};
    font-weight: 400;
    font-size: 14px;

    @media (max-width: 700px) {
      margin: 0 0 20px 0;
      line-height: 50px;
    }

    &::placeholder {
      font-weight: 400;
      font-size: 14px;
      color: ${({ theme }) => theme.placeholderColor}80;
    }
  }
`

export const NewsletterButton = styled.button<{ theme: MavrykTheme }>`
  line-height: 32px;
  font-size: 16px;
  font-weight: bold;
  color: ${textColor};
  text-align: center;
  background: ${({ theme }) => theme.btnBackroundColor};
  color: ${({ theme }) => theme.darkestBackroundColor};
  border-radius: 25px;
  cursor: pointer;
  width: 200px;
  display: inline-block;
  margin-top: 14px;
  border: none;
`

export const NewsletterStatus = styled.div<{ theme: MavrykTheme }>`
  position: relative;
  top: 20px;

  .loading {
    color: ${({ theme }) => theme.backgroundColor};
  }

  .success {
    color: ${({ theme }) => theme.upColor};
  }

  .error {
    color: ${({ theme }) => theme.downColor};
  }
`

export const NewsletterClose = styled.div`
  cursor: pointer;
  float: right;
  margin-top: 16px;
  margin-right: 16px;

  @media (max-width: 1000px) {
    margin-right: 0;
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: ${({ theme }) => theme.textColor};
  }
`

export const NewsletterAnimation = styled.div`
  height: 400px;
  @media (max-width: 700px) {
    height: 200px;
  }
`

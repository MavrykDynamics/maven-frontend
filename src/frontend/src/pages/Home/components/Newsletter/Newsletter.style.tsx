import styled from 'styled-components/macro'
import { Page } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const NewsletterStyled = styled(Page)<{theme: MavrykTheme}>`
  background: url('./images/newsletter-bg.svg'), linear-gradient(0deg, ${({theme}) => theme.borderColor} 0%, ${({theme}) => theme.containerColor} 100%);
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: fill;
  border-radius: 10px;
  padding: 60px;
  text-align: center;
  margin: 200px auto 100px auto;

  @media (max-width: 700px) {
    padding: 20px;
    margin: 0 auto 100px auto;
  }

  > h1 {
    color: ${({theme}) => theme.subTextColor};
    margin: auto;

    @media (max-width: 700px) {
      font-size: 20px;
    }
  }
`

export const NewsletterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 60px;

  > img {
    width: 100%;
    padding: 30px;
  }

  @media (max-width: 700px) {
    grid-template-columns: auto;
    grid-gap: 0px;
  }
`

export const NewsletterForm = styled.form<{theme: MavrykTheme}>`
  margin-top: 60px;

  @media (max-width: 700px) {
    margin-top: 40px;
  }

  input {
    background: ${({theme}) => theme.primaryColor}65;
    border-radius: 10px;
    border: none;
    height: 50px;
    line-height: 50px;
    width: 100%;
    padding: 0 0 0 20px;
    margin: 0 0 30px 0;
    box-sizing: border-box;
    color: ${({theme}) => theme.backgroundColor};
    font-size: 16px;
    font-weight: bold;

    @media (max-width: 700px) {
      margin: 0 0 20px 0;
    }

    &::placeholder {
      font-size: 16px;
      color: #ffffff64;
    }
  }
`

export const NewsletterButton = styled.button<{theme: MavrykTheme}>`
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
  color: ${({theme}) => theme.subTextColor};
  text-align: center;
  background-color: ${({theme}) => theme.primaryColor};
  border-radius: 25px;
  cursor: pointer;
  width: 200px;
  float: right;
  border: none;
`

export const NewsletterStatus = styled.div<{theme: MavrykTheme}>`
  float: right;
  line-height: 60px;
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .loading {
    color: ${({theme}) => theme.backgroundColor};
  }

  .success {
    color: ${({theme}) => theme.upColor};
  }

  .error {
    color: ${({theme}) => theme.downColor};
  }
`

export const NewsletterClose = styled.div`
  cursor: pointer;
  float: right;

  svg {
    width: 24px;
    height: 24px;
    stroke: #fff;
  }
`

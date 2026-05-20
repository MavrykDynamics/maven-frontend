import { createGlobalStyle } from 'styled-components'
import { cyanColor, headerColor, titleColor } from './colors'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    scroll-padding-top: 100px;
  }

  body {
    font-family: 'Metropolis', Helvetica, Arial, sans-serif;
    font-display: optional;
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font-family: 'Metropolis', Helvetica, Arial, sans-serif;
  }

  h1 {
    font-size: 40px;
    font-weight: bold;
    display: inline-block;
    margin: 30px auto;
    color: ${({ theme }) => theme.subTextColor};

    @media (max-width: 700px) {
      font-size: 30px;
      margin: 20px auto;
    }

    &::after {
      content: '';
      display: block;
      width: 80px;
      height: 5px;
      background-color: ${({ theme }) => theme.primaryColor};
      margin: 7px 0 10px 1px;
    }
  }

  h2 {
    font-size: 20px;
    font-weight: normal;
    display: block;
    margin: 0;
  }

  h3 {
    font-size: 30px;
    font-weight: normal;
    display: block;
    margin: 0;
  }

  h4 {
    font-size: 20px;
    font-weight: normal;
    display: block;
    margin: 0;
    text-align: center;
  }

  input {
    color: ${({ theme }) => theme.textColor};
    font-size: 14px;
  }

  ::placeholder {
    color: ${({ theme }) => theme.placeholderColor};
    font-size: 14px;
  }

  *:focus {
    outline: none;
  }

  a {
    color: ${({ theme }) => theme.textColor};
    text-decoration: none;
    opacity: 1;
    transition: opacity 0.15s ease-in-out-out;
    will-change: opacity;
  }

  a:hover {
    opacity: 0.9;
  }

  p {
    font-family: "Metropolis", sans-serif;
    display: block;
    margin-block-start: 10px;
    margin-block-end: 10px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  .scroll-block::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: ${titleColor}4d;
  }

  .scroll-block::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  .scroll-block::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: ${titleColor};
  }

  .info-link {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      svg {
        fill: ${cyanColor};
      }
    }

    svg {
      width: 16px;
      height: 16px;
      fill: ${headerColor};
    }
  }
`

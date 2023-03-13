import { createGlobalStyle } from 'styled-components/macro'
import { backgroundColor, cyanColor, headerColor, secondaryColor, titleColor } from './colors'
import { MavrykTheme } from 'utils/interfaces'

export const GlobalStyle = createGlobalStyle<{ theme: MavrykTheme }>`
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

  &::after{
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

.react-toggle {
  touch-action: pan-x;  

  display: inline-block;
  position: relative;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  padding: 0;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
}

.react-toggle-screenreader-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.react-toggle--disabled {
  cursor: not-allowed;
  opacity: 0.5;
  -webkit-transition: opacity 0.25s;
  transition: opacity 0.25s;
}

.react-toggle-track {
  width: 50px;
  height: 24px;
  font-size: 12px;
  padding: 0;
  border-radius: 30px;
  background-color: ${secondaryColor};
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
  background-color: ${secondaryColor};
}

.react-toggle--checked .react-toggle-track {
  background-color: ${backgroundColor};
}

.react-toggle--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
  background-color: ${backgroundColor};
}

.react-toggle-track-check {
  position: absolute;
  width: 18px;
  height: 18px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 10px;
  left: 6px;
  opacity: 0;
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;
}

.react-toggle--checked .react-toggle-track-check {
  opacity: 1;
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;
}

.react-toggle-track-x {
  position: absolute;
  width: 18px;
  height: 18px;
  top: 0px;
  bottom: 0px;
  margin-top: auto;
  margin-bottom: auto;
  line-height: 10px;
  right: 6px;
  opacity: 1;
  -webkit-transition: opacity 0.25s ease;
  -moz-transition: opacity 0.25s ease;
  transition: opacity 0.25s ease;
}

.react-toggle--checked .react-toggle-track-x {
  opacity: 0;
}

.react-toggle-thumb {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  position: absolute;
  top: 1px;
  left: 1px;
  width: 22px;
  height: 22px;
  border: 1px solid #FAFAFA;
  border-radius: 50%;
  background-color: #FAFAFA;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  // -webkit-transition: all 0.25s ease;
  // -moz-transition: all 0.25s ease;
  // transition: all 0.25s ease;
}

.react-toggle--checked .react-toggle-thumb {
  left: 27px;
  border-color: #FAFAFA;
}

.react-toggle--focus .react-toggle-thumb {
  -webkit-box-shadow: 0px 0px 3px 2px ${secondaryColor};
  -moz-box-shadow: 0px 0px 3px 2px ${secondaryColor};
  box-shadow: 0px 0px 2px 3px ${secondaryColor};
}

.react-toggle:active:not(.react-toggle--disabled) .react-toggle-thumb {
  -webkit-box-shadow: 0px 0px 5px 5px ${secondaryColor};
  -moz-box-shadow: 0px 0px 5px 5px ${secondaryColor};
  box-shadow: 0px 0px 5px 5px ${secondaryColor};
}

.scroll-block::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: ${titleColor}4d;
  }
.scroll-block::-webkit-scrollbar
  {
    width: 5px;
    background-color: transparent;
  }
.scroll-block::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
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

import styled from 'styled-components/macro'
import { secondaryColor, subTextColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const HeaderStyled = styled.div<{ showBg: boolean, theme: MavrykTheme }>`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 20;

  background-color: ${(props) => (props.showBg ? ({theme}) => theme.containerColor : '#FFFFFF00')};
  will-change: background-color;
  transition: background-color 200ms ease-in-out;
`

export const HeaderGrid = styled.div<{showBg: boolean, theme: MavrykTheme}>`
  margin: 0 auto;
  max-width: calc(100vw - 40px);
  width: 1280px;

  position: relative;
  text-align: center;
  height: 80px;
  z-index: 1;
  display: grid;
  grid-template-columns: 170px auto 100px 100px 100px 100px 100px 50px;
  grid-gap: 10px;
  font-weight: 500;

  > a {
    color: ${(props) => (props.showBg ? ({theme}) => theme.subTextColor : subTextColor)};
    transition: all 0.25s linear;
    margin-top: 33px;
  }

  > a:hover {
    color: ${(props) => (props.showBg ? ({theme}) => theme.litepaperLink : secondaryColor)};
  }

  > label {
    margin: auto;
  }

  @media (max-width: 1000px) {
    padding: 0 10px;
    max-width: calc(100vw - 20px);
    grid-template-columns: 170px auto 100px 50px;

    a:nth-child(4),
    a:nth-child(5),
    a:nth-child(6),
    a:nth-child(7) {
      display: none;
    }
  }
`

export const HeaderLogo = styled.div<{src: string}>`
  background: url(${(props) => props.src}) no-repeat;
  height: 100%;
  margin-top: -16px;
  z-index: 1;
  width: 170px;
  transition: all 0.25s linear;
`

export const HeaderButton = styled.div<{theme: MavrykTheme}>`
  cursor: pointer;
  background: ${({theme}) => theme.textColor};
  border-radius: 5px;
  padding: 10px;
  color: ${({theme}) => theme.backgroundColor};
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
`

export const HeaderIcon = styled.img`
  width: inherit;
  height: inherit;
`
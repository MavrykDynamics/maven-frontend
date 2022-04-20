import styled from 'styled-components/macro'
import { secondaryColor, subTextColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'
import { CONTAINER_WIDTH } from '../../../pages/Home/Home.style'

export const HeaderStyled = styled.div<{ showBg: boolean; theme: MavrykTheme }>`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 20;

  background-color: ${(props) => (props.showBg ? ({ theme }) => theme.darkestBackroundColor : '#FFFFFF00')};
  will-change: background-color;
  transition: background-color 200ms ease-in-out;
`

export const HeaderGrid = styled.div<{ showBg: boolean; theme: MavrykTheme }>`
  margin: 0 auto;
  max-width: calc(100vw - 40px);
  width: ${CONTAINER_WIDTH};
  margin-top: 30px;
  position: relative;
  text-align: center;
  height: 100px;
  z-index: 1;
  display: grid;
  grid-template-columns: 170px auto 100px 140px 100px 100px 70px 50px;
  grid-gap: 10px;
  font-weight: 500;

  > a {
    color: ${({ theme }) => theme.navColor};
    transition: all 0.25s linear;
    margin-top: 30px;
    font-size: 17px;
    font-weight: bold;
  }

  > a:hover {
    color: ${({ theme }) => theme.litepaperLinkColor};
  }

  > label {
    margin: auto;
    margin-top: 25px;
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

export const HeaderLogo = styled.div<{ theme: MavrykTheme; showBg: boolean; src: string }>`
  background: url(${(props) => props.src}) no-repeat;
  height: 100%;
  margin-top: ${(props) => (props.showBg ? ({ theme }) => '-24px' : '-8px')};
  z-index: 1;
  width: 276px;
  transition: all 0.25s linear;
`

export const HeaderButton = styled.div<{ theme: MavrykTheme }>`
  cursor: pointer;
  background: ${({ theme }) => theme.textColor};
  border-radius: 5px;
  padding: 10px;
  color: ${({ theme }) => theme.backgroundColor};
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
`

export const HeaderIcon = styled.img`
  width: inherit;
  height: inherit;
`

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
  align-items: center;
  display: flex;

  @media (max-width: 1000px) {
    height: 70px;
    padding-top: 16px;
  }

  @media (max-width: 500px) {
    padding-top: 0;
    height: auto;
  }
`

export const HeaderGrid = styled.div<{ showBg: boolean; theme: MavrykTheme }>`
  margin: 0 auto;
  max-width: calc(100vw - 80px);
  width: ${CONTAINER_WIDTH};
  margin-top: ${(props) => (props.showBg ? '0' : '30px')};
  position: relative;
  text-align: center;
  height: 80px;
  z-index: 1;
  display: flex;
  font-weight: 500;
  transition: 0.25s;

  > a {
    color: ${({ theme }) => theme.navColor};
    transition: all 0.25s linear;
    margin-top: 30px;
    font-size: 17px;
    font-weight: bold;
    margin-left: 30px;

    @media (max-width: 1070px) {
      margin-left: 16px;
    }

    &:nth-of-type(1) {
      margin-right: auto;
      margin-left: 0;
    }
  }

  > a:hover {
    color: ${({ theme }) => theme.litepaperLinkColor};
  }

  > label {
    margin-top: 25px;
    margin-left: 30px;

    @media (max-width: 1070px) {
      margin-left: 16px;
    }
  }

  @media (max-width: 1000px) {
    padding: 0;
    display: flex;
    height: auto;

    a {
      margin-top: -3px;
    }

    a:nth-of-type(1) {
      margin-right: auto;
    }

    a:nth-child(4),
    a:nth-child(5),
    a:nth-child(6),
    a:nth-child(7),
    a:nth-child(8) {
      display: none;
    }

    label {
      margin: 0;
      margin-left: 8px;
      margin-top: -7px;
    }
  }

  @media (max-width: 700px) {
    max-width: calc(100vw - 40px);
  }

  @media (max-width: 500px) {
    max-width: 100%;
    margin-top: 20px;
    padding-bottom: 8px;
    max-width: calc(100vw - 40px);

    a {
      margin-top: 2px;
      font-size: 14px;
    }

    label {
      margin-top: 0px;
      position: relative;
      bottom: 4px;
    }
  }

  @media (max-width: 374px) {
    margin-top: 19px;
    padding-bottom: 8px;
  }
`

export const HeaderLogo = styled.div<{ theme: MavrykTheme; showBg: boolean; src: string }>`
  background: url(${(props) => props.src}) no-repeat;
  height: 60px;
  margin-top: ${(props) => (props.showBg ? ({ theme }) => '-16px' : '-8px')};
  z-index: 1;
  width: 276px;
  transition: margin-top 0.25s linear;

  @media (max-width: 1000px) {
    height: 40px;
    background-size: contain;
    width: 200px;
    margin-top: -11px;
  }

  @media (max-width: 500px) {
    height: 28px;
    width: 140px;
    margin-top: -7px;
  }

  @media (max-width: 374px) {
    height: 18px;
    width: 100px;
    margin-top: -2px;
  }
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

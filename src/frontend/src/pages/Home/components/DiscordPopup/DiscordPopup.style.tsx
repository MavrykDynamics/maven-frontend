import styled from 'styled-components/macro'
import {headerColor, Page, primaryColor, secondaryColor, textColor} from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const DiscordPopupStyled = styled.section<{ theme: MavrykTheme }>`
  background-image: url(${({ theme }) => theme.subscribeBachground}), ${({ theme }) => theme.skyGradientTransparent};
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: cover;
  text-align: center;
  position: relative;
  @media (max-width: 1000px) {
    padding: 0 30px;
  }

  h2 {
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    padding-top: 80px;
    margin-bottom: 60px;
    color: ${({ theme }) => theme.headerDarkColor};

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

export const DiscordPopupGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > * {
    margin: 15px auto;
  }
  > h4 {
    max-width:40%;
    font-weight: 600;

    color: ${({ theme }) => theme.headerColor};
    @media (max-width: 1000px) {
      max-width: 95%;
      font-weight: 500;
    }
  }
`

export const DiscordPopupFigure = styled.figure`
  position: absolute;
  margin: 0;
  left: 0;
  bottom: -8px;
  z-index:0;
  width: 100%;

  @media (max-width: 700px) {
    overflow: hidden;
  }

  img {
    width: 100%;
    transform: scaleX(-1);
    min-height: 50px;
    object-fit: cover;

    @media (max-width: 700px) {
      margin-left: -2px;
      width: 102%;
    }
  }
`

export const DiscordPopupButton = styled.a<{ theme: MavrykTheme }>`
  line-height: 32px;
  font-size: 18px;
  font-weight: bold;
  color: ${textColor};
  text-align: center;
  background: ${({ theme }) => theme.btnBackroundNewsColor};
  color: ${({ theme }) => theme.btnNewsColor};
  border-radius: 25px;
  cursor: pointer;
  width: 280px;
  height: 50px;
  vertical-align: center;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

export const DiscordPopupStatus = styled.div<{ theme: MavrykTheme }>`
  position: relative;
  top: 20px;

  .loading {
    color: ${({ theme }) => theme.textColor};
  }

  .success {
    color: ${({ theme }) => theme.upColor};
  }

  .error {
    color: ${({ theme }) => theme.downColor};
  }
`

export const DiscordPopupClose = styled.div`
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
export const DiscordPopupSocials = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-bottom: 50px;

  @media (max-width: 700px) {
    margin-right: auto;
    margin-bottom: 16px;
  }

  a {
    width: 60px;
    height: 60px;
    display: flex;
    margin-left: 20px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    z-index: 999;

    @media (max-width: 700px) {
      margin-right: 5px;
      margin-left: 5px;
      width: 50px;
      height: 50px;
    }
  }

  svg {
    height: 44px;
    fill: ${({theme}) => theme.socialsColor};
    
    @media (max-width: 700px) {
      height: 25px;
    }
  }
`
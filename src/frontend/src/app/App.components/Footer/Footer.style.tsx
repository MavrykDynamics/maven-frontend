import styled from 'styled-components/macro'
import { Page } from 'styles'
import { MavrykTheme } from 'utils/interfaces'
import { CONTAINER_WIDTH } from '../../../pages/Home/Home.style'

export const FooterStyled = styled.footer<{ theme: MavrykTheme }>`
  background-color: ${({ theme }) => theme.darkestBackroundColor};
  color: ${({ theme }) => theme.textColor};
  margin-top: 20px;
`

export const FooterContainer = styled.div`
  padding: 50px 20px;
`

export const FooterTop = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${CONTAINER_WIDTH};
  display: flex;
  font-weight: 500;
  align-items: baseline;
  margin-bottom: 15px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`
export const FooterBottom = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${CONTAINER_WIDTH};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  font-size: 18px;

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

  a {
    width: 60px;
    height: 60px;
    width: 60px;
    height: 60px;
    display: flex;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.socialBackroundColor};
  }

  svg {
    height: 30px;
    fill: ${({ theme }) => theme.socialColor};
  }
`

export const FooterLogo = styled.img`
  margin-top: -3px;
  z-index: 1;
  width: 270px;
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
  font-size: 18px;
  line-height: 20px;
  margin-top: 16px;
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

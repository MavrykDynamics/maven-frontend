import styled, { css } from 'styled-components/macro'
import { btnLightColor, headerColor, secondaryColor, subTextColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const JumbotronStyled = styled.div`
  padding: 266px 0px 30px 0px;

  @media (max-width: 1240px) {
    background-position: top 0 right -200px;
  }

  @media (max-width: 1000px) {
    background-position: top 0 right -300px;
    padding: 180px 0px 30px 0px;
  }

  @media (max-width: 700px) {
    background-position: top -10px right -80px;
    background-size: 90% auto;
    padding-top: 30px;
  }
`

export const JubontronTitle = styled.div<{ theme: MavrykTheme }>`
  > h1 {
    font-weight: bold;
    font-size: 64px;
    line-height: 110%;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.headerColor};
    margin-top: 0;
    margin-block: 0;

    &:after {
      display: none;
    }

    @media (max-width: 1240px) {
      font-size: 48px;
    }

    @media (max-width: 1000px) {
      font-size: 36px;
    }

    @media (max-width: 700px) {
      font-size: 24px;
    }
  }
`

export const JubontronSubTitle = styled.div`
  margin: 20px 0 32px 0;
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
  font-size: 16px;
  line-height: 160%;

  @media (max-width: 1240px) {
  }

  @media (max-width: 1000px) {
  }

  @media (max-width: 700px) {
    font-size: 14px;
  }
`

export const JubontronContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  max-width: 481px;
`

export const JumbotronButtons = styled.div`
  display: flex;
  grid-gap: 40px;

  @media (max-width: 500px) {
    grid-gap: 20px;
  }
`

export const JumbotronButton = styled.div<{ secondary?: boolean }>`
  line-height: 37px;
  font-size: 16px;
  font-weight: bold;
  color: ${subTextColor};
  text-align: center;
  background: ${headerColor};
  border-radius: 25px;
  max-width: 200px;
  moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  background-size: 300% 100%;
  padding: 0 32px;

  @media (max-width: 374px) {
    padding: 0 20px;
  }

  &:hover {
    background-position: -100% 0;
  }

  ${(props) =>
    props.secondary &&
    css`
      color: ${headerColor};
      background: ${btnLightColor};
    `}
`

export const JumbotronSocials = styled.div<{ theme: MavrykTheme }>`
  margin: 50px 0 150px 0;

  @media (max-width: 1000px) {
    display: none;
  }
`

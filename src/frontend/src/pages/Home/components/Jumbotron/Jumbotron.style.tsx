import styled, { css } from 'styled-components/macro'
import { primaryColor, secondaryColor, subTextColor } from 'styles'

export const JumbotronStyled = styled.div`
  padding: 304px 0px 30px 0px;
  //margin: 80px auto 0 auto;

  @media (max-width: 1240px) {
    background-position: top 0 right -200px;
  }

  @media (max-width: 1000px) {
    background-position: top 0 right -300px;
    padding: 104px 0px 30px 0px;
  }

  @media (max-width: 700px) {
    background-position: top -10px right -80px;
    background-size: 90% auto;
  }
`

export const JubontronTitle = styled.div`
  > div {
    font-weight: bold;
    font-size: 64px;
    line-height: 110%;
    letter-spacing: -0.02em;
    color: ${subTextColor};

    &:nth-child(2) {
      color: ${secondaryColor};
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
  margin: 20px 0 40px 0;
  color: ${subTextColor};
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
  margin: 0 45% 0 0;

  @media (max-width: 1240px) {
    margin: 0 45% 0 0;
  }

  @media (max-width: 1000px) {
    margin: 0 30% 0 0;
  }

  @media (max-width: 700px) {
    margin: 0 3 0% 0 0;
  }
`

export const JumbotronButtons = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  grid-gap: 20px;

  @media (max-width: 700px) {
    grid-template-columns: 150px 150px;
  }
`

export const JumbotronButton = styled.div<{ secondary?: boolean }>`
  height: 56px;
  line-height: 56px;
  font-size: 16px;
  font-weight: bold;
  color: ${subTextColor};
  text-align: center;
  //background: linear-gradient(to right, ${secondaryColor} 0%, ${primaryColor} 100%);
  background: linear-gradient(to right, ${primaryColor}, ${primaryColor}, ${secondaryColor}, ${primaryColor});
  border-radius: 25px;
  max-width: 200px;
  moz-transition: all .2s ease-in-out;
  -o-transition: all .2s ease-in-out;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
  background-size: 300% 100%;

  &:hover {
    background-position: -100% 0;
  }

  ${(props) =>
    props.secondary &&
    css`
      color: ${primaryColor};
      background: #fff;
      border: 1px solid ${primaryColor};
    `}
`

export const JumbotronSocials = styled.div`
  margin: 50px 0 150px 0;
  display: grid;
  grid-template-columns: 24px 24px 24px 24px 24px;
  grid-gap: 40px;

  svg {
    width: 24px;
    height: 24px;
    fill: ${secondaryColor};
  }
`

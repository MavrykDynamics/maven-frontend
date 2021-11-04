import styled from 'styled-components/macro'
import { backgroundColor, borderColor, Page, textColor } from 'styles'

export const FooterStyled = styled.div`
  background-color: ${borderColor};
  color: ${backgroundColor};
  margin-top: 20px;
`

export const FooterContainer = styled(Page)`
  padding: 50px 20px;
`

export const FooterTop = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1270px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`
export const FooterBottom = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1270px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 700px) {
    justify-content: space-evenly;
    margin-top: 20px;
  }
`
export const FooterSocials = styled.div`
  display: grid;
  grid-template-columns: 48px 48px 48px 48px 48px;
  grid-gap: 10px;

  > a {
    width: 48px;
    height: 48px;
    position: relative;
    z-index: 1;
  }

  > a:before {
    width: 48px;
    height: 48px;
    left: calc(50% - 36px);
    top: calc(50% - 36px);
    content: '';
    background: ${backgroundColor};
    opacity: 0.08;
    position: absolute;
    border-radius: 100%;
    z-index: -1;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: ${backgroundColor};
  }

  @media (max-width: 700px) {
    margin-top: 20px;
    align-self: center;
  }
  @media (max-width: 400px) {
    align-self: end;
  }
`

export const FooterLogo = styled.img`
  margin-top: -10px;
  z-index: 1;
  width: 170px;
`

export const FooterButton = styled.div`
  cursor: pointer;
  background: ${textColor};
  border-radius: 5px;
  padding: 10px;
  color: ${backgroundColor};
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
`

export const FooterDescription = styled.div`
  margin: 10px 0;
  max-width: 400px;
`

export const FooterLinks = styled.div`
  float: right;
  text-align: center;
  margin-right: 10px;
  text-decoration: underline;

  a {
    font-size: 14px;
    font-weight: 500;
    color: ${backgroundColor};
  }
`

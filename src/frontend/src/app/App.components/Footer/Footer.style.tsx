import styled from 'styled-components/macro'
import { MavrykTheme } from 'utils/interfaces'

export const FooterStyled = styled.footer<{ theme: MavrykTheme }>`
  position: relative;
  --max-container: calc(100vw - 550px);
  background-color: ${({ theme }) => theme.footerColor};
  color: ${({ theme }) => theme.textColor};
  font-weight: 400;
  font-size: 18px;

  // Overlap the border between background-image in body and footer
  // Because on certain @media we have an unnecessary border from background in the body
  &::before {
    position: absolute;
    background-color: ${({ theme }) => theme.footerColor};
    top: -7px;
    height: 10px;
    width: 100%;
    content: '';
    z-index: 2;
  }

  --max-container: 90vw;

  div {
    > div {
      color: ${({ theme }) => theme.footerText};
      font-size: 16px;
    }
  }

  @media (min-width: 1700px) {
    --max-container: calc(100vw - 550px);
  }

  @media (max-width: 500px) {
    .logo-descr {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      div {
        text-align: left;
      }
    }
    > div {
      padding: 32px 20px 0px 20px;
    }
  }
`

export const FooterContainer = styled.div`
  padding: 60px 20px;

  @media (max-width: 1500px) {
    padding: 60px 40px;
  }

  @media (max-width: 700px) {
    padding: 32px 20px;
  }
`

export const FooterTop = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: var(--max-container);
  display: flex;
  font-weight: 500;
  align-items: baseline;
  margin-bottom: 15px;

  @media (max-width: 700px) {
    flex-direction: column;
    text-align: center;
  }
`
export const FooterBottom = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: var(--max-container);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .powered-by {
    position: relative;
    bottom: 40px;
    text-align: right;

    font-weight: 400;
    font-size: 14px;
    line-height: 10px;

    color: ${({ theme }) => theme.mainHeadingText};

    a {
      color: ${({ theme }) => theme.linksAndButtons};
    }
  }

  .aditional-links {
    display: flex;
    column-gap: 15px;
    a {
      color: ${({ theme }) => theme.footerText};
      font-size: 16px;
      text-decoration: underline;
    }
  }

  &.mob {
    display: none;
    margin-bottom: 20px;
  }

  @media (max-width: 700px) {
    .links {
      display: flex;
      flex-direction: column-reverse;
      row-gap: 20px;
    }

    .powered-by {
      bottom: 0;
      text-align: center;
    }

    .hide {
      display: none;
    }

    &.mob {
      display: block;
    }

    margin: 0 0 20px 0;
    justify-content: flex-start;
  }

  @media (min-width: 500px) and (max-width: 700px) {
    justify-content: center;
  }

  @media (max-width: 500px) {
    .powered-by {
      bottom: 0;
      text-align: left;
    }
  }
`
export const FooterSocials = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-bottom: 16px;
  position: relative;
  height: 100%;

  @media (max-width: 700px) {
    margin-right: auto;
  }

  > a {
    width: 60px;
    height: 60px;
    display: flex;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    @media (max-width: 700px) {
      margin-right: 5px;
      margin-left: 5px;
      width: 50px;
      height: 50px;
    }
  }

  svg {
    height: 30px;
    fill: ${({ theme }) => theme.socialColor};

    @media (max-width: 700px) {
      height: 25px;
    }
  }

  @media (max-width: 500px) {
    margin-bottom: 0;
    margin-left: 0;
  }
`

export const FooterLogo = styled.img`
  margin-top: -3px;
  z-index: 1;
  width: 270px;

  @media (max-width: 700px) {
    margin-top: 0;
    width: 200px;
  }
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
  line-height: 20px;
  margin-top: 16px;
  padding-right: 32px;

  @media (max-width: 700px) {
    margin-bottom: 20px;
    padding-right: 0;
  }
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

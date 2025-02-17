import styled from 'styled-components/macro'
import {MavenTheme} from 'utils/interfaces'

export const AppFeaturesSection = styled.section<{ theme: MavenTheme }>`
  --max-container: calc(100vw - 360px);
  padding-top: 50px;
  padding-bottom: 190px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1000px) {
    padding-top: 0;
    padding-bottom: 50px;
  }

  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 104px;
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

export const AppFeaturesList = styled.article<{ theme: MavenTheme }>`
  width: var(--max-container);
  max-width: 100%;
  margin: 0;
  display: grid;
  justify-content: space-between;
  row-gap: 70px;
  grid-template-columns: repeat(3, 340px);
  max-width: calc(100vw - 220px);

  @media (max-width: 1420px) {
    width: 1020px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 280px);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 300px);
    row-gap: 50px;
    column-gap: 80px;
    justify-content: center;
    padding-top: 32px;
    max-width: calc(100vw - 80px);
  }

  @media (max-width: 700px) {
    max-width: calc(100vw - 40px);
  }

  @media (max-width: 750px) {
    column-gap: 40px;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    padding-top: 16px;
  }
`

export const AppFeaturesFigure = styled.figure<{ theme: MavenTheme }>`
  margin: 0;
  padding: 0 20px;

  @media (max-width: 700px) {
    max-width: 100%;
    text-align: center;
  }

  img {
    height: 128px;
  }

  h3 {
    font-weight: 700;
    color: ${({ theme }) => theme.headingColor};
    font-size: 30px;
    line-height: 30px;
    margin-top: 43px;

    @media (max-width: 1000px) {
      font-size: 18px;
      line-height: 1.5;
      margin-top: 24px;
    }
  }

  figcaption {
    margin-top: 16px;
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    color: ${({ theme }) => theme.textColor};

    @media (max-width: 1000px) {
      font-size: 15px;
      margin-top: 8px;
      line-height: 1.5;
    }
  }
`

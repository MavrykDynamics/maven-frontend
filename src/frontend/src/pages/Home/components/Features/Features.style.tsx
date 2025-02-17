import styled from 'styled-components/macro'
import {Page} from 'styles'
import {MavenTheme} from 'utils/interfaces'

import {CONTAINER_WIDTH} from '../../Home.style'

export const FeaturesSection = styled.div<{ theme: MavenTheme }>`
  background-color: ${({ theme }) => theme.darkestBackroundColor};
  background-image: url(${({ theme }) => theme.featuresBackground});
  background-position: bottom;
  background-size: 105%;
  background-repeat: no-repeat;
  padding-bottom: 175px;
  background-position-y: 101%;

  @media (max-width: 1000px) {
    padding-bottom: 64px;
  }
`

export const FeaturesStyled = styled(Page)`
  text-align: center;
  margin-bottom: 150px;
  width: ${CONTAINER_WIDTH};
  max-width: calc(100vw - 220px);

  @media (max-width: 1250px) {
    max-width: calc(100vw - 40px);
  }

  @media (max-width: 1000px) {
    margin-bottom: 32px;
  }
`

export const FeaturesGrid = styled.div`
  padding-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media (max-width: 700px) {
    grid-template-columns: auto;
  }
`

export const FeaturesComponent = styled.div<{ theme: MavenTheme }>`
  background-color: ${({ theme }) => theme.darkBackroundColor};
  border-radius: 15px;
  padding: 40px 30px;

  h3 {
    margin-top: 60px;
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.headingColor};

    @media (max-width: 1000px) {
      margin-top: 40px;
      font-size: 18px;
    }
  }

  img {
    max-width: 100%;
  }

  p {
    margin-top: 24px;
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    color: ${({ theme }) => theme.subTextColor};

    @media (max-width: 1000px) {
      font-size: 15px;
      line-height: 1.5;
    }
  }
`

import styled, { css } from 'styled-components/macro'
import { coralColor, subHeaderColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'
import { CONTAINER_WIDTH } from '../../Home.style'

export const AppFeaturesSection = styled.section<{ theme: MavrykTheme }>`
  padding-top: 50px;
  padding-bottom: 190px;

  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 104px;
  }
`

export const AppFeaturesList = styled.article<{ theme: MavrykTheme }>`
  width: ${CONTAINER_WIDTH};
  margin: 0 auto;
  display: grid;
  justify-content: space-between;
  row-gap: 70px;
  grid-template-columns: repeat(3, 300px);

  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 93px;
  }
`

export const AppFeaturesFigure = styled.figure<{ theme: MavrykTheme }>`
  margin: 0;
  max-width: 300px;

  h3 {
    font-weight: 700;
    color: ${({ theme }) => theme.headingColor};
    font-size: 30px;
    line-height: 30px;
    margin-top: 43px;
  }

  figcaption {
    margin-top: 16px;
    font-weight: 400;
    font-size: 17px;
    line-height: 25px;
    color: ${({ theme }) => theme.subTextColor};
  }
`

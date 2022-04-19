import styled from 'styled-components/macro'
import { MavrykTheme } from 'utils/interfaces'
import { CONTAINER_WIDTH } from '../../Home.style'

export const TeamStyled = styled.section<{ theme: MavrykTheme }>`
  width: ${CONTAINER_WIDTH};
  max-width: 100%;
  margin: 0 auto;
  text-align: center;

  h2 {
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 158px;
    color: ${({ theme }) => theme.headerColor};
  }
`

export const TeamsGrid = styled.div<{ theme: MavrykTheme }>`
  display: grid;
  grid-template-columns: repeat(4, 280px);
  justify-content: space-between;
  gap: 60px;
  margin-bottom: 145px;
`

export const TeamFigure = styled.figure<{ theme: MavrykTheme }>`
  margin: 0;
  background: ${({ theme }) => theme.darkestBackroundColor};

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  h3 {
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    color: ${({ theme }) => theme.headerColor};
  }

  figcaption {
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
    color: ${({ theme }) => theme.headerColor};
  }
`

export const TeamCityDecor = styled.figure<{ theme: MavrykTheme }>`
  background: url(${({ theme }) => theme.teamCityDecor});
  width: 300px;
  height: 227px;
`

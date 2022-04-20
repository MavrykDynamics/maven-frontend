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
  justify-content: center;
  gap: 60px;
  margin-bottom: 145px;
`

export const TeamFigure = styled.figure<{ theme: MavrykTheme }>`
  margin: 0;
  background-color: ${({ theme }) => theme.darkestBackroundColor};
  min-height: 310px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  background-repeat: no-repeat;

  &:nth-of-type(1),
  &:nth-of-type(n + 4) {
    background-image: url(${({ theme }) => theme.teamDecor1});
    background-position-y: 16px;
  }

  &:nth-of-type(2),
  &:nth-of-type(2n + 4) {
    background-image: url(${({ theme }) => theme.teamDecor2});
    background-position-y: 40px;
    background-position-x: center;
  }

  &:nth-of-type(3),
  &:nth-of-type(3n + 4) {
    background-image: url(${({ theme }) => theme.teamDecor3});
    background-position-y: bottom;
    background-position-x: 9px;
  }

  &:nth-of-type(4n) {
    background-image: url(${({ theme }) => theme.teamDecor4});
    background-position-y: 16px;
  }

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  a {
    display: block;
    height: 100%;
    width: 100%;
    padding-top: 24px;
    position: relative;
    z-index: 1;
  }

  h3 {
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.headerColor};
  }

  figcaption {
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
    color: ${({ theme }) => theme.headerColor};
  }

  svg {
    width: 35px;
    height: 35px;
    position: absolute;
    right: 13px;
    bottom: 13px;
    fill: ${({ theme }) => theme.linkedinLinkColor};
  }
`

export const TeamCityDecor = styled.figure<{ theme: MavrykTheme }>`
  background: url(${({ theme }) => theme.teamCityDecor});
  width: 300px;
  height: 227px;
  background-repeat: no-repeat;
  position: absolute;
  bottom: -88px;
  margin: 0;
  left: 0;
`

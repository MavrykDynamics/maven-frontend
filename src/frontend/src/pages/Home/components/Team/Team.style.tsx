import styled from 'styled-components/macro'
import {MavenTheme} from 'utils/interfaces'

import {CONTAINER_WIDTH} from '../../Home.style'

export const TeamStyled = styled.section<{ theme: MavenTheme }>`
  --carousel-button-bg: ${({ theme }) => theme.darkestBackroundColor};
  width: ${CONTAINER_WIDTH};
  max-width: 100%;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 700px) {
    --carousel-button-size: 40px;
    --carousel-button-indent: -50px;
  }

  @media (max-width: 700px) {
    --carousel-button-indent: -40px;
  }

  article {
    &:nth-child(2) {
      width: 1200px;
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
    }
  }

  h2 {
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 158px;
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

export const TeamsGrid = styled.div<{ theme: MavenTheme }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 56px;
  column-gap: 38px;
  margin-bottom: 145px;

  @media (max-width: ${CONTAINER_WIDTH}) {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }

  @media (max-width: 1000px) {
    margin-bottom: 32px;
  }
`

export const TeamFigure = styled.figure<{ theme: MavenTheme }>`
  margin: 0;
  background-color: ${({ theme }) => theme.darkestBackroundColor};
  min-height: 310px;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  background-repeat: no-repeat;
  width: 280px;
  margin: 0 8px;

  @media (max-width: 700px) {
    min-width: 100%;
    width: auto;
  }

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
    object-fit: cover;
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
    font-size: 28px;
    line-height: 30px;
    margin-bottom: 6px;
    color: ${({ theme }) => theme.headerTeam};

    @media (max-width: 500px) {
      font-size: 24px;
    }
  }

  figcaption {
    font-weight: 600;
    font-size: 19px;
    line-height: 20px;
    padding: 0 30px;
    color: ${({ theme }) => theme.headerTeam};

    @media (max-width: 500px) {
      font-size: 18px;
    }
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

export const TeamCityDecor = styled.figure<{ theme: MavenTheme }>`
  background: url(${({ theme }) => theme.teamCityDecor});
  width: 300px;
  height: 227px;
  background-repeat: no-repeat;
  position: absolute;
  bottom: -88px;
  margin: 0;
  left: 0;
`

export const TeamCarouselWrap = styled.div<{ theme: MavenTheme }>`
  width: 80%;
  margin: auto;
  margin-bottom: 32px;
`

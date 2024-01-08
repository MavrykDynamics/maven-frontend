import styled from 'styled-components/macro'
import {MavenTheme} from 'utils/interfaces'

export const IdeasSection = styled.section<{ theme: MavenTheme }>`
  --carousel-button-indent: -100px;
  --carousel-button-bg: ${({ theme }) => theme.darkBackroundColor};
  background-image: url(${({ theme }) => theme.starsBachground}), ${({ theme }) => theme.skyGradient};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  text-align: center;
  position: relative;

  @media (max-width: 1370px) {
    --carousel-button-indent: -64px;
  }

  @media (max-width: 1280px) {
    --carousel-button-indent: -100px;
  }

  @media (max-width: 1000px) {
    --carousel-button-size: 40px;
    --carousel-button-indent: -50px;
    --carousel-button-indent: -32px;
  }

  h2 {
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 60px;
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

export const IdeasFigure = styled.figure<{ theme: MavenTheme }>`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0;
  margin-top: -100px;

  img {
    min-height: 50px;
    max-width: 100%;
    width: 100%;
  }
`

export const IdeasCarouselWrap = styled.div<{ theme: MavenTheme }>`
  width: 1140px;
  margin: auto;
  min-height: 250px;

  @media (max-width: 1280px) {
    width: 760px;
  }

  @media (max-width: 850px) {
    width: 380px;
  }

  @media (max-width: 700px) {
    width: 80%;
    margin-bottom: 32px;
    --carousel-button-bg: transparent;
    --carousel-button-indent: -40px;
  }
`

export const IdeasGroupSection = styled.div<{ theme: MavenTheme }>`
  width: 1140px;
  max-width: 100%;
  flex-shrink: 0;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
`

export const IdeaLoading = styled.div<{ theme: MavenTheme }>`
  margin: 0;
  padding-top: 64px;

  @media (max-width: 850px) {
    padding-top: 0;
    padding-bottom: 64px;
  }
`

export const IdeaLink = styled.a<{ theme: MavenTheme }>`
  width: 329px;
  height: 305px;
  display: flex;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  margin: 12px 25px;

  @media (max-width: 700px) {
    width: 100%;
    margin: 12px 8px;
    height: 310px;
  }

  &::after {
    content: '';
    inset: 0;
    position: absolute;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
  }

  figcaption {
    text-align: left;
    position: absolute;
    z-index: 3;
    inset: 0;
    padding: 18px;
    display: flex;
    padding-bottom: 39px;
    flex-direction: column;
    justify-content: flex-end;
    color: white;
  }

  h3 {
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    margin-bottom: 24px;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* number of lines to show */
    -webkit-box-orient: vertical;
    font-weight: 600;
    font-size: 14px;
    line-height: 14px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

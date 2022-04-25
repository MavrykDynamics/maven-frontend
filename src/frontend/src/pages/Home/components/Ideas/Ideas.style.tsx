import styled, { css } from 'styled-components/macro'
import { btnLightColor, headerColor, primaryColor, secondaryColor, subTextColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const IdeasSection = styled.section<{ theme: MavrykTheme }>`
  --carousel-button-indent: -100px;
  --carousel-button-bg: ${({ theme }) => theme.darkBackroundColor};
  background-image: url(${({ theme }) => theme.starsBachground}), ${({ theme }) => theme.skyGradient};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  text-align: center;
  position: relative;

  h2 {
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 45px;
    color: ${({ theme }) => theme.headerSectionsColor};

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

export const IdeasFigure = styled.figure<{ theme: MavrykTheme }>`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0;

  img {
    min-height: 50px;
    max-width: 100%;
    width: 100%;
  }
`

export const IdeasCarouselWrap = styled.div<{ theme: MavrykTheme }>`
  width: 1140px;
  margin: auto;
`

export const IdeasGroupSection = styled.div<{ theme: MavrykTheme }>`
  width: 1140px;
  max-width: 100%;
  flex-shrink: 0;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
`

export const IdeaLink = styled.a<{ theme: MavrykTheme }>`
  width: 329px;
  height: 305px;
  display: flex;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  margin: 25px;

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
    padding-bottom: 60px;
    flex-direction: column;
    justify-content: flex-end;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

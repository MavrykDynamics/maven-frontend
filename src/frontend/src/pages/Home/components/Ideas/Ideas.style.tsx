import styled, { css } from 'styled-components/macro'
import { btnLightColor, headerColor, primaryColor, secondaryColor, subTextColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const IdeasSection = styled.section<{ theme: MavrykTheme }>`
  background-image: url(${({ theme }) => theme.starsBachground}), ${({ theme }) => theme.skyGradient};
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: contain;
  text-align: center;
  position: relative;
`

export const IdeasFigure = styled.figure<{ theme: MavrykTheme }>``

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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

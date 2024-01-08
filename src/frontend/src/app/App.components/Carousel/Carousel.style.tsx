import styled from 'styled-components/macro'
import {MavenTheme} from 'utils/interfaces'

export const CarouselStyle = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
`

export const CarouselViewport = styled.div`
  overflow: hidden;
  width: 100%;
`

export const CarouselContainer = styled.div`
  display: flex;
  user-select: none;
`

export const CarouselButton = styled.button<{ theme: MavenTheme }>`
  outline: 0;
  cursor: pointer;
  background-color: var(--carousel-button-bg);
  touch-action: manipulation;
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  width: var(--carousel-button-size);
  height: var(--carousel-button-size);
  justify-content: center;
  align-items: center;
  padding: 0;
  fill: transparent;
  border-radius: 50px;
  display: flex;

  svg {
    width: 64%;
    height: 64%;
    margin-right: 0.5em;
    stroke: ${({ theme }) => theme.arrowStrokeColor};
  }

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }

  &.button--prev {
    left: var(--carousel-button-indent);
  }

  &.button--next {
    right: var(--carousel-button-indent);

    svg {
      transform: rotate(180deg);
      margin-right: 0;
      margin-left: 0.5em;
    }
  }
`

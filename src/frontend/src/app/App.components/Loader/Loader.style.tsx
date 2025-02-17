import styled, {keyframes} from 'styled-components/macro'
import {MavenTheme} from 'utils/interfaces'

export const LoaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;

  @keyframes square-animation {
    0% {
      left: 0;
      top: 0;
    }
    10.5% {
      left: 0;
      top: 0;
    }
    12.5% {
      left: 32px;
      top: 0;
    }
    23% {
      left: 32px;
      top: 0;
    }
    25% {
      left: 64px;
      top: 0;
    }
    35.5% {
      left: 64px;
      top: 0;
    }
    37.5% {
      left: 64px;
      top: 32px;
    }
    48% {
      left: 64px;
      top: 32px;
    }
    50% {
      left: 32px;
      top: 32px;
    }
    60.5% {
      left: 32px;
      top: 32px;
    }
    62.5% {
      left: 32px;
      top: 64px;
    }
    73% {
      left: 32px;
      top: 64px;
    }
    75% {
      left: 0;
      top: 64px;
    }
    85.5% {
      left: 0;
      top: 64px;
    }
    87.5% {
      left: 0;
      top: 32px;
    }
    98% {
      left: 0;
      top: 32px;
    }
    100% {
      left: 0;
      top: 0;
    }
  }
  @keyframes hue-rotate {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }

  body {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }

  .loading {
    position: relative;
    width: 96px;
    height: 96px;
    transform: rotate(45deg);
    animation: hue-rotate 10s linear infinite both;
  }

  .loading__square {
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    margin: 2px;
    border-radius: 2px;
    background: #07a;
    background-image: linear-gradient(45deg, #fa0 40%, #0c9 60%);
    background-image: -moz-linear-gradient(#fa0, #fa0);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    animation: square-animation 10s ease-in-out infinite both;
  }

  .loading__square:nth-of-type(0) {
    animation-delay: 0s;
  }

  .loading__square:nth-of-type(1) {
    animation-delay: -1.4285714286s;
  }

  .loading__square:nth-of-type(2) {
    animation-delay: -2.8571428571s;
  }

  .loading__square:nth-of-type(3) {
    animation-delay: -4.2857142857s;
  }

  .loading__square:nth-of-type(4) {
    animation-delay: -5.7142857143s;
  }

  .loading__square:nth-of-type(5) {
    animation-delay: -7.1428571429s;
  }

  .loading__square:nth-of-type(6) {
    animation-delay: -8.5714285714s;
  }

  .loading__square:nth-of-type(7) {
    animation-delay: -10s;
  }
`

export const LoaderStyledWithBackdrop = styled.div<{ theme: MavenTheme; backdropAlpha?: number }>`
  position: fixed;
  inset: 0;
  transition: background-color 0.15s ease-in-out;
  background-color: ${({ backdropAlpha }) => `rgba(8, 6, 40,  ${backdropAlpha || 0.5})`};
  display: flex;
  z-index: 12;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.valueColor};

  figcaption {
    margin-top: -30px;
  }

  img {
    width: 250px;
    height: 200px;
  }
`

const shine = keyframes`
  from {
    background-position: 200% center;
  }
`

export const LoaderShineTextAnimation = styled.div<{ theme: MavenTheme }>`
  background-image: ${({ theme }) => theme.shineAnimationGradient};
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shine} 2s linear infinite;
  font-weight: 600;
  font-size: 26px;
  text-decoration: none;
  white-space: nowrap;
`

export const SpinnerCircleLoaderStyled = styled.div<{ theme: MavenTheme }>`
  color: ${({ theme }) => theme.headerTeam};
  font-size: 20px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  transform: scale(0.1);
`

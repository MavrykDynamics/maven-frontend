import styled from 'styled-components/macro'
import { Page } from 'styles'

export const TokenomicsStyled = styled(Page)`
  text-align: center;
  margin-bottom: 150px;

  > img {
    margin-top: 20px;
    margin: auto;
  }

  @media (max-width: 700px) {
    max-width: 100vw;
  }
`

export const TokenomicsImage = styled.div<{src: string, srcMobile: string}>`
  background-image: url(${props => props.src || ""});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 520px;

  @media (max-width: 500px) {
    background-image: url(${props => props.srcMobile || ""});
  }
`

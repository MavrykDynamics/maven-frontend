import styled from 'styled-components/macro'
import { Page } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const FeaturesStyled = styled(Page)`
  text-align: center;
  margin-bottom: 200px;
`

export const FeaturesGrid = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media (max-width: 700px) {
    grid-template-columns: auto;
  }
`

export const FeaturesComponent = styled.div<{theme: MavrykTheme}>`
  background-color: ${({theme}) => theme.containerColor};
  border-radius: 10px;
  padding: 60px 30px;

  > img {
  }

  > div {
    margin-top: 30px;
    font-size: 24px;
    font-weight: bold;
    color: ${({theme}) => theme.primaryColor};
  }

  > p {
    margin-top: 20px;
    font-size: 16px;
    color: ${({theme}) => theme.subTextColor};
  }
`

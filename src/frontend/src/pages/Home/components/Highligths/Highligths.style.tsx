import styled from 'styled-components/macro'
import { Page } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const HighligthsStyled = styled.div`
  padding: 100px 0 200px 0;
  background-image: url('/images/highligths-bg.svg');
  background-position: -200px left;
  background-repeat: no-repeat;
  background-size: contain;
`

export const HighligthsContainer = styled(Page)``

export const HighligthsGrid = styled.div<{theme: MavrykTheme}>`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;

  @media (max-width: 1000px) {
    background-color: ${({theme}) => theme.backgroundColor};
    border-radius: 10px;
    grid-template-columns: auto;
    grid-gap: 15px;
  }
`

export const HighligthsSelector = styled.div<{theme: MavrykTheme}>`
  background: ${({theme}) => theme.backgroundColor};
  // box-shadow: 0 1px 0 rgb(34 37 49 / 8%), 0 8px 8px rgb(34 37 49 / 4%);
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 1000px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
`

export const HighligthsItem = styled.div<{ selected?: boolean, theme: MavrykTheme }>`
  padding: 16px 24px;
  display: grid;
  grid-template-columns: 56px auto;
  grid-gap: 30px;
  background: ${(props) => (props.selected ? ({theme}) => theme.containerColor : ({theme}) => theme.backgroundColor)};
  color: ${(props) => (props.selected ? ({theme}) => theme.litepaperLinkColor : ({theme}) => theme.subTextColor)};
  border-radius: 10px;
  cursor: pointer;
  font-size: 24px;
  line-height: 56px;
  font-weight: 500;
  text-align: left;

  moz-transition: all .4s ease-in-out;
  -o-transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  transition: all .4s ease-in-out;

  @media (max-width: 1000px) {
    padding: 16px 0;
    grid-gap: 0px;
    grid-template-columns: repeat(1, 1fr);

    > img {
      margin: auto;
    }
    > div {
      display: none;
    }
  }
`

export const HighligthsContent = styled.div`
  padding: 10px;

  > h2 {
    font-size: 32px;
    font-weight: 500;
  }

  > p {
    margin-top: 20px;
    font-size: 16px;
    line-height: 22px;
    text-align: left;
    white-space: pre-wrap;
  }
`

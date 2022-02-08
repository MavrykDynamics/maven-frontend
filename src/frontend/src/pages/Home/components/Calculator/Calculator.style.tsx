import styled from 'styled-components/macro'
import { Page } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const CalculatorStyled = styled(Page)`
  //margin-bottom: 100px;
`

export const CalculatorCointainer = styled.div<{theme: MavrykTheme}>`
  background-color: ${({theme}) => theme.containerColor};
  display: grid;
  grid-template-columns: 60% 40%;
  grid-gap: 10px;
  border-radius: 10px;

  @media (max-width: 1000px) {
    grid-template-columns: auto;
  }
`

export const CalculatorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 50px 50px 30px 50px;

  @media (max-width: 1000px) {
    grid-template-columns: auto;
  }
`

export const CalculatorGrid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
  padding: 0 50px 30px 50px;

  @media (max-width: 1000px) {
    grid-template-columns: auto;
  }
`

export const CalculatorInput = styled.div<{ shift?: boolean, theme: MavrykTheme}>`
  position: relative;

  div {
    font-size: 14px;
    line-height: 14px;
    color: ${({theme}) => theme.secondaryColor};
  }

  select,
  input {
    background: ${({theme}) => theme.backgroundColor};
    border-radius: 10px;
    border: none;
    height: 50px;
    line-height: 50px;
    width: 100%;
    padding: ${(props) => (props.shift ? '0 0 0 40px' : '0 0 0 20px')};
    margin: 8px 0;
    box-sizing: border-box;
    color: ${({theme}) => theme.primaryColor};
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
  }

  select {
    appearance: none;
    background-image: linear-gradient(45deg, transparent 50%, ${({theme}) => theme.primaryColor} 50%),
      linear-gradient(135deg, ${({theme}) => theme.primaryColor} 50%, transparent 50%);
    background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), 100% 0;
    background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
    background-repeat: no-repeat;
  }

  input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    margin-top: 27px;
    background: ${({theme}) => theme.primaryColor};
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 23px;
      height: 23px;
      border-radius: 100%;
      background: ${({theme}) => theme.secondaryColor};
      cursor: pointer;
    }
  }

  > p {
    position: absolute;
    top: 13px;
    left: 17px;
    line-height: 50px;
    color: ${({theme}) => theme.primaryColor};
    font-size: 20px;
    font-weight: bold;
  }
`

export const CalculatorResults = styled.div<{theme: MavrykTheme}>`
  background: url('./images/parallax/layer2.svg'), linear-gradient(90deg, ${({theme}) => theme.containerColor} 0%, ${({theme}) => theme.backgroundColor} 100%);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom right;
  border-radius: 0px 10px 10px 0px;
  padding: 15px 35px;
  text-align: center;

  @media (max-width: 1000px) {
    border-radius: 0 0 10px 10px;
  }
`

export const CalculatorResult = styled.div<{theme: MavrykTheme}>`
  margin-top: 30px;

  > div {
    font-size: 14px;
    line-height: 14px;
    color: ${({theme}) => theme.textColor};
    font-weight: 500;
  }

  > p {
    font-size: 50px;
    line-height: 50px;
    color: ${({theme}) => theme.textColor};
    font-weight: bold;
  }
`

export const CalculatorResultFee = styled.div<{theme: MavrykTheme}>`
  margin-top: 40px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
  color: ${({theme}) => theme.textColor};
  opacity: 0.8;
`

export const CalculatorButton = styled.div<{theme: MavrykTheme}>`
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
  color: ${({theme}) => theme.textColor};
  text-align: center;
  background-color: $${({theme}) => theme.primaryColor};
  border-radius: 25px;
  cursor: pointer;
`

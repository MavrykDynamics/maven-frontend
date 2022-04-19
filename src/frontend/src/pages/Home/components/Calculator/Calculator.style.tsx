import styled from 'styled-components/macro'
import { Page, textColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'
import { CONTAINER_WIDTH } from '../../Home.style'

export const CalculatorSection = styled.div<{ theme: MavrykTheme }>`
  background-color: ${({ theme }) => theme.darkestBackroundColor};
  padding-top: 16px;
`

export const CalculatorStyled = styled(Page)`
  width: ${CONTAINER_WIDTH};

  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 60px;
  }
`

export const CalculatorCointainer = styled.div<{ theme: MavrykTheme }>`
  background-color: ${({ theme }) => theme.darkBackroundColor};
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
  padding: 90px 50px 20px 50px;

  @media (max-width: 1000px) {
    grid-template-columns: auto;
  }
`

export const CalculatorGrid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
  padding: 0 50px 13px 50px;

  @media (max-width: 1000px) {
    grid-template-columns: auto;
  }
`

export const CalculatorInput = styled.div<{ shift?: boolean; theme: MavrykTheme }>`
  position: relative;

  div {
    font-weight: 700;
    font-size: 20px;
    line-height: 20px;
    color: ${({ theme }) => theme.labelColor};
  }

  small {
    color: ${({ theme }) => theme.labelColor};
    display: block;
    position: relative;
    bottom: -16px;
  }

  select,
  input {
    background: ${({ theme }) => theme.darkestBackroundColor};
    border-radius: 10px;
    border: none;
    line-height: 42px;
    width: 100%;
    padding: ${(props) => (props.shift ? '0 0 0 35px' : '0 0 0 20px')};
    margin: 8px 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.primaryColor};
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    border: 1px solid ${({ theme }) => theme.inputBorderColor};
  }

  select {
    appearance: none;
    background-image: linear-gradient(45deg, transparent 50%, ${({ theme }) => theme.primaryColor} 50%),
      linear-gradient(135deg, ${({ theme }) => theme.primaryColor} 50%, transparent 50%);
    background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), 100% 0;
    background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
    background-repeat: no-repeat;
  }

  input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    margin-top: 27px;
    background: ${({ theme }) => theme.backgroundColor};
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      background: ${({ theme }) => theme.sliderThumbColor};
      cursor: pointer;
    }
  }

  > p {
    position: absolute;
    top: 30px;
    left: 17px;
    line-height: 42px;
    color: ${({ theme }) => theme.primaryColor};
    font-size: 20px;
    font-weight: bold;
    margin: 0;
  }
`

export const CalculatorResults = styled.div<{ theme: MavrykTheme }>`
  background: url(${({ theme }) => theme.calculatorBackground});
  background-repeat: no-repeat;
  background-position: bottom right;
  border-radius: 0px 10px 10px 0px;
  padding: 15px 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1000px) {
    border-radius: 0 0 10px 10px;
    background: url('./images/parallax/layer2.svg'),
      linear-gradient(
        to bottom,
        ${({ theme }) => theme.containerColor} 0%,
        ${({ theme }) => theme.backgroundColor} 100%
      );
  }
`

export const CalculatorResult = styled.div<{ theme: MavrykTheme }>`
  margin-top: 0;
  margin-bottom: 28px;
  color: ${({ theme }) => theme.headerColor};

  > div {
    font-size: 11px;
    line-height: 18px;
    font-weight: 500;
  }

  > p {
    font-size: 38px;
    font-weight: bold;
    margin: 0;
  }
`

export const CalculatorResultFee = styled.div<{ theme: MavrykTheme }>`
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
  opacity: 0.8;
`

export const CalculatorButton = styled.button<{ theme: MavrykTheme }>`
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
  color: ${textColor};
  text-align: center;
  background-color: ${({ theme }) => theme.calculateBackroundColor};
  border-radius: 10px;
  cursor: pointer;
  margin: 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.darkestBackroundColor};
  padding: 0 28px;
  margin-bottom: 25px;

  svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    fill: ${({ theme }) => theme.darkestBackroundColor};
  }
`

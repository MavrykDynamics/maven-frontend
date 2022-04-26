import styled from 'styled-components/macro'
import { Page, textColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

import { CONTAINER_WIDTH } from '../../Home.style'

export const CalculatorSection = styled.div<{ theme: MavrykTheme }>`
  background-color: ${({ theme }) => theme.darkestBackroundColor};
  padding-top: 16px;
  margin-top: -1px;
`

export const CalculatorStyled = styled(Page)`
  width: ${CONTAINER_WIDTH};
  max-width: calc(100vw - 220px);

  @media (max-width: 1250px) {
    max-width: calc(100vw - 40px);
  }

  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 50px;
    line-height: 50px;
    margin-bottom: 60px;
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

export const CalculatorCointainer = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  border-radius: 15px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

export const CalculatorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 90px 50px 20px 50px;

  @media (max-width: 1000px) {
    grid-template-columns: auto;
    padding-top: 50px;
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
    white-space: nowrap;
  }

  small {
    color: ${({ theme }) => theme.inputColor};
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
    color: ${({ theme }) => theme.inputColor};
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    border: 1px solid ${({ theme }) => theme.inputBorderColor};
  }

  select {
    appearance: none;
    background-image: linear-gradient(45deg, transparent 50%, ${({ theme }) => theme.inputColor} 50%),
      linear-gradient(135deg, ${({ theme }) => theme.inputColor} 50%, transparent 50%);
    background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), 100% 0;
    background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
    background-repeat: no-repeat;
  }

  input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    margin-top: 27px;

    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      background: ${({ theme }) => theme.headingColor};
      cursor: pointer;
    }
  }

  > p {
    position: absolute;
    top: 30px;
    left: 17px;
    line-height: 42px;
    color: ${({ theme }) => theme.inputColor};
    font-size: 20px;
    font-weight: bold;
    margin: 0;
  }
`

export const CalculatorResults = styled.div<{ theme: MavrykTheme }>`
  background: url(${({ theme }) => theme.calculatorBackground});
  background-repeat: no-repeat;
  background-position: top right;
  border-radius: 0px 10px 10px 0px;
  padding: 15px 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  background-size: cover;

  @media (max-width: 1480px) {
    background-size: cover;
  }

  @media (max-width: 1000px) {
    width: 100%;
    flex-direction: row;
    border-radius: 0 0 10px 10px;
    background: url('./images/parallax/layer2.svg'),
      linear-gradient(
        to bottom,
        ${({ theme }) => theme.containerColor} 0%,
        ${({ theme }) => theme.backgroundColor} 100%
      );
  }

  @media (max-width: 500px) {
    flex-direction: column;
  }
`

export const CalculatorResult = styled.div<{ theme: MavrykTheme }>`
  margin-top: 0;
  margin-bottom: 28px;
  color: ${({ theme }) => theme.headerColor};

  @media (max-width: 1000px) {
    margin-left: 16px;
    margin-right: 16px;
    margin-bottom: 16px;
    margin-top: 16px;
  }

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

export const CalculatorControls = styled.div<{ theme: MavrykTheme }>`
  flex-shrink: 0;
  max-width: 77%;
  background-color: ${({ theme }) => theme.darkBackroundColor};
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  @media (max-width: 1000px) {
    max-width: 100%;
    border-radius: 15px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`

export const CalculatorButton = styled.button<{ theme: MavrykTheme }>`
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.btnColor};
  text-align: center;
  background-color: ${({ theme }) => theme.btnBackroundColor};
  border-radius: 10px;
  cursor: pointer;
  margin: 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 28px;
  margin-bottom: 25px;

  svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    fill: ${({ theme }) => theme.btnColor};
  }
`

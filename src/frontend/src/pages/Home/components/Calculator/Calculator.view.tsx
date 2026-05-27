import axios from 'axios'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { NATIVE_TOKEN_DISPLAY_SYMBOL, WRAPPED_BTC_DISPLAY_SYMBOL } from 'utils/tokenDisplay'

// prettier-ignore
import {
  CalculatorButton,
  CalculatorCointainer,
  CalculatorControls,
  CalculatorGrid,
  CalculatorGrid2,
  CalculatorInput,
  CalculatorResult,
  CalculatorResultFee,
  CalculatorResults,
  CalculatorSection,
  CalculatorStyled
} from './Calculator.style'

const tokenPricesDefault = {
  MVRK: 8,
  wWBTC: 50000,
  wWETH: 3500,
}

export const CalculatorView = () => {
  const [prices, setPrices] = useState(tokenPricesDefault)

  const [values, setValues] = useState({
    collateral: 'MVRK',
    amountOfCollateral: '1000',
    valueOfCollateral: '8000',
    collateralRatio: '300',
    loanAmount: Math.round(8000 * (100 / 300)).toLocaleString(),
    debt: Math.round(2667 * Math.pow(1 + 0.02 / 525600, 43800 * 12)).toLocaleString(),
  })

  useEffect(() => {
    const getPrices = async () => {
      try {
        const { data }: any = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=mavryk-network,bitcoin,ethereum&vs_currencies=usd',
        )
        const nextPrices = {
          MVRK: data['mavryk-network']?.usd ?? tokenPricesDefault.MVRK,
          wWBTC: data.bitcoin?.usd ?? tokenPricesDefault.wWBTC,
          wWETH: data.ethereum?.usd ?? tokenPricesDefault.wWETH,
        }
        setPrices(nextPrices)
        setValues({
          collateral: 'MVRK',
          amountOfCollateral: '1000',
          valueOfCollateral: (nextPrices.MVRK * 1000).toString(),
          collateralRatio: '300',
          loanAmount: '0',
          debt: '0',
        })
      } catch (error) {
        console.error('Failed to load calculator token prices', error)
      }
    }
    getPrices()
  }, [])

  const calculate = () => {
    const loanAmount = parseInt(values.valueOfCollateral) * (100 / parseInt(values.collateralRatio))
    const debt = loanAmount * Math.pow(1 + 0.02 / 525600, 43800 * 12)
    setValues({
      ...values,
      loanAmount: Math.round(loanAmount).toLocaleString(),
      debt: Math.round(debt).toLocaleString(),
    })
  }

  return (
    <CalculatorSection>
      <CalculatorStyled id="calculator">
        <h2>Calculator</h2>
        <CalculatorCointainer>
          <CalculatorControls>
            <CalculatorGrid>
              <CalculatorInput>
                <div>Collateral options</div>
                <select
                  value={values.collateral}
                  onChange={(e: any) =>
                    setValues({
                      ...values,
                      collateral: e.target.value,
                      //@ts-ignore
                      valueOfCollateral: (parseInt(values.amountOfCollateral) * prices[e.target.value]).toString(),
                    })
                  }
                >
                  <option value="MVRK">{NATIVE_TOKEN_DISPLAY_SYMBOL}</option>
                  <option value="wWBTC">{WRAPPED_BTC_DISPLAY_SYMBOL}</option>
                  <option value="wWETH" disabled title="Coming soon">
                    {NATIVE_TOKEN_DISPLAY_SYMBOL}/{WRAPPED_BTC_DISPLAY_SYMBOL} LB LP (Сoming soon)
                  </option>
                </select>
              </CalculatorInput>
              <CalculatorInput>
                <div>Amount of collateral</div>
                <input
                  type="text"
                  value={values.amountOfCollateral}
                  onChange={(e: any) =>
                    setValues({
                      ...values,
                      amountOfCollateral: e.target.value,
                      //@ts-ignore
                      valueOfCollateral: (e.target.value * prices[values.collateral]).toString(),
                    })
                  }
                />
              </CalculatorInput>
              <CalculatorInput shift>
                <div>Value of collateral</div>
                <input
                  type="text"
                  value={values.valueOfCollateral}
                  onChange={(e: any) => setValues({ ...values, valueOfCollateral: e.target.value })}
                />
                <p>$</p>
              </CalculatorInput>
            </CalculatorGrid>
            <CalculatorGrid2>
              <CalculatorInput shift>
                <div>Collateral ratio</div>
                <input
                  type="text"
                  value={values.collateralRatio}
                  onChange={(e: any) => setValues({ ...values, collateralRatio: e.target.value })}
                />
                <p>%</p>
              </CalculatorInput>
              <CalculatorInput>
                <small>Min 200%</small>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  value={values.collateralRatio}
                  onChange={(e: any) => setValues({ ...values, collateralRatio: e.target.value })}
                />
              </CalculatorInput>
            </CalculatorGrid2>
            <CalculatorGrid2>
              <div>
                <CalculatorButton onClick={() => calculate()}>
                  <svg>
                    <use xlinkHref="/icons/sprites.svg#calc" />
                  </svg>
                  Calculate
                </CalculatorButton>
              </div>
            </CalculatorGrid2>
          </CalculatorControls>
          <CalculatorResults>
            <CalculatorResult>
              <div>Loan amount available</div>
              <p>{`$${values.loanAmount}`}</p>
            </CalculatorResult>
            <CalculatorResult>
              <div>Debt after 12 months</div>
              <p>{`$${values.debt}`}</p>
              <CalculatorResultFee>Interest rate 2.0%</CalculatorResultFee>
            </CalculatorResult>
          </CalculatorResults>
        </CalculatorCointainer>
      </CalculatorStyled>
    </CalculatorSection>
  )
}

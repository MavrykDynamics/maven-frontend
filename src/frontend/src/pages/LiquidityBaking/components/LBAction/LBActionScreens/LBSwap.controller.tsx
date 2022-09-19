import { TezosToolkit } from '@taquito/taquito'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { swapCalculateCoinReceive } from 'utils/DEX/swapUtils'
import env from 'utils/env'
import { getSettings, tokenToXtzXtzOutput, xtzToTokenTokenOutput } from 'utils/DEX/DexCalcs'
import { nonNumberSymbolsValidation, parseSrtToNum, slippagePercentToValue } from 'utils/utils'
import { xtzToTzBTCSwap, tzbtcToXtzSwap } from '../helpers/swap.utils'
// @ts-ignore
import dexterCalculations from 'dexCalcs/dist/index-mobile.min'
import { State } from 'utils/interfaces'

import { Button } from 'app/App.components/Button/Button.controller'
import { CommaNumber } from 'app/App.components/CommaNumber/CommaNumber.controller'
import { ConnectWallet } from 'app/App.components/ConnectWallet/ConnectWallet.controller'
import { Input } from 'app/App.components/Input/Input.controller'
import { MinimumReceived } from 'app/App.components/LBActionBottomFields/MinimumReceived.controller'
import { PriceImpact } from 'app/App.components/LBActionBottomFields/PriceImpact.controller'
import { Slippage } from 'app/App.components/LBActionBottomFields/Slippage.contoller'

import { CustomizedText, VertInfo } from 'pages/LiquidityBaking/LiquidityBaking.styles'
import { LBActionBottomWrapperStyled } from 'app/App.components/LBActionBottomFields/LBActionBottom.style'
import { cyanColor } from 'styles'
import { ActionScreenWrapper } from '../LBAction.style'
import { Dex } from '../../../../../utils/DEX/Dex'
import { DexCalcOutput } from '../../../../../utils/DEX/DexCalcOutput'
import { swapTokenToXtz, swapXtzToToken } from '../../../../../redux/actions/swap.action'
import BigNumber from 'bignumber.js'

import * as dexter_xtz_to_token_values from '../helpers/xtz_to_token.json'

type CoinsOrderType = {
  from: 'XTZ' | 'tzBTC'
  to: 'tzBTC' | 'XTZ'
}

type CoinsInputsValues = {
  XTZ: string | number
  tzBTC: string | number
}
const DEFAULT_COINS_ORDER: CoinsOrderType = {
  from: 'XTZ',
  to: 'tzBTC',
}

const DEFAULT_COINS_AMOUNT = {
  XTZ: 0,
  tzBTC: 0,
}
type DexterXtzToTokenTestValue = {
  xtz_pool: string
  token_pool: string
  xtz_in: string
  token_out: string
  price_impact: string
}
const dexType = getSettings('liquidity')

export const LBSwap = ({ ready, dex }: { ready: boolean; dex: Dex }) => {
  const dispatch = useDispatch()
  const {
    lbData: { address, token_address },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const { accountPkh, tezos } = useSelector((state: State) => state.wallet)
  const { xtzBalance, tzBTCBalance } = useSelector((state: State) => state.user)

  const dexSettings = dex.settings('liquidityBaking')
  const [selectedSlippage, setSelectedSlippage] = useState<number>(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippagePercent, setSlippagePercent] = useState<string | number>(SLIPPAGE_TOGGLE_VALUES[0].value.toString())
  const [minReceived, setMinReceived] = useState(0)
  const [priceImpact, setPriceImpact] = useState(0)
  const [isRevertedCoins, setIsRevertedCoins] = useState<CoinsOrderType>(DEFAULT_COINS_ORDER)
  const [inputValues, setInputValues] = useState<CoinsInputsValues>(DEFAULT_COINS_AMOUNT)
  const [exchangeRate, setExchangeRate] = useState<string>('0')
  const [amountToSwap, setAmountToSwap] = useState(0)
  const dexterXtzToTokenTestValues = Object.values(dexter_xtz_to_token_values)[0]
  console.log(dexterXtzToTokenTestValues)
  const BALANCE_BY_COIN = useMemo(
    () => ({
      XTZ: xtzBalance,
      tzBTC: tzBTCBalance,
    }),
    [tzBTCBalance, xtzBalance],
  )

  useEffect(() => {
    setInputValues(DEFAULT_COINS_AMOUNT)
  }, [ready])

  const calculateTokenToXtz = (amount: number) => {
    console.log('logging input of calculateTokenToXTZ', amount)
    const convertedSlippagePercentToValue = slippagePercentToValue(slippagePercent)
    // const xtzPool = new DexCalcOutput(xtz_pool), tzBTCPool = new DexCalcOutput(token_pool)
    const amountToSwap = new DexCalcOutput({
      rpcAmount: (amount * 10 ** 8).toString() || '0',
      decimalPlaces: 8,
    })

    const { xtzPool, tokenPool } = dex.createPoolAmounts()
    console.log('logging xtz, token pools of calculateTokenToXTZ', xtzPool, tokenPool)

    const result = dex.calculateTokenToXTZ(
      amountToSwap,
      xtzPool,
      tokenPool,
      convertedSlippagePercentToValue,
      dexSettings,
    )
    console.log('logging result of calculateTokenToXTZ', result)

    const minimumXTZ = result.minimum
    const impactDouble = result.impactDouble
    const expected = result.expected
    const expectedRaw = result.expected?.internalNormalised.toFixed(result.expected?.decimalPlaces).toString()

    setInputValues({
      ...inputValues,
      tzBTC: amount,
      XTZ: parseSrtToNum(expectedRaw),
    })
    setMinReceived(minimumXTZ.internalNormalised)
    setPriceImpact(impactDouble * 100)
  }

  const calculateXtzToToken = (amount: number) => {
    console.log('logging input of calculateXtzToToken', amount)
    const convertedSlippagePercentToValue = slippagePercentToValue(slippagePercent)
    // const xtzPool = new DexCalcOutput(xtz_pool), tzBTCPool = new DexCalcOutput(token_pool)
    const amountToSwap = new DexCalcOutput({
      rpcAmount: (amount * 10 ** 6).toString() || '0',
      decimalPlaces: 6,
    })
    // @ts-ignore
    let chosenDexterXtzToTokenTestValues = dexterXtzToTokenTestValues.filter((a: any) => {
      console.log(a, a.xtz_in, String(amount * 10 ** 6), a.xtz_in === String(amount * 10 ** 6))
      return a.xtz_in === String(amount * 10 ** 6)
    })[0]
    console.log('Logging dexterXtzToTokenTestValues: ', chosenDexterXtzToTokenTestValues)
    const { xtzPool, tokenPool } = dex.createPoolAmounts()
    console.log('logging xtz, token pools of calculateXtzToToken', xtzPool, tokenPool)
    console.log(amount, xtzPool.internalBigInt.toNumber(), tokenPool.internalBigInt.toNumber())
    // @ts-ignore
    // const xtzPool = chosenDexterXtzToTokenTestValues.xtz_pool,
    //   tokenPool = chosenDexterXtzToTokenTestValues.token_pool
    // const xtzPoolDexCalcOutput = new DexCalcOutput({
    //     rpcAmount: chosenDexterXtzToTokenTestValues.xtz_pool,
    //     decimalPlaces: 6,
    //   }),
    //   tokenPoolDexCalcOutput = new DexCalcOutput({
    //     rpcAmount: chosenDexterXtzToTokenTestValues.token_pool,
    //     decimalPlaces: 8,
    //   })
    //console.log('logging xtz, token pools of calculateTokenToXTZ', xtzPool, tokenPool)

    // const result = dex.calculateXtzToToken(
    //   amountToSwap,
    //   xtzPool,
    //   tokenPool,
    //   convertedSlippagePercentToValue,
    //   dexSettings,
    // )
    const result = dex.calculateXtzToToken(
      amountToSwap,
      xtzPool,
      tokenPool,
      convertedSlippagePercentToValue,
      dexSettings,
    )
    console.log('%c logging result of dex.calculateXtzToToken', 'color: #03fcfc', result)
    // console.log(typeof xtzPool, typeof tokenPool, typeof chosenDexterXtzToTokenTestValues.xtz_in)
    // const resultFromKukaiNormal = dexterCalculations
    //   .xtzToTokenTokenOutput(chosenDexterXtzToTokenTestValues.xtz_in, xtzPool, tokenPool)
    //   ?.toNumber()
    // console.log(
    //   '%c logging result of resultFromKukaiNormal',
    //   'color: #fc03e3',
    //   chosenDexterXtzToTokenTestValues.xtz_in,
    //   xtzPool,
    //   tokenPool,
    //   resultFromKukaiNormal,
    // )
    // console.log(
    //   `%c logging comparison of tokenOut in dexCals: \ndex.calculateXtzToToken.expected.bigInt / expectedRaw / minimum: ${
    //     result.expected.internalBigInt
    //   } or ${result.expected?.internalNormalised.toFixed(result.expected?.decimalPlaces).toString()} or ${
    //     result.minimum
    //   } === token_out ${chosenDexterXtzToTokenTestValues.token_out} ? ${
    //     result.expected.internalBigInt === chosenDexterXtzToTokenTestValues.token_out
    //   }`,
    //   'color: #03fc45',
    //   resultFromKukaiNormal,
    // )
    // console.log(
    //   `%c logging comparison of PriceImpact in dexCals: \ndex.calculateXtzToToken.impactdouble: ${result.impactDouble}
    //     .toString()} === price_impact ${chosenDexterXtzToTokenTestValues.price_impact} ? ${
    //     result.impactDouble === chosenDexterXtzToTokenTestValues.price_impact
    //   }`,
    //   'color: #fc7303',
    //   resultFromKukaiNormal,
    // )
    const minimumTzBTC = result.minimum
    const impactDouble = result.impactDouble
    const expected = result.expected
    const expectedRaw = result.expected?.internalNormalised.toFixed(result.expected?.decimalPlaces).toString()
    // const minTokensBought = xtzToTokenTokenOutput(
    //   amount,
    //   xtzPool.internalNormalised,
    //   tokenPool.internalNormalised,
    //   0,
    //   0,
    //   false,
    // )

    const minTzBTCBoughtOutput1 = Number((0 * 10 ** 8).toFixed(0)),
      minTzBTCBoughtOutput2 = Number(minimumTzBTC.internalBigInt.toNumber().toFixed(0))
    console.log(
      'Logging minTokensBought from xtzToTokenTokenOutput in calculateXtzToToken: ',
      expected.internalBigInt.toNumber(),
      minTzBTCBoughtOutput2,
    )
    setInputValues({
      ...inputValues,
      tzBTC: parseSrtToNum(expectedRaw),
      XTZ: amount,
    })
    setMinReceived(minimumTzBTC.internalBigInt.toNumber())
    setPriceImpact(impactDouble)
  }

  const dynamicSwapCalculations = ({
    newSlippagePersent,
    newCoinAmountValue,
    newFromValue,
    newToValue,
  }: {
    newSlippagePersent?: string | number
    newCoinAmountValue?: string | number
    newFromValue?: 'XTZ' | 'tzBTC'
    newToValue?: 'XTZ' | 'tzBTC'
  }) => {
    const convertedSlippagePersentToValue = slippagePercentToValue(newSlippagePersent ?? slippagePercent)
    // const { expected, priceImpact, minimum } = swapCalculateCoinReceive(
    //   newFromValue || isRevertedCoins.from,
    //   newToValue || isRevertedCoins.to,
    //   parseSrtToNum(newCoinAmountValue ?? inputValues[isRevertedCoins.from]),
    //   xtz_pool,
    //   token_pool,
    //   convertedSlippagePersentToValue,
    //     dexSettings,
    // )

    // setInputValues({
    //   ...inputValues,
    //   [newFromValue || isRevertedCoins.from]: newCoinAmountValue ?? inputValues[isRevertedCoins.from],
    //   [newToValue || isRevertedCoins.to]: parseSrtToNum(expected.toFixed(5)),
    // })
    // setMinReceived(minimum)
    // setPriceImpact(priceImpact)
  }

  // handle slippage value changing
  const slippageChangeHandler = (value: string | number, isInput?: boolean) => {
    const newSlippagePercent = Number(parseSrtToNum(value) < 0 ? 0 : value)
    if (newSlippagePercent >= 0 && newSlippagePercent <= 100) {
      setSlippagePercent(value)
      dynamicSwapCalculations({ newSlippagePersent: newSlippagePercent })
    }

    if (!isInput) {
      setSelectedSlippage(parseSrtToNum(value))
    }
  }
  const creditSubsidy = (xtzPool: BigNumber | number): BigNumber => {
    const LIQUIDITY_BAKING_SUBSIDY = 2500000
    if (BigNumber.isBigNumber(xtzPool)) {
      return xtzPool.plus(new BigNumber(LIQUIDITY_BAKING_SUBSIDY))
    } else {
      return new BigNumber(xtzPool).plus(new BigNumber(LIQUIDITY_BAKING_SUBSIDY))
    }
  }

  const tokenToXtzXtzOutput = (p: {
    tokenIn: BigNumber | number
    xtzPool: BigNumber | number
    tokenPool: BigNumber | number
  }): BigNumber | null => {
    const { tokenIn, xtzPool: _xtzPool, tokenPool } = p
    let xtzPool = creditSubsidy(_xtzPool)
    let tokenIn_ = new BigNumber(0)
    let xtzPool_ = new BigNumber(0)
    let tokenPool_ = new BigNumber(0)
    try {
      let tempTokenIn = Number(tokenIn)
      console.log('loggin exponential tokenIn: ', tempTokenIn)
      tokenIn_ = new BigNumber(tokenIn)
      xtzPool_ = new BigNumber(_xtzPool)
      tokenPool_ = new BigNumber(tokenPool)
    } catch (err) {
      return null
    }
    if (tokenIn_.isGreaterThan(0) && xtzPool_.isGreaterThan(0) && tokenPool_.isGreaterThan(0)) {
      // Includes 0.1% fee and 0.1% burn calculated separately:
      // 999/1000 * 999/1000 = 998001/1000000
      let numerator = new BigNumber(tokenIn).times(new BigNumber(_xtzPool)).times(new BigNumber(998001))
      let denominator = new BigNumber(tokenPool)
        .times(new BigNumber(1000000))
        .plus(new BigNumber(tokenIn).times(new BigNumber(999000)))
      const minReceived = numerator.dividedBy(denominator)
      setMinReceived(minReceived.toNumber())
      console.log(minReceived)
      setInputValues({
        ...inputValues,
        tzBTC: Number(Number(tokenIn).toFixed(8)),
        XTZ: Number(Number(minReceived).toFixed(6)),
      })

      return minReceived
    } else {
      return null
    }
  }

  const xtzToTokenTokenOutput = (p: {
    xtzIn: BigNumber | number
    xtzPool: BigNumber | number
    tokenPool: BigNumber | number
  }): BigNumber | null => {
    let { xtzIn, xtzPool: _xtzPool, tokenPool } = p

    let xtzPool = creditSubsidy(_xtzPool)
    let xtzIn_ = new BigNumber(0)
    let xtzPool_ = new BigNumber(0)
    let tokenPool_ = new BigNumber(0)
    try {
      xtzIn_ = new BigNumber(xtzIn)
      xtzPool_ = new BigNumber(_xtzPool)
      tokenPool_ = new BigNumber(tokenPool)
    } catch (err) {
      return null
    }
    console.log('Logging XTZ in: ', xtzIn_)
    console.log('Logging XTZ Pool: ', _xtzPool)
    console.log('Logging Token Pool: ', tokenPool_.toNumber())
    if (xtzIn_.isGreaterThan(0) && xtzPool_.isGreaterThan(0) && tokenPool_.isGreaterThan(0)) {
      // Includes 0.1% fee and 0.1% burn calculated separately: 999/1000 * 999/1000 = 998100/1000000
      // (xtzIn_ * tokenPool_ * 999 * 999) / (tokenPool * 1000 - tokenOut * 999 * 999)
      const numerator = xtzIn_.times(tokenPool_).times(new BigNumber(998100))
      const denominator = xtzPool_.times(new BigNumber(1000000)).plus(xtzIn_.times(new BigNumber(998100)))
      const minReceived = numerator.dividedBy(denominator)
      setMinReceived(minReceived.toNumber())
      setInputValues({
        ...inputValues,
        tzBTC: Number(minReceived),
        XTZ: Number(xtzIn),
      })
      return minReceived
    } else {
      return null
    }
  }

  // handling dynamic filling second input on input change
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    let { name, value } = e.target
    if (+value < 0 || (ready && +value > (name === 'XTZ' ? xtzBalance : tzBTCBalance))) return

    const isTypingBottomInput = name === isRevertedCoins.to

    if (isTypingBottomInput) {
      setIsRevertedCoins({
        from: isRevertedCoins.to,
        to: isRevertedCoins.from,
      })
    }

    const { xtzPool, tokenPool } = dex.createPoolAmounts()

    if (name === 'XTZ') {
      const amountToSwap = parseFloat(value) * 10 ** 6
      setAmountToSwap(amountToSwap)
      console.log(
        'Here in swap to XTZ to Token',
        // amountToSwap,
        // xtzPool.internalNormalised,
        // tokenPool.internalNormalised,
      )
      // xtzToTokenTokenOutput({ xtzIn: parseFloat(value), xtzPool: xtz_pool, tokenPool: token_pool })
      calculateXtzToToken(parseFloat(value))
      // xtzToTokenTokenOutput({
      //   xtzIn: parseFloat(value),
      //   xtzPool: xtzPool.internalNormalised,
      //   tokenPool: tokenPool.internalNormalised,
      // })
    } else {
      const amountToSwap = parseFloat(value) * 10 ** 8
      setAmountToSwap(amountToSwap)
      console.log('Here in swap Token to XTZ', amountToSwap)

      // tokenToXtzXtzOutput({ tokenIn: parseFloat(value), xtzPool: xtz_pool, tokenPool: token_pool })
      tokenToXtzXtzOutput({
        tokenIn: parseFloat(value),
        xtzPool: xtzPool.internalNormalised,
        tokenPool: tokenPool.internalNormalised,
      })
    }
    // dynamicSwapCalculations({
    //   newCoinAmountValue: value,
    //   newFromValue: isTypingBottomInput ? isRevertedCoins.to : isRevertedCoins.from,
    //   newToValue: isTypingBottomInput ? isRevertedCoins.from : isRevertedCoins.to,
    // })
  }

  // performing swap for xtz=>tzBTC & tzBTC=>xtz
  const swapBtnHandler = async () => {
    if (!accountPkh) return
    try {
      const lbContract = await tezos?.wallet.at(address)
      const deadline = new Date(Date.now() + 60000).toISOString()

      // if XTZ => tzBTC perform %xtzToToken
      if (isRevertedCoins.from === 'XTZ' && isRevertedCoins.to === 'tzBTC') {
        try {
          // await xtzToTzBTCSwap({
          //   dex,
          //   token_pool,
          //   xtz_pool,
          //   deadline,
          //   lbContract,
          //   xtzAmount: inputValues.XTZ,
          //   slippage: slippagePercent,
          //   accountAddress: accountPkh,
          // })
          console.log('%c Here before calling %dispatch(swapXtzToToken(amountToSwap))', 'color: #bada55')
          console.log(`Printing amountToSwap: ${typeof minReceived}`)
          dispatch(swapXtzToToken(minReceived))
        } catch (e: any) {
          console.error('swap XTZ => tzBTC error', e.message)
        }
      }

      // if tzBTC => XTZ perform %tokenToXtz
      if (isRevertedCoins.from === 'tzBTC' && isRevertedCoins.to === 'XTZ') {
        try {
          const tzBtcContract = await tezos?.wallet.at(token_address)
          const Tezos = tezos
          // await tzbtcToXtzSwap({
          //   dexType,
          //   token_pool,
          //   xtz_pool,
          //   deadline,
          //   lbContract,
          //   Tezos,
          //   tzBtcContract,
          //   tzBTCAmount: inputValues.XTZ,
          //   slippage: slippagePercent,
          //   accountAddress: accountPkh,
          // })
          console.log('%c Here before calling %dispatch(swapTokenToXtz(amountToSwap, minReceived))', 'color: #bada55')
          console.log(`Printing amountToSwap: ${amountToSwap}, minReceived: ${minReceived}`)
          dispatch(swapTokenToXtz(amountToSwap, minReceived))
        } catch (e: any) {
          console.error('swap tzBTC => XTZ error', e.message)
        }
      }

      setInputValues({
        XTZ: 0,
        tzBTC: 0,
      })
    } catch (e: any) {
      console.error('swapBtnHandler initializing params error', e.message)
    }
  }

  // handling use max button
  const maxHandler = useCallback(
    (from: 'XTZ' | 'tzBTC', to: 'tzBTC' | 'XTZ') => {
      setIsRevertedCoins({
        from,
        to,
      })

      dynamicSwapCalculations({
        newCoinAmountValue: BALANCE_BY_COIN[from],
        newFromValue: from,
        newToValue: to,
      })
    },
    [BALANCE_BY_COIN, inputValues, slippagePercent],
  )

  return (
    <ActionScreenWrapper className="swap">
      <div className={`exchange-block ${isRevertedCoins.from !== 'XTZ' ? 'reverted' : ''}`}>
        <CustomizedText>XTZ</CustomizedText>
        <svg
          onClick={() =>
            setIsRevertedCoins({
              from: isRevertedCoins.to,
              to: isRevertedCoins.from,
            })
          }
        >
          <use xlinkHref="/icons/sprites.svg#exchange" />
        </svg>
        <CustomizedText>tzBTC</CustomizedText>
      </div>

      <div className={`input-wrapper ${isRevertedCoins.from !== 'XTZ' ? 'reverted' : ''}`}>
        <Input
          placeholder={''}
          name="XTZ"
          onChange={inputChangeHandler}
          type={'number'}
          kind={'LB'}
          value={inputValues.XTZ}
          convertedValue={parseSrtToNum(inputValues.XTZ) * coinPrices.tezos.usd}
          icon={'XTZ_tezos'}
          pinnedText={'XTZ'}
          useMaxHandler={() => maxHandler('XTZ', 'tzBTC')}
          userBalance={xtzBalance}
          onKeyDown={nonNumberSymbolsValidation}
          onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
          onBlur={() => {
            if (inputValues.XTZ === '') {
              setInputValues({
                ...inputValues,
                XTZ: 0,
              })
            }
          }}
          onFocus={() => {
            if (parseSrtToNum(inputValues.XTZ) === 0) {
              setInputValues({
                ...inputValues,
                XTZ: '',
              })
            }
          }}
        />

        <svg
          onClick={() =>
            setIsRevertedCoins({
              from: isRevertedCoins.to,
              to: isRevertedCoins.from,
            })
          }
        >
          <use xlinkHref="/icons/sprites.svg#exchange" />
        </svg>

        <Input
          placeholder={''}
          name="tzBTC"
          onChange={inputChangeHandler}
          type={'tel'}
          kind={'LB'}
          value={inputValues.tzBTC}
          convertedValue={parseSrtToNum(inputValues.tzBTC) * coinPrices.tzbtc.usd}
          icon={'tzBTC'}
          pinnedText={'tzBTC'}
          useMaxHandler={() => maxHandler('tzBTC', 'XTZ')}
          userBalance={tzBTCBalance}
          onKeyDown={nonNumberSymbolsValidation}
          onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
          onBlur={() => {
            if (inputValues.tzBTC === '') {
              setInputValues({
                ...inputValues,
                tzBTC: 0,
              })
            }
          }}
          onFocus={() => {
            if (parseSrtToNum(inputValues.tzBTC) === 0) {
              setInputValues({
                ...inputValues,
                tzBTC: '',
              })
            }
          }}
        />
      </div>

      {ready ? (
        <Button text={'Swap'} icon={'swapBtnIcon'} onClick={swapBtnHandler} className="swap_btn LB" kind={PRIMARY} />
      ) : (
        <ConnectWallet className="swap-action" />
      )}

      <VertInfo>
        <CustomizedText fontWidth={500}>Exchange Rate</CustomizedText>

        <CustomizedText color={cyanColor} fontWidth={500}>
          1 XTZ (<CommaNumber beginningText="$" value={coinPrices.tezos.usd} /> ) = &nbsp;
          <CommaNumber
            value={coinPrices.tezos.usd / coinPrices.tzbtc.usd}
            showDecimal
            decimalsToShow={8}
            endingText="tzBTC"
          />
        </CustomizedText>
      </VertInfo>

      <LBActionBottomWrapperStyled>
        <PriceImpact priceImpact={priceImpact} />
        <MinimumReceived minimumReceived={[{ value: minReceived, tokenName: isRevertedCoins.to }]} />
        <Slippage
          onClickHandler={(value) => slippageChangeHandler(value, false)}
          selectedToogle={selectedSlippage}
          setSlippagePersent={setSlippagePercent}
          slippagePersent={slippagePercent}
        />
      </LBActionBottomWrapperStyled>
    </ActionScreenWrapper>
  )
}

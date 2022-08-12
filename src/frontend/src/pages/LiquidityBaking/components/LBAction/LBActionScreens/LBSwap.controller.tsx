import { TezosToolkit } from '@taquito/taquito'
import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { PRIMARY } from 'app/App.components/Button/Button.constants'
import { ENVIRONMENT } from 'utils/consts'
import { getSettings, SLIPPAGE_TOGGLE_VALUES } from '../helpers/const'
import { swapCalculateCoinReceive } from 'pages/LiquidityBaking/components/LBAction/helpers/swapUtils'
import { tokenToXtzMinimumXtzOutput, tokenToXtzXtzOutput, xtzToTokenMinimumTokenOutput, xtzToTokenTokenOutput } from 'utils/DexSwapCalcs'

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

type CoinsOrderType = {
  from: 'XTZ' | 'tzBTC'
  to: 'tzBTC' | 'XTZ'
}

const dex = getSettings('liquidity')

export const LBSwap = ({ ready }: { ready: boolean }) => {
  const {
    lbData: { xtz_pool, token_pool, address, token_address },
    coinPrices,
  } = useSelector((state: State) => state.tokens)
  const { accountPkh } = useSelector((state: State) => state.wallet)
  const { xtzBalance, tzBTCBalance } = useSelector((state: State) => state.user)

  const [selectedSlippage, setSelectedSlippage] = useState<number>(SLIPPAGE_TOGGLE_VALUES[0].value)
  const [slippageValue, setSlippageValue] = useState<number | string>(SLIPPAGE_TOGGLE_VALUES[0].value)

  const [minReceived, setMinReceived] = useState(0)
  const [priceImpact, setPriceImpact] = useState(0)

  const [isRevertedCoins, setIsRevertedCoins] = useState<CoinsOrderType>({ from: 'XTZ', to: 'tzBTC' })
  const [inputValues, setInputValues] = useState({ XTZ: 0, tzBTC: 0 })

  const BALANCE_BY_COIN = useMemo(
    () => ({
      XTZ: xtzBalance,
      tzBTC: tzBTCBalance,
    }),
    [tzBTCBalance, xtzBalance],
  )

  // handling dynamic filling second input on input change
  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: number | string } },
  ) => {
    const { name, value = 0 } = e.target;

    // old calculations
    // const receiveInputValue = swapCalculateCoinReceive(isRevertedCoins.from, isRevertedCoins.to, Number(value), {
    //   xtzPool: xtz_pool,
    //   tokenPool: token_pool,
    // })

    const { expected, priceImpact, minimum } = swapCalculateCoinReceive(
      isRevertedCoins.from,
      isRevertedCoins.to,
      Number(value),
      xtz_pool,
      token_pool,
      +slippageValue,
      dex,
    )

    setInputValues({
      ...inputValues,
      [isRevertedCoins.to]: expected.toFixed(5),
      [name]: value,
    })
    setMinReceived(minimum)
    setPriceImpact(priceImpact)
  }

  // performing swap for xtz=>tzBTC & tzBTC=>xtz
  const swapBtnHandler = async () => {
    // init data we need to perform swap
    const Tezos = new TezosToolkit(ENVIRONMENT.rpcLink)
    const lbContract = await Tezos.wallet.at(address)
    const deadline = new Date(Date.now() + 60000).toISOString()

    // if XTZ => tzBTC perform %xtzToToken
    if (isRevertedCoins.from === 'XTZ' && isRevertedCoins.to === 'tzBTC') {
      const expected = xtzToTokenTokenOutput(
        inputValues.XTZ,
        xtz_pool,
        token_pool,
        dex.fee,
        dex.burn,
        dex.includeSubsidy,
      )

      if (expected) {
        const minTokensBought = xtzToTokenMinimumTokenOutput(expected, +slippageValue)
        const op = await lbContract.methods.xtzToToken(accountPkh, minTokensBought, deadline).send()
        await op.confirmation()
      }
    }

    // if tzBTC => XTZ perform %tokenToXtz
    if (isRevertedCoins.from === 'tzBTC' && isRevertedCoins.to === 'XTZ') {
      const tzBtcContract = await Tezos.wallet.at(token_address)

      const expected = tokenToXtzXtzOutput(
        inputValues.tzBTC,
        xtz_pool,
        token_pool,
        dex.fee,
        dex.burn,
        dex.includeSubsidy,
      )

      if (expected) {
        const minXtzBought = tokenToXtzMinimumXtzOutput(expected, +slippageValue)

        const batch = Tezos.wallet
          .batch()
          .withContractCall(tzBtcContract.methods.approve(address, 0))
          .withContractCall(tzBtcContract.methods.approve(address, inputValues.tzBTC))
          .withContractCall(lbContract.methods.tokenToXtz(accountPkh, inputValues.tzBTC, minXtzBought, deadline))
        const batchOp = await batch.send()
        await batchOp.confirmation()
      }
    }

    setInputValues({
      XTZ: 0,
      tzBTC: 0,
    })
  }

  // handling use max button
  const maxHandler = useCallback(
    (from: 'XTZ' | 'tzBTC', to: 'tzBTC' | 'XTZ') => {
      setIsRevertedCoins({
        from,
        to,
      })

      const { expected, priceImpact, minimum } = swapCalculateCoinReceive(
        from,
        to,
        BALANCE_BY_COIN[from],
        xtz_pool,
        token_pool,
        +slippageValue,
        dex,
      )

      setInputValues({
        ...inputValues,
        [to]: expected,
        [from]: BALANCE_BY_COIN[from],
      })
      setMinReceived(minimum)
      setPriceImpact(priceImpact)
    },
    [BALANCE_BY_COIN, dex, inputValues, slippageValue, token_pool, xtz_pool],
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
          convertedValue={inputValues.XTZ * coinPrices.tezos.usd}
          icon={'XTZ_tezos'}
          pinnedText={'XTZ'}
          useMaxHandler={() => maxHandler('XTZ', 'tzBTC')}
          userBalance={xtzBalance}
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
          type={'number'}
          kind={'LB'}
          value={inputValues.tzBTC}
          convertedValue={inputValues.tzBTC * coinPrices.tzbtc.usd}
          icon={'tzBTC'}
          pinnedText={'tzBTC'}
          useMaxHandler={() => maxHandler('tzBTC', 'XTZ')}
          userBalance={tzBTCBalance}
        />
      </div>

      {ready ? (
        <Button text={'Swap'} icon={'swapBtnIcon'} onClick={swapBtnHandler} className="swap_btn" kind={PRIMARY} />
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
        <MinimumReceived minimumRecived={[{ value: minReceived, tokenName: isRevertedCoins.to }]} />
        <Slippage onClickHandler={(value: number) => {
          setSelectedSlippage(value)
          setSlippageValue(value === -1 ? 0 : value)
        }} selectedToogle={selectedSlippage} />
        {selectedSlippage === -1 ? 
        <Input
          placeholder={'Slippage'}
          name="slippageInput"
          kind='primary'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target
            if((+value >= 0 && +value <= 100) || value === ''){
              setSlippageValue(value)
            }
          }}
          type={'number'}
          value={slippageValue}
        /> : null}
      </LBActionBottomWrapperStyled>
    </ActionScreenWrapper>
  )
}

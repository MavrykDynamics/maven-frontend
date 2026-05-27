import { FaqItem, LBFAQStyled } from './FAQ.style'
import { NATIVE_TOKEN_DISPLAY_SYMBOL, WRAPPED_BTC_DISPLAY_SYMBOL } from 'utils/tokenDisplay'

const LBFAQ = () => {
  return (
    <LBFAQStyled id="FAQ-block">
      <FaqItem>
        <h2>What is Liquidity Baking DEX (Sirius)?</h2>
        <p>
          Liquidity Baking (LB) is a protocol level DeFi feature of the Mavryk blockchain. LB is a stand-alone DEX which
          features a trading pair between {NATIVE_TOKEN_DISPLAY_SYMBOL}/{WRAPPED_BTC_DISPLAY_SYMBOL} (wrapped Bitcoin),
          and incentivized directly by the Mavryk protocol. By providing liquidity to the DEX, you earn newly minted{' '}
          {NATIVE_TOKEN_DISPLAY_SYMBOL} as yield, along with trading fees.
        </p>
      </FaqItem>

      <FaqItem>
        <h2>Where are the rewards from? Is it sustainable?</h2>
        <p>
          Mavryk is a Liquid Proof of Stake protocol which features an annual inflation rate to reward securing the
          network (5.5%) and incentivizing Liquidity Baking (0.3%), for a total of 5.8%. Liquidity Baking provides a
          sustainable yield model, where 2.5 {NATIVE_TOKEN_DISPLAY_SYMBOL} is minted every block (30 seconds), and
          deposited into the DEX to incentivize liquidity providers. The DEX has a trading fee of 0.2% per transaction,
          where half of the fee goes to liquidity providers, and the other half is burned.
        </p>
      </FaqItem>

      <FaqItem last>
        <h2>Where can I read more about Liquidity Baking?</h2>
        <a
          href="https://protocol.mavryk.org/alpha/liquidity_baking.html"
          target="_blank"
          rel="noreferrer"
        >
          Mavryk protocol Liquidity Baking
        </a>
        <a href="https://documentation.mavryk.org/" target="_blank" rel="noreferrer">
          OpenMavryk documentation
        </a>
      </FaqItem>
    </LBFAQStyled>
  )
}

export default LBFAQ

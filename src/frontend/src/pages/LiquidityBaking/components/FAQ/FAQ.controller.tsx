import { FaqItem, LBFAQStyled } from './FAQ.style'

const LBFAQ = () => {
  return (
    <LBFAQStyled id="FAQ-block">
      <FaqItem>
        <h2>What is Liquidity Baking DEX (Sirius)?</h2>
        <p>
          Liquidity Baking (LB) is a protocol level DeFi feature of the Tezos blockchain. LB is a stand-alone DEX which
          features a trading pair between XTZ/tzBTC (wrapped Bitcoin), and incentivized directly by the Tezos protocol.
          By providing liquidity to the DEX, you earn newly minted XTZ as yield, along with trading fees.
        </p>
      </FaqItem>

      <FaqItem>
        <h2>Where are the rewards from? Is it sustainable?</h2>
        <p>
          Tezos is a (Liquid) Proof of Stake protocol which features an annual inflation rate to reward securing the
          network (5.5%) and incentivizing Liquidity Baking (0.3%), for a total of 5.8%. Liquidity Baking provides a
          sustainable yield model, where 2.5 XTZ is minted every block (30 seconds), and deposited into the DEX to
          incentivize liquidity providers. The DEX has a trading fee of 0.2% per transaction, where half of the fee goes
          to liquidity providers, and the other half is burned.
        </p>
      </FaqItem>

      <FaqItem last>
        <h2>Where can I read more about Liquidity Baking?</h2>
        <a
          href="https://news.tezoscommons.org/liquidity-baking-bridging-deep-liquidity-for-tez-3a3a21ccc3b4"
          target="_blank"
          rel="noreferrer"
        >
          Great article by Tezos Commons & Arthur Breitman
        </a>
        <a href="https://tezos.gitlab.io/alpha/liquidity_baking.html" target="_blank" rel="noreferrer">
          Liquidity Baking documentation
        </a>
      </FaqItem>
    </LBFAQStyled>
  )
}

export default LBFAQ

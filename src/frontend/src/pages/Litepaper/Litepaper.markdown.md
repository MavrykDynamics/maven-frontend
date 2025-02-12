# Maven Finance Litepaper

## Abstract

Maven Finance is a decentralized, non-custodial, community-governed banking platform that gives users independent control of their finances. Maven Finance enables users to earn secure yields on their assets, and free the equity trapped in their assets, without requiring the involvement of third parties such as banks.

Additionally, Maven Finance is a community-governed entity and rewards stakeholder participation for passive or active governance, providing on-chain data by signing oracle price feeds, and supplying assets to Maven Finance’s p2p lending pool, in order to bring stability and prosperity to the platform.

Maven Finance’s mission is to launch a suite of decentralized finance products designed to bring financial freedom to all of its users and to bridge the gap between on-chain finance and real world assets.

## Problem

Borrowing money from financial institutions can be difficult and slow: borrowers may face hidden fees, high interest, penalties, and long paperwork which can make access to financial services expensive, or even impossible.

Banks are not always incentivized to innovate, provide lending quickly, or serve marginalized populations. They can and do display rent-seeking behavior and conflicts of interest. As a result, opportunities to create wealth have tended to be concentrated with incumbents, which is not only unjust but also has been and continues to be a missed economic opportunity on a global scale.

**Technology creates new possibilities for fairer capitalism that innovates away from legacy finance, with platforms that offer true and widespread financial freedom, opportunity, and transparency.**

## Solution

Maven Finance offers an innovative approach to finance, and is cooperatively operated & independent of legacy banks. In technical terms, Maven Finance is a Decentralized Autonomous Organization (**DAO**) with:

- Non-custodial peer-2-peer lending
- Integrated & decentralized pricing oracles
- A decentralized and upgradable governance system modeled after Proof-of-Stake (PoS)

While the applications for such a system are nearly infinite, we *start* in practice with *one specific use case*: borrowing known stablecoins & assets against a multi-asset collateral.

To this end, Maven Finance introduces peer-2-peer stablecoin & asset lending of well-known digital assets: **USDT**, **MVRK**, and **wBTC** which can be borrowed by depositing assets as collateral in a multi-asset, non-custodial vault.

Notably:

- *Maven Finance is trustless and decentralized*: A loan against assets held in a vault is issued, maintained, and repaid using transparent, trustless, and decentralized smart contracts running on a blockchain.
- *Maven Finance is inherently multi-asset*: Users can diversify the security of their loan by depositing a basket of assets into a single vault.
- Supplying stablecoins to Maven Finance’s lending pools *can generate passive income*. Users can also leverage their positions, and practice *yield farming*.[^(1)]

[^(1)]: [Yield farming](https://coinmarketcap.com/alexandria/article/what-is-yield-farming) corresponds to earning interest on a deposit like in a bank.

Maven Finance uses [decentralized oracles](#satellites-governance-and-the-decentralized-oracle) to ensure that users' collateral remains free from centralized control and manipulation. Following a model inspired by Proof of Stake’s innovative delegated governance models, Maven Finance allows stakeholders to delegate their governance tokens (**MVN**s) to nodes called *Satellites*, who vote on governance proposals and sign price feeds on stakeholders' behalf. For doing this they earn rewards which are passed back (minus a satellite fee) to the delegating stakeholders.[^(2)]

[^(2)]: MVN is the governance token for Maven Finance. It is used to operate a Satellite, delegate voting power, and is the payment token that Satellites receive for signing price feeds. More on this [here](#MVN-and-sMVN-doorman-module).

## Multi-Asset Backed Loans

Stablecoins are secure and convenient means of payment for goods and services in the context of a crypto-asset portfolio. Maven Finance allows its users to put up existing crypto-assets as collateral for a stablecoin loan in assets such as USDT, up to a 50% loan-to-value ratio (**LTV**). For this, we are using a peer-2-peer lending model, where the liquidity for borrowing is provided by user’s seeking to earn yield by lending.

However:

- There is no capital gains tax
- There is no opportunity cost on any upside potential of the underlying crypto-asset collateral. In other words: the value that your underlying collateral generates while in the vault will still accrue to you as its owner

*Working example: You deposit crypto-assets priced at 10M USD into a vault. You borrow up to 5M USDT tokens, with which to transact. A week later, your transactions are complete and your crypto-asset is now priced at 11M USD. You return the 5M USDT (plus interest) and recover your assets from the vault. You do not pay capital gains tax, and you recover the collateral in full even though it is worth more in USD than when you put it in (Always make sure to check your local laws)*

Maven Finance loans can be issued against a single asset (single collateral) or a more complex multi-asset basket (multi-collateral). This enables sophisticated risk & return management techniques.[^(3)]

[^(3)]: In contrast with ["HODL"](https://academy.binance.com/en/glossary/hodl) -ing assets, which are limited to one asset at a time.

You can take out a loan by depositing a single/multi-asset collateral into a vault in what is called a **Collateralized Debt Position** (**CDP**).[^(4)] Vaults are over-collateralized by at least 200% collateral to the requested loan value (=50% LTV).[^(5)] Borrowers can increase their borrowed positions up to the point when they hit the collateralization ceiling.

[^(4)]: _CDP_ is a term originating in the cryptocurrency community for a loan that is collateralized by crypto and usually in connection with an algorithmic stablecoin loan.
[^(5)]: 50% loan-to-value means that there is double the amount of collateral relative to the borrowed amount. This means exactly the same as being 200% over-collateralized. If the loan is 33% LTV, it would be 300% over-collateralized. The higher the collateralization rate, the more secure the loan is against being liquidated in foreclosure due to price movements of the (possibly volatile) underlying crypto used as collateral.

**_The system does not allow you to obtain a loan that would be lower than the required collateralization ratio, i.e., you can borrow up to half the value of the underlying assets. It is highly recommended to healthily over-collateralize the loan, to avoid [liquidations](#liquidations) in the event of a sudden price movement!_**

_For example: Bob deposits $3,000 worth of wBTC to collateralize a vault, and borrows $1,000 USDT. Bob’s loan is 300% collateralized, and considered an active “healthy” vault. The maximum Bob would be able to borrow is $1,500._

### Peer-2-Peer Lending

The Maven Finance lending module works in a p2p structure. Users (Lenders) supply assets for other users (borrowers) to borrow using their crypto-assets as collateral in multi-collateral, non-custodial vaults.

### Lending: Earning Yield on Your Assets

Lenders can supply assets; USDT, MVRK, & wBTC to lending pools and earn interest. Upon supplying assets to the lending pools, a lender will receive an mToken in return that is a 1-1 representation of their share of the lending pool, such as mUSDT or mMVRK. These tokens can be staked in Maven Finance’s Yield Farms, further increasing their yield, or traded/sold on the open market. These tokens are the ticket for reimbursement of the original deposit into the lending pool and for claiming lending rewards.

*For example: Alice supplies 25,000 USDT to the Maven Finance USDT lending pool. She will receive 25,000  mUSDT which she can keep in her wallet, stake in Maven Finance Farms, or trade/sell on the open market. If she chooses to sell/trade her mUSDT tokens, she will be forfeiting the tokens she deposited into the pools (per the amount she sold) and from receiving the rewards for her deposits as she is selling her rights to the new buyer.*

### Borrowing: Single & Multi-Collateral Vaults

Borrowers can borrow assets; (ex. USDT, MVRK) from Maven Finance’s lending pools and are charged an interest rate on their loans, and a one-time admin origination fee. To borrow from the Maven Finance lending pools, borrowers must open a vault and deposit collateral in them. Upon supplying collateral to a vault, users will be able to borrow a supported asset of their choice (one loaned asset type per vault) with up to a minimum 200% collateral relative to borrowed assets (in dollar value). Our vaults support the ability to deposit multiple types of collateral to back a single loan. Additionally, vaults only support a single asset type to be borrowed, if a user wishes to borrow two different assets (ex. borrowing USDT & MVRK) they must open separate vaults.

*For example: Bob wants to borrow 1,000 USDT so he deposits 3,000 MVRK (~ $3,000 @ $1/MVRK) into a vault he creates. Upon depositing the MVRK into the vault, Bob is able to withdraw up to 1,500 USDT from the lending pools. The interest Bob will pay is in USDT. Once Bob repays the loan and interest, he will be able to withdraw the collateral in his vault.*

Note 1: Deposited MVRK in personal vaults may be delegated to a Bakery of your choice, and the earned baking rewards accrue to the vault, and contribute to the vaults collateral ratio.

Note 2: sMVN collateralized in vaults may be delegated to Satellites. However, sMVN collateralization will not be supported at Genesis, and will be voted in via Governance.

### Multi-Collateral Vaults

The Maven Finance platform allows users to open multi-collateral vaults for the same loan asset type, while ensuring that the collateral to loan ratio stays above the required 200% ratio (collateral to the loan in dollar value). A user is allowed to open a vault and deposit multiple asset types as collateral for their loans. At launch, Maven Finance will accept MVRK, wBTC, USDT, and mTokens as supported assets for collateral. A user is also able to open a vault with one asset as collateral, and later add multiple assets to increase their collateral. However, only one loaned asset per vault is allowed. A user is not able to open a vault and use the collateral they deposited into that vault to borrow different assets. In order to borrow different assets, they will need to open a vault for each type of asset they wish to borrow.

*Example 1: Alice borrows 1,000 USDT by depositing the required amount of MVRK as collateral. Later, she sees that the value of MVRK has dropped and needs to add more collateral to avoid liquidation. Alice realizes she does not have more MVRK but does have wBTC, so she deposits wBTC into the USDT vault to increase the collateral ratio. Her vault now has two forms of collateral (MVRK & wBTC) securing her USDT loan. The loan interest for this vault is in USDT.*

*Example 1, Continued: Alice decides that she wants to borrow MVRK. As the vault she originally opened was for USDT, she must open a new vault for MVRK. Alice opens a new MVRK vault and deposits $3,000 of wBTC as collateral, and then borrows $800 worth of MVRK. The loan interest for this vault is in MVRK.*

### Liquidations

A CDP (AKA “vaults”) that falls below the required collateralization ratio (200%) is susceptible to liquidation by a 3rd party user of the platform, in which the repayment of the at risk loan is conducted by the liquidator buying out the collateral from the vault. There are different collateralization ratio status’ for the vaults to asses risk and liquidation events.

- **Low Risk**: The collateral ratio is above 200%, and the user may borrow/withdraw up to the maximum allowable capacity.
- **At Risk**: The collateral ratio is below 200% but above 150%. The user will not be able to borrow or withdraw from the vault, but the vault is not yet liquidatable. It is recommended to increase collateral or repay part of the debt to avoid liquidation below 150%.
- **Mark For Liquidation/Grace Period**: The collateral has fallen below 150%, and any user may then mark the vault for liquidation. Once marked for liquidation, there is a grace period of two hours before the vault may be liquidated.
- **Liquidatable**: The vault collateral is below 150%, marked for liquidation, and the grace period is over. Any user may liquidate the vault by repaying up to 50% of the vaults debt, and receive a 10% reward relative to the liquidated debt.

A vault is liquidatable when it is under-collateralized below the liquidation ratio set in the Lending Controller contract (set by DAO Governance). Before a vault may be liquidated, it will have to be “Marked For Liquidation” by any user of the platform once the collateral falls below the liquidation ratio. After a vault has been marked for liquidation, there will be a grace period (ex. 2 hours, set by governance) where the vault owner has the ability to provide additional collateral to the vault or repay their debt such that it no longer is under-collateralized. After the grace period is over, the vault will be open for liquidation from any user wishing to repay up to 50% the vaults debt, for up to the maximum duration set by governance (ex. 24 hours).

There is a maximum amount that may be liquidated from an at-risk vault, “maxVaultLiquidationPercent,” that can be liquidated during each liquidation window (ex. 50% of the vault’s debt within 24 hours). A liquidator will receive a liquidation fee reward, “liquidationFeePercent”, for liquidating a vault; which is paid for by the vault owner as a penalty. This incentive/penalty amount will initially be set at Genesis at 10%, but may also be adjusted by governance. If a vault has multiple collateral tokens, the reward amount of tokens will be based on their proportional amounts in the vault.

An admin liquidation fee will also be paid to the DAO Treasury whenever a liquidation occurs, and will be based as a percentage of the liquidated amount of debt.

Note: A user will not be able to liquidate a vault if it is not liquidatable at that moment in time or instance (ex. the collateral increases above 150% during the grace period), even if the vault has been previously marked for liquidation and the grace period is over.

***Example 1, a Liquidatable Vault:***

*Alice wants to borrow 500 USDT so she opens a vault and deposits $1,000 worth of MVRK as collateral*

- *Collateral Ratio: 200% (or Loan-To-Value Ratio of 50%)*
- *Liquidation Ratio: 150%*

*Alice borrows the maximum allowable amount of $500 USDT. The liquidation point is calculated as follows: (liquidationRatio * outstandingLoan) / 1000. So given the status of her vault, her liquidation point is: (1500 * 500) / 1000 = 750. So, her vault is liquidatable when the value of the collateral assets in the vault drops to $750.*

***Example continued:*** *If Alice’s vault becomes drops below 150% collateral, then it becomes open to start the liquidation process. First, the vault must be “marked” for liquidation by any user . This triggers a grace period where the owner of the vault can go and add more collateral into the vault  (or repay some debt) and make it no longer at risk. If Alice doesn’t re-collateralize the vault by the time the grace period ends, any user can go and liquidate the vault. The liquidator can repay up to 50% of the vault’s debt balance, and receive the value of their payment from the vault’s collateral, plus a 10% reward for helping stabilize the platform. The Maven Finance Treasury will also receive a 10% reward from the vault, according to the amount repaid by the liquidator.*

***Example 2, Vault Liquidation:***

*Alice’s vault in the example above is open for liquidation. Bob steps in to liquidate up to 50% of Alice’s $500 in USDT debt, and repays $250 in USDT. By repaying $250 of Alice’s USDT debt, Bob receives $250 in collateral which secured Alice’s loan, plus an additional $25 of collateral (10%) as a reward for liquidating the vault. The Maven Finance Treasury also receives $25 of collateral as a fee (this fee is paid by the vault’s collateral, not from the liquidator).*

Note: If the vault is secured by multiple collateral types, the reward paid to the liquidator will be proportional to their percentages in the vault. If the vault has 50% MVRK, and 50% wBTC, then the liquidation rewards will be paid as 50% MVRK & 50% wBTC.

## Satellites, Governance, and the Decentralized Oracle

### Satellites

**Satellites** are nodes that administer the Maven Finance platform (similarly to Validators on Proof of Stake blockchains). They perform two functions:

1. **Curators of Governance Voting:** Satellites vote on:
    - Updates to business logic (e.g. disbursing funds from the [Treasury](#governance--treasury), altering the interest rate algorithm for loans etc
    - Updates to the core Maven Finance protocol (e.g. adding a new [collateral asset class for vaults](#multi-asset-backed-loans), or adding new smart contracts)
2. **Oracle Price Feed Providers:** Satellites are nodes of Maven Finance's decentralized oracle, which provides price data for the assets that can be used as collateral for [the vaults](#multi-asset-backed-loans) (MVRK, wBTC, etc.)

A Satellite can act on its own behalf and can receive delegations on behalf of others.

To operate a Maven Finance Satellite, a user needs to stake a security deposit in MVN as a bond, which the user can buy on the open market or earn by participating in the ecosystem (e.g. through yield farming). Technically speaking, a Satellite may stake a security deposit to participate in governance and *not* operate an oracle node. Operating a Satellite node for governance is required to operate the oracle node software in order to sign the data feeds.

The supported collateral assets at launch will be MVRK, wBTC (wrapped BTC), USDT, and Maven Finance’s [mTokens](#lending-earning-yield-on-your-assets).

Satellites sign transactions and pay the fees in MVRK. For their MVRK costs, Satellites are reimbursed directly with MVRK. Satellite rewards for their services are paid in sMVN (Governance may add the ability to receive compensation in other assets). The amount that Satellites are paid is set by a [Governance decision](#governance) (to be applied transparently by smart contracts), but as a general rule:

- Governance operations earns staked MVN, and other invoiced assets (ex. USDT)
- Providing Oracle pricing information earns staked MVN and MVRK (reimbursement)

**In other words: you get paid cash for contributing your governance power, and you get governance power from helping to determine the value of cash.**

Rewards are distributed to Satellites’ delegates, just as blockchain validators share rewards with their delegates, minus delegation fees.

### Governance

Stakeholders can participate in governance by either delegating their voting power to a Satellite or by operating a Satellite themselves. For this participation, users receive governance and oracle rewards.

There is no cost to [staking MVN to obtain sMVN](#obtaining-sMVN) (from here on known as sMVN) aside from the corresponding network transaction fee, and stakeholders are not required to delegate the sMVN that they hold. However, if sMVN is not delegated, there is an opportunity cost of *not* participating in governance and so *not* receiving these rewards (similarly for MVRK in a wallet that is not delegated; it just sits there).

Stakeholders are free to re-delegate to a different Satellite whenever desired, and with zero penalties.

Governance votes, whether for the business logic or upgrades to the Maven Finance ecosystem, are rewarded with a portion of the earned income from the on-chain [Treasury](#treasury). This functions to reward stakeholders who participate in guiding the platform, similarly to how consultants are remunerated for their advisory services.

This form of representative liquid democracy incentivizes stakeholders to participate in governance (either directly, by setting up a Satellite, or indirectly by delegating to one), and so contributes to voter participation and the stability of the system.

### Satellite Delegations

Stakeholders can participate in governance without setting up their own Satellite: they can delegate their governance power (i.e. their sMVN) to an existing Satellite. The Satellite cannot transfer or spend the delegated sMVN tokens; it can only use the delegated tokens to vote.

However, if the Satellite behaves maliciously then a Satellite may be suspended or banned via Satellite governance super majority. This incentivizes stakeholders to delegate responsibly and perform due diligence when choosing a Satellite, as they may not receive rewards if their Satellite ceases operations. This accountability also helps maintain the quality of the price feeds to the system overall.

Running a Satellite and delegating sMVN requires staking the tokens via the *Doorman Module*, as discussed below.

### The Decentralized Oracle

The Maven Finance system relies on Satellites to provide accurate and reliable pricing information for its collateral asset classes. Maven Finance also uses a similar consensus mechanism to Liquid Proof of Stake (LPoS), by weighing the data from Satellites using their respective stake in the system.

Satellites are required to stake MVN to participate in governance and thus are exposed to price volatility. Satellites are incentivized to provide correct data, since otherwise, their sMVN stake can lose value in the event of a malicious action or attack.

*For example, suppose a malicious actor wants to skew the price of a Bitcoin collateral in the Maven Finance system so that he can borrow an excessive amount of USDT. He purchases MVN, stakes it to set up a malicious Satellite that feeds false pricing data into the system. The system will then detect this attempt – thanks to the distribution of Satellites – and the Satellite network may remove a malicious Satellite with a super majority Satellite vote, banning the address from further Satellite operations.*

**Note:** Maven Finance's oracles are designed so 3rd party decentralized applications may operate their own Satellite oracle, utilize the data feeds, request new data sets, and bring additional data on-chain beyond price information. This interoperability and composability will solidify Maven Finance as a pillar of decentralized finance.


## MVN and sMVN (Doorman Module)

### What is MVN and how does it differ from sMVN?

MVN is the governance token of the Maven Finance network.

It is a fully transferable token on the blockchain network. Broadly speaking, 1 MVN gives 1 vote on a [governance decision](#governance) (Maven Finance governance is like proof-of-stake: a user's voting power is proportional to the MVN held).

However, to use MVN to *actually vote*, a user must first **stake** it via the **doorman module**. This smart contract tracks MVN tokens and records the staking and delegating of the *non-transferable* token called sMVN (staked MVN). sMVN represents MVN locked inside the Maven Finance ecosystem. This staked version of MVN will not appear in a users’ wallet, but will appear on the user’s personal dashboard. It is solely tracked on the blockchain.

MVN is a *FA2* token: it exists outside of the Maven Finance system and can be freely traded. sMVN is not an *FA* token, but it is used as an internal accounting token and has special permissions to interact with the Maven Finance system (described [below](#obtaining-sMVN)), e.g. it is not transferable between users but can be used to vote on Governance decisions.

In other words: sMVN is the staked form of MVN, and represents a direct right to vote in the governance of Maven Finance, whereas MVN is a freely tradable token whose underlying value is precisely the ability to obtain the right to Maven Finance’s governance.

We explain the motivation for separating the tradable token MVN from the voting form sMVN below.

Finally, the voting power of sMVN can be delegated to a satellite but not transferred. You always stay in full control of your sMVN.

### Obtaining sMVN

Users may obtain sMVN in several ways:

1. Staking their MVN to sMVN at a 1:1 ratio (1 MVN = 1 sMVN)
2. Earning sMVN from participating in the incentive programs (e.g. yield farms or yield from supplying assets to [Maven Finance’s lending pools](#lending-earning-yield-on-your-assets))
3. Delegating their sMVN to a Satellite, and earning a share of that Satellite's sMVN rewards for [Governance](#governance) or [Oracle price information](#the-decentralized-oracle)
4. Users may also be awarded sMVN as their share of the system's [sMVN exit fees as discussed below](#converting-sMVN-back-to-MVN-exit-fees)
5. From liquidating vaults which contain sMVN as collateral

sMVN holders enjoy benefits which include (non-exhaustive list):

- **Governance Rewards:** Voting on governance decisions is incentivized with lending fees & sMVN, and shared with delegates
- **Oracle Rewards:** Providing price feed data will be incentivized via sMVN rewards and shared with delegates
- **Exit Fee Rewards:** Distributed to sMVN holders as a reward for on-going participation
- **Operating A Satellite:** Users need to provide a sufficient amount of sMVN

### Converting sMVN back to MVN (exit fees)

To redeem sMVN back to MVN, users need to pay an exit fee in sMVN tokens, which is automatically distributed to the remaining sMVN holders. This is conducted to offset the opportunity cost of remaining staked and to maintain platform & oracle stability.

The fee is dynamically computed based on the **MVN Loyalty Index (MLI)**, which is calculated as a percentage:

<img src="/images/eq-mli.png" width="330" id="eq-mli-img"/>

*Example: if the sMVN<>MVN ratio is 9:1 then the MLI = 90%; if the sMVN<>MVN ratio is 6:4 then the MLI = 60%. When MVN is minted, the total supply of MVN increases, and the MLI decreases. However, as users stake their MVN for sMVN, the MLI increases.*

**The exit fee is structured so that a higher MLI means a lower exit fee rate**, by the following equation:

<img src="/images/eq-mli-fee.png" width="330" id="eq-mliFee-img"/>

![mli-fee-graph.jpg](/images/mli-fee-graph.png)

*Graph representing the fee for withdrawing sMVN to the current MLI*

The curve is designed so that users are incentivized to stake their MVN. If the MLI goes below 30%, the fee increases rapidly in order to help maintain a healthy ratio of locked MVN and secure the Maven Finance governance and ecosystem, yet has a max fee to not punish users that are slower to withdraw.

Rule of thumb: if sMVN is scarce then converting sMVN into MVN is relatively expensive, and if sMVN is plentiful then converting sMVN into MVN is relatively cheap.

The exit fee and MLI formulas are governable, and updatable by the Satellites via governance.

## Governance & Treasury

Blockchain technology offers the revolutionary capability to build so-called *trustless* applications. Trust still matters in trustless systems, but the difference is that it is *decentralized*. Historically, a powerful central authority was required for stability, now trust can be distributed with decentralized smart contracts amongst multiple actors, in new, innovative, and unprecedented ways.

In particular, the approach taken by Maven Finance is to digitally allocate proportional amounts of responsibility to actors (as discussed above). Individual actors can fail without compromising the platform’s overall integrity and without compromising trust – whereas in an ‘old-fashioned’ centralized system, failure of the one central authority can be catastrophic.

### Decentralization

Maven Finance is not a project which promises to transition from centralized to decentralized controls. As we believe that **governance is key**, Maven Finance provides concrete mechanisms to launch as a DAO (Decentralized Autonomous Organization), using a model based on robust Proof of Stake governance models.

Maven Finance has two forms of governance voting:

1. **Core Governance**: A 4-stage voting process taking place over 10 days, used to replace core contracts, core updates, major business logic
2. **Threshold Votes**: A single stage ”quick” vote where after the threshold percentage of “Yay” is met, the code executes immediately. (Ex. Treasury deployments, Breakglass). Most votes will be Threshold Votes

### **Core Governance**

Maven Finance will have built-in on-chain governance from the start, treating it as a cornerstone of the design rather than an afterthought. An upgrade proposal can be submitted on-chain as a smart contract and voted on by Satellites, and in the case of a “yay”, the upgrade passes to the next round of the governance cycle. The ecosystem does *not* rely on central actors to carry out decisions. There are four rounds of core governance periods to accept a governance proposal.

1. Proposal Round
2. Voting Round
3. Timelock Round
4. Execution Round

This model of decentralized governance has successfully powered numerous blockchains since smart contracts blockchains have adopted on-chain governance mechanisms.

Below are examples of governance decisions:

- General upgrades to the protocol
    - New multi-asset vaults
    - Providing incentives to move to newer versions of vaults
    - Different types of lending
    - Change of functions/entrypoints
    - Upgrade of contracts (moving from v1>v2 in a decentralized governance manner)
    - Addition of new contracts to the Maven Finance system
- Minting of MVN to fund
    - Farms
    - Satellites
    - Maven Council
- Change of parameters
    - Collateralization ratio of CDPs
    - New Lending Pools
    - Supported assets as collateral
    - MLI & exit fees

### Threshold Governance

Threshold votes use a single stage structure rather than a four period cycle in order to more quickly & efficiently enable practical business decision. The ability to act quickly is vital to any platform, and threshold governance executes immediately after the minimum required “Yay” votes are met. Each threshold vote has it’s own minimum vote requirement to pass, and may be changed via the core governance cycle. The 10 day four stage core governance structure.

Examples of threshold governance are:

- **[Financial Requests](#treasury)**: Deployment of capital from the Treasury requires Satellites to vote on & pass financial requests. At Genesis, the Maven Finance Council will initiate the financial request votes, while voting is always conducted by Satellites. Satellites may always initiate a vote to deploy capital via core governance, and eventually an upgrade will be proposed to allow Satellites to initiate financial requests via threshold governance.
- **[Emergency Break Glass](#emergency-governance--break-glass)**: In the rare case that requires to pause all of the contracts, any user may initiate an Emergency Break Glass vote. Emergency Break Glass votes are voted on directly by users, and not by Satellites. It is the only voting structure that requires users to vote on their own behalf.
- **[Satellite Node Governance](#satellites)**: Satellite nodes are self-governed, and must be accepted by a threshold vote. Votes to accept a Satellite have a *low* threshold, so that any user may join easily, but avoid spamming the network. Satellites may also be banned from the network for malicious behavior (ex. intentionally providing incorrect oracle data). Banning a Satellite has a *high* threshold requiring a super-majority of Satellites to remove the malicious actor.

### Voting power

Initially, substantial voting power will lie in the hands of the core team and private contributors, although far below any threshold for control.[^(6)] The system is designed to incentivize participation so that with time the community gains a larger percentage of the circulating token supply. The community will grow beyond the initial core contributors as other actors become active to participate and earn rewards. The overall governance power will pass smoothly to the broader community.

Specifically, this is achieved by the rate at which new governance tokens are released to the ecosystem through farms and other incentive programs.

[^(6)]: The section [tokenomics](#tokenomics) provides an overview of token distribution and circulating supply.

The token genesis is minted and distributed according to the [initial supply plan](#tokenomics). Stakeholder tokens from private contributions and the team are controlled by vesting contracts that mint and release them according to a linear monthly schedule.

### Voting with Satellites (electoral delegates)

After the launch, Satellites will form the backbone of the system and will accept sMVN delegations by stakeholders and vote on their behalf.

*This is similar to the approach of delegators to validators on the Proof of Stake networks.*

Thanks to this representative democracy model, stakeholders of sMVN are not required to regularly cast votes, and the level of a Satellite’s engagement in governance influences the choice of delegates.

### Treasury

The **Treasury** is a smart contract that will hold:

- the assets contributed in the token launch
- all subsequent revenue (e.g. interest fees and liquidation fees)

The Treasury will also hold income from future Maven Finance products. The Treasury will hold various type of assets such as wrapped assets, liquidity pool tokens, and stablecoins. The Treasury will also mint sMVN and distribute it accordingly to incentive programs (farms, Satellites, etc), or for funding entities.

The Maven Council will initiate financial requests that will be governed by the community (via Satellites), not by individuals or entities. If a Satellite wishes to disburse Treasury funds, it may do so via core governance proposals. Financial requests (via threshold governance) initiated by Satellites will be a future upgrade. Furthermore, **Treasury assets will not be used to vote on proposals.** Whenever a value is moved from the Treasury, a public vote must occur and be recorded on-chain.

A series of sub-treasuries will be created for specific purposes, similar to sub-accounts within an entities bank account. Satellites may also choose to create new sub-treasuries via the governance process. The Global Treasury, the default displayed Treasury, will reflect the total value from all sub-treasuries, such as:

- Research & Development
- Investment Treasury
- MVN buyback for oracle rewards & yield farms
- DAO Bakery Fund via MVRK purchases

## Maven Council

The Maven Council is operated by members of a Gibraltar-based legal entity that performs operations to develop the Maven Finance ecosystem. Some responsibilities include maintaining contracts with developers, marketers, and lawyers. The Council also serves to maintain interactions that require off-chain capabilities.

The Council’s inception happens after the initial MVN distribution. The Council is a separate entity from the Satellite governance and the Treasury. The Council can receive funds (e.g. MVN) from the Treasury, following on-chain Governance votes by the community.

MVN for Operations will be sent to the 3 of 5 multi-sig held by the board members of the Council and vested over 5 years. The Council board will be charged with disbursing assets to expand the Maven Finance ecosystem and develop new products and features.

The multi-sig is designed to limit the powers of any individual, and eliminate the possibility of a loss of funds due to any single point of failure.

## Emergency Governance & Break Glass

Like all software products, and especially DeFi projects, there is a constant threat of hacks, theft, fraud, and possibility for bad actors to take advantage of the system. This is why the Maven Finance platform has built in an emergency governance system and break glass ability. In the event of a flaw being exploited or a hack of the system. Anyone can vote on emergency governance to initiate break glass and pass emergency powers to the break glass council.

### Emergency Governance

Any sMVN holder can initiate an emergency governance vote to activate the system-wide break glass and pass emergency powers to the break glass council. The vote requires a simple majority of all sMVN to pass. Upon its passage, the “glass is broken” and the Break Glass Council (see below) can pause all smart contracts, and can now enact actions to prevent widespread damage to the system.

**Note: Emergency Governance is voted on by all sMVN stakeholders, not only Satellites, and is reliant on all sMVN stakeholders to vote individually to break the glass.**

### Break Glass Council

At Genesis, the Break Glass Council are the same members of the Maven Council, that performs operations to develop the Maven Finance ecosystem. It is a multi-sig contract with several council members, any of the members can initiate an action and it requires a majority of the multi-sig owners to approve said action. Once the glass is broken, the council has the power to pause/unpause all major entry points (preventing hackers from continuing to siphon funds from the system), change the admins from a set of whitelisted addresses, and more. The subsequent admin addresses will be able to update the contract lambdas.

It is important to note that the Break Glass council can only take emergency action only upon successful trigger of emergency governance.

### Break Glass: Access Control Layer

Below describes the access control layer for the Maven Finance smart contracts in 3 different status’. Meaning, who are the admins of each smart contract under which status.

1. Under normal conditions
2. During Break Glass and the different stages of it
3. Upgrading - upgrades from governance decisions

Outline of Maven Finance's Access control layer under normal conditions
![acl-normal.png](/images/acl-normal.png)

Outline of Maven Finance's Access control layer during the Break Glass process
![acl-break-glass.png](/images/acl-break-glass.png)

Outline of Maven Finance's Access control layer during the contract upgrade process
![acl-upgrade.png](/images/acl-upgrade.png)

## Yield Farming

The Maven Finance platform produces several liquid tokens in its ecosystem, such as the different LP “receipt” tokens from the p2p lending (known as mTokens) and its own native MVN governance token. As part of the strategy to increase on-chain liquidity, a liquidity pool of MVN/MVRK will be launched with initial liquidity provided by the bootstrapping contributions from the public.

Initially, the liquidity should be sufficient to enable low-slippage trading at reasonable volumes as providing liquidity for the MVN/MVRK pair is incentivized by a series of yield/liquidity farms.

Additionally, Maven Finance will also incentivize users to deposit liquidity for the lending pools. Liquidity providers will be able to stake their mTokens (programmable shares of a liquidity pool) within yield farms to receive additional sMVN as a bonus incentive, in addition to the yield they earn from the lending pools. The amount of sMVN rewards depends on how long the LP mTokens are staked. By default, Maven Finance farms are spawned for three months. Afterward, a governance vote will be required to either rehydrate existing farms and restart their lifecycle or spawn new farms.

When the Maven Finance platform goes live, yield farms for the following liquidity pools will be available:

MVN/MVRK, MVN/USDT, mMVRK, mUSDT, and mwBTC.

## Tokenomics

**MVN Max Supply: 1,000,000,000 tokens (10^9 MVN tokens).**

- 32% Incentives
    - 30% Oracle Rewards & Yield Farming
    - 2% Initial Liquidity Pool
- 25% Core Contributors, Team, & Advisors
    - 19% Founders & Development Team
    - 6% Advisors
- 25% Ecosystem
    - 10% DAO Treasury (on-chain community vote for use of funds)
    - 10% Council Treasury (vested over 5 years)
    - 5% Marketing & Promotions
- 18% Contributors
    - 16% Private Sale
    - 2% Public Liquidity Sale

![tokenomics_planet.png](/images/tokenomics_planet.png)

The team and advisors have a 24 months linear vesting schedule at Genesis. Private contributor tokens follow a 24-20-16 month vesting schedule from Genesis with linear vesting.

### Revenue Model

Revenue is generated through loan interest, admin origination fees, and liquidation fees. The interest fee is paid by the borrower when closing a debt position (paying back their loan). This fee is proportionate to the amount of the loan relative to how long the loan was open. A liquidation fee occurs when an at-risk vault is liquidated and is on top of the interest. The liquidation fee is 10%.[^(7)]

[^(7)]: This fee exists to close a loophole where an owner liquidates himself over and over.

**The interest, liquidation, and admin origination fees are all governable by stakeholders and can be updated by community vote.**

The revenue is automatically deposited within the Treasury, where a reserve of MVRK and USDT is put aside to hedge against extreme market drops which might push at-risk vaults into an under-collateralized ratio so low that it would impossible to liquidate (as no rational investor would pay more money than what the collateral in the vault is worth). The reserve provides stablecoin liquidity to be injected in case of such an event and to maintain overall system stability.

Once Maven Finance is adopted and generating revenue, it is up to Governance to vote on disbursing the stablecoin revenue generated from the Treasury to fund further development, to incentivize Governance participation, to perform a buyback of MVN on the open market to incentivize Satellite price feeds & yield farms, and to invest in assets to be held by the Treasury.

### Token Flow

The following diagram shows the flow of value (tokens) between various modules of the system (smart contracts). Those smart contract modules are:

- [Doorman module](#MVN-and-sMVN-doorman-module)
- External exchange module
- [Yield-farm module](#yield-farming),
- [Loan module](#multi-asset-backed-loans)
- [Governance module](#governance)
- [Price feed module / Satellites](#the-decentralized-oracle)
- [Maven Council module](#maven-council)
- [Emergency Governance & Break Glass module](#emergency-governance--break-glass)

We outline their interactions in the following overview diagram:

<img src="/images/litepaper-flow.png" />

<center><i>
Outline of the Maven Finance system modules and their interactions
</i></center>

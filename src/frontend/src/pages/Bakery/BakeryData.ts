// helpers
import {ACTION_PRIMARY, ACTION_SECONDARY} from "app/App.components/Button/Button.constants"

export const delegateCardData = [
    {
        "id": 1,
        "title": "Maven DAO Bakery",
        "shortTitle": "DAO Bakery",
        "description": ["The Maven DAO Bakery belongs to the Maven Finance network. A small portion of the earnings are used to pay for the Decentralized Oracle’s transaction fees. The DAO Bakery is operated by Mavryk Dynamics on behalf of the Maven Finance network."],
        "bakeryAddress": "tz1ZY5ug2KcAiaVfxhDKtKLx8U5zEgsxgdjV",
        "bakeryPayoutAddress": "tz1LWEHti5PD7HZEgGrog6D5fxg8Pt8WSNyy",
        "delegateAddress": "",
        "rewards": [5, 6],
        "commission": [10],
        "availableXtzSpace": [-1],
        "kind": ACTION_SECONDARY,
        "buttonName": "Delegate to the DAO",
        "link": "https://tzkt.io/tz1ZY5ug2KcAiaVfxhDKtKLx8U5zEgsxgdjV/operations/"
    },
    {
        "id": 2,
        "title": "Mavryk Dynamics Bakery",
        "shortTitle": "Dynamics Bakery",
        "description": ["The Mavryk Dynamics Bakery belongs to one of the core teams contributing to Maven Finance. Delegating to this Bakery contributes to the further development of Maven Finance."],
        "bakeryAddress": "tz1NKnczKg77PwF5NxrRohjT5j4PmPXw6hhL",
        "bakeryPayoutAddress": "tz1WHZYyDqUEj5BLjofe3jctmb9wN61KeMco",
        "delegateAddress": "",
        "rewards": [5, 6],
        "commission": [10],
        "availableXtzSpace": [-1],
        "kind": ACTION_PRIMARY,
        "buttonName": "Delegate to Mavryk Dynamics",
        "link": "https://tzkt.io/tz1ZY5ug2KcAiaVfxhDKtKLx8U5zEgsxgdjV/operations/"
    }
]

export const bakeryData = {
    delegateYourTezos: ["Earn rewards for helping to secure the Tezos blockchain! There are two Bakeries that are part of the Maven Finance ecosystem, check them out below and delegate your XTZ with no risk."],
    delegationAndStaking101: ["Delegating your XTZ tokens allows you to earn rewards for helping secure the Tezos network. By delegating, you are assigning your token’s voting rights to a Tezos Baker, who uses the token’s voting weight to secure the network and vote on Tezos governance.",
        "You remain in control of your tokens at all times. Tezos uses Liquid Proof of Stake, so your delegated tokens are liquid and not locked."],
    howToDelegateAndReceiveRewards: ["You can stake your Tezos tokens using your wallet or ledger device. The process is simple and requires you to delegate your staking rights to our address. You’re always in control of your private keys."],
}

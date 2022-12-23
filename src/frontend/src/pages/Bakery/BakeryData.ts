// helpers
import { ACTION_PRIMARY, ACTION_SECONDARY } from "app/App.components/Button/Button.constants"

export const delegationCardData = [
  {
    "id": 1,
    "title": "Mavryk DAO Bakery",
    "description": ["The Mavryk DAO Bakery belongs to the Mavryk Finance network. A small portion of the earnings are used to pay for the Decentralized Oracle’s transaction fees. The DAO Bakery is operated by Mavryk Dynamics on behalf of the Mavryk Finance network."],
    "tzAddress": "tz1ezDb77a9jaFMHDWs8QXrKEDkpgGdgsjPD",
    "rewards": [5, 6],
    "commission": [5],
    "availableXtzSpace": [3],
    "kind": ACTION_SECONDARY,
    "link": "https://tzkt.io/tz1ZY5ug2KcAiaVfxhDKtKLx8U5zEgsxgdjV/operations/"
  }, 
  {
    "id": 2,
    "title": "Mavryk Dynamics Bakery",
    "description": ["The Mavryk DAO Bakery belongs to the Mavryk Finance network. A small portion of the earnings are used to pay for the Decentralized Oracle’s transaction fees. The DAO Bakery is operated by Mavryk Dynamics on behalf of the Mavryk Finance network."],
    "tzAddress": "tz1ezDb77a9jaFMHDWs8QXrKEDkpgGdgsjPD",
    "rewards": [5, 6],
    "commission": [5],
    "availableXtzSpace": [3],
    "kind": ACTION_PRIMARY,
    "link": "https://tzkt.io/tz1ZY5ug2KcAiaVfxhDKtKLx8U5zEgsxgdjV/operations/"
  }
]

export const bakeryData = {
  delegateYourTezos: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."],
  delegationAndStaking101: ["Delegation - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  "Staking - It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing. Read more about staking here"],
  howToDelegateAndReceiveRewards:   ["You can stake your tezos tokens using your wallet or ledger device. The process is simple and requires you to delegate your staking rights to our address. You’re always in control of your private keys."],
}
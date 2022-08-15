export type CoinsInputsValues = {
  XTZ: string | number
  tzBTC: string | number
}

export type AddLiquidutityInputChangeEventType =
  | React.ChangeEvent<HTMLInputElement>
  | {
      target: {
        name: string
        value: number
      }
    }
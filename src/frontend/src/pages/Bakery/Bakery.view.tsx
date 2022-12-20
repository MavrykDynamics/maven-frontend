// components

// helpers
import { hardcodeText } from './Bakery.consts'

// types

// styles
import { BakeryStyled, Card } from "./Bakery.style";

export function BakeryView () {

  return (
    <BakeryStyled>

      <Card>
        <h1>Delegate your Tezos</h1>

        <p className='paragraph-max-width'>{hardcodeText.delegateYourTezosP1}</p>
        <p className='paragraph-max-width'>{hardcodeText.delegateYourTezosP2}</p>
      </Card>

    </BakeryStyled>
  )
}

// components
import { BakeryView } from './Bakery.view'
import { MenuTopBar } from 'app/App.components/Menu/MenuTopBar.controller'

// styles
import { FooterStyled } from "./Bakery.style";

type Props = {
  openChangeNodePopup: () => void
}

export function Bakery ({ openChangeNodePopup }: Props) {
  return (
    <>
      <MenuTopBar openChangeNodePopupHandler={openChangeNodePopup} />
      <BakeryView />
      <FooterStyled />
    </>
  )
}

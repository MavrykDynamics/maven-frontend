import { useDispatch } from 'react-redux'

// helpers
import { getShortTzAddress } from 'utils/tzAddress'

import { showToaster } from '../Toaster/Toaster.actions'
import { SUCCESS } from '../Toaster/Toaster.constants'
import { TzAddressStyles } from './TzAddress.constants'
import { TzAddressContainer, TzAddressIcon, TzAddressStyled } from './TzAddress.style'

type TzAddressProps = {
  tzAddress: string
  type?: TzAddressStyles
  hasIcon?: boolean
  iconToLeft?: boolean | undefined
  isBold?: boolean
  shouldCopy?: boolean
  className?: string
  amountFromStart?: number
  amountFromEnd?: number
}
export const TzAddress = ({
  className,
  tzAddress,
  type,
  hasIcon = true,
  iconToLeft,
  isBold,
  shouldCopy = true,
  amountFromStart = 4,
  amountFromEnd = 4,
}: TzAddressProps) => {
  const addrClasses = `${type} ${isBold ? 'bold' : ''} copyIcon`
  const dispatch = useDispatch()

  const handleCopyToClipboard = () => {
    if (shouldCopy) {
      navigator.clipboard.writeText(tzAddress)
      dispatch(showToaster(SUCCESS, 'Copied to Clipboard', `${tzAddress}`))
    }
  }

  return (
    <TzAddressContainer className={`${className} tzAddressToClick`} onClick={handleCopyToClipboard}>
      {hasIcon && iconToLeft && (
        <TzAddressIcon className={addrClasses}>
          <use xlinkHref="/icons/sprites.svg#copyToClipboard" />
        </TzAddressIcon>
      )}
      <TzAddressStyled className={addrClasses}>
        {getShortTzAddress({ tzAddress, amountFromEnd, amountFromStart })}
      </TzAddressStyled>
      {hasIcon && !iconToLeft && (
        <TzAddressIcon className={addrClasses}>
          <use xlinkHref="/icons/sprites.svg#copyToClipboard" />
        </TzAddressIcon>
      )}
    </TzAddressContainer>
  )
}

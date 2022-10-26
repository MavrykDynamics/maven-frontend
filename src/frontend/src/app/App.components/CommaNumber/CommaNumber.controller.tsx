import Icon from '../Icon/Icon.view'
import { LoadingIcon } from './CommaNumber.style'

export const DECIMALS_TO_SHOW = 2

export const CommaNumber = ({
  value,
  loading,
  endingText,
  endingIconName,
  beginningText,
  className = '',
  showDecimal = true,
  decimalsToShow = DECIMALS_TO_SHOW,
  showNone,
  maxSymbols,
  useMaxSymbols = false,
  useMagnitude = true,
}: {
  value: number
  decimalsToShow?: number
  loading?: boolean
  endingText?: string
  endingIconName?: string
  beginningText?: string
  className?: string
  showDecimal?: boolean
  showNone?: boolean
  maxSymbols?: number
  useMaxSymbols?: boolean
  useMagnitude?: boolean
}) => {
  let decimals = decimalsToShow
  let decimalMagnitude =
    useMagnitude && (!value || (value !== 0 && value < 1)) ? -Math.floor(Math.log10(value) + 1) + 2 : 0
  if (decimalMagnitude > 8) decimalMagnitude = 8
  if (decimalsToShow + decimalMagnitude > 8) decimals = Math.min(decimalsToShow + decimalMagnitude, 8)
  if (value > 1 && decimalsToShow < 8) decimals = decimalsToShow
  let numberWithCommas = value.toLocaleString('en-US', {
    maximumFractionDigits: showDecimal ? decimals : 0,
  })
  let title = ''

  if (maxSymbols && useMaxSymbols && numberWithCommas.length > maxSymbols) {
    title = numberWithCommas
    numberWithCommas = `${numberWithCommas.slice(0, maxSymbols)}...`
  }
  return (
    <>
      {loading ? (
        <div className={className}>
          <LoadingIcon className={'secondary'}>
            <use xlinkHref="/icons/sprites.svg#loading" />
          </LoadingIcon>
        </div>
      ) : (
        <>
          {beginningText || endingText || endingIconName ? (
            <div className={className} title={title && title}>
              <p>
                {beginningText ? beginningText + ' ' : ''}
                {showNone ? '-' : numberWithCommas}
                {endingText ? ' ' + endingText : ''}
                {/* TODO:  add posibility to use icons */}
                {/* {endingIconName ? <Icon id={endingIconName} /> : ''} */}
              </p>
            </div>
          ) : (
            <div className={className}>{numberWithCommas}</div>
          )}
        </>
      )}
    </>
  )
}

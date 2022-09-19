import { LoadingIcon } from './CommaNumber.style'

export const DECIMALS_TO_SHOW = 2

export const CommaNumber = ({
  value,
  loading,
  endingText,
  beginningText,
  className = '',
  showDecimal = true,
  decimalsToShow = DECIMALS_TO_SHOW,
  showNone,
}: {
  value: number
  decimalsToShow?: number
  loading?: boolean
  endingText?: string
  beginningText?: string
  className?: string
  showDecimal?: boolean
  showNone?: boolean
}) => {
  let decimalMagnitude = value !== 0 && value < 1 ? -Math.floor(Math.log10(value) + 1) + 2 : 0
  if (decimalMagnitude > 8) decimalMagnitude = 8
  const numberWithCommas = value.toLocaleString('en-US', {
    maximumFractionDigits: showDecimal ? decimalsToShow + decimalMagnitude : 0,
  })
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
          {beginningText || endingText ? (
            <div className={className}>
              <p>
                {beginningText ? beginningText + ' ' : ''}
                {showNone ? '-' : numberWithCommas}
                {endingText ? ' ' + endingText : ''}
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

import * as React from 'react'

import { BUTTON, ButtonStyle, ButtonTypes, PRIMARY } from './Button.constants'
import { ButtonIcon, ButtonLoadingIcon, ButtonStyled, ButtonText } from './Button.style'

type ButtonViewProps = {
  text: string
  icon?: string
  className?: string
  kind?: ButtonStyle
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  clickCallback: () => void
  clicked: boolean
  type?: ButtonTypes
  loading?: boolean
  disabled?: boolean
}

export const ButtonView = ({
  text,
  icon,
  kind,
  onClick,
  clickCallback,
  clicked,
  type,
  loading,
  disabled,
  className = '',
}: ButtonViewProps) => {
  let buttonClasses = kind
  if (clicked) buttonClasses += ' clicked'
  if (loading) buttonClasses += ' loading'
  if (disabled) {
    buttonClasses += ' disabled'
    kind += ' disabled'
  }
  return (
    <ButtonStyled
      className={`${buttonClasses} ${className}`}
      onClick={(e) => {
        clickCallback()
        onClick && onClick(e)
      }}
      type={type}
      disabled={disabled}
    >
      <ButtonText>
        {loading ? (
          <>
            <ButtonLoadingIcon className={kind}>
              <use xlinkHref="/icons/sprites.svg#loading" />
            </ButtonLoadingIcon>
            <div>Loading...</div>
          </>
        ) : (
          <>
            {icon && (
              <ButtonIcon className={kind}>
                <use xlinkHref={`/icons/sprites.svg#${icon}`} />
              </ButtonIcon>
            )}
            <div>{text}</div>
          </>
        )}
      </ButtonText>
    </ButtonStyled>
  )
}

import styled from 'styled-components/macro'
import {
  INPUT_BIG,
  INPUT_LARGE,
  INPUT_MEDIUM,
  INPUT_SMALL,
  INPUT_STATUS_ERROR,
  INPUT_STATUS_SUCCESS,
} from './NewInput.constants'
import { MavrykTheme } from 'utils/interfaces'

// TODO: refactor colors with theme implementation
export const StyledInput = styled.input<{ theme: MavrykTheme }>`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.darkestBackroundColor};
  border: none;
  border-radius: 10px;
  line-height: 100%;
  margin: 0;
  color: ${({ theme }) => theme.topbarMenuAndPlaceholders};
  display: block;
  padding: 13px 45px 13px 20px;

  &::placeholder {
    color: ${({ theme }) => theme.topbarMenuAndPlaceholders};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.darkBackroundColor};
  }

  &.remove-right-border-radius {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &.${INPUT_STATUS_SUCCESS}, &.${INPUT_STATUS_ERROR} {
    padding-right: 35px;
  }
`

export const InputPinnedChild = styled.div<{ theme: MavrykTheme }>`
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.socialBackroundColor};
  background-color: ${({ theme }) => theme.darkestBackroundColor};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  .img-wrapper,
  svg {
    width: 30px;
    height: 30px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

export const InputWrapper = styled.div<{ theme: MavrykTheme }>`
  position: relative;
  display: flex;
  border: 1px solid ${({ theme }) => theme.socialBackroundColor};
  border-radius: 10px;
  width: 100%;
  height: 40px;
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &.${INPUT_MEDIUM} {
    height: 50px;

    input {
      font-weight: 500;
      font-size: 14px;
    }

    input::placeholder {
      font-weight: 400;
      font-size: 12px;
    }
  }

  &.${INPUT_LARGE} {
    height: 56px;

    input {
      font-weight: 600;
      font-size: 22px;
    }

    input::placeholder {
      font-weight: 400;
      font-size: 16px;
    }
  }

  &.${INPUT_BIG} {
    height: 60px;

    input {
      font-weight: 600;
      font-size: 22px;
    }

    input::placeholder {
      font-weight: 400;
      font-size: 16px;
    }
  }

  &.${INPUT_SMALL} {
    height: 40px;

    input {
      font-weight: 500;
      font-size: 14px;
    }

    input::placeholder {
      font-weight: 400;
      font-size: 12px;
    }
  }

  &:focus-within {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryColor}19;
    border-color: ${({ theme }) => theme.primaryColor}7F;
  }

  &.${INPUT_STATUS_ERROR} {
    border: 1px solid ${({ theme }) => theme.downColor};
    input {
      color: ${({ theme }) => theme.downColor};

      &::placeholder {
        color: ${({ theme }) => theme.downColor};
      }

      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.downColor}7F;
      }
    }

    .pinned-child {
      border-left: 1px solid ${({ theme }) => theme.downColor};
    }
  }

  &.${INPUT_STATUS_SUCCESS} {
    border: 1px solid ${({ theme }) => theme.upColor};
    input {
      color: ${({ theme }) => theme.upColor};

      &::placeholder {
        color: ${({ theme }) => theme.upColor};
      }

      &:focus {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.upColor}7F;
      }
    }

    .pinned-child {
      border-left: 1px solid ${({ theme }) => theme.upColor};
    }
  }

  &.mb-45 {
    margin-bottom: 45px;
  }

  &.table-input {
    border: none;
    padding: 0;
    input {
      padding: 0 10px;
      background: transparent;

      &::placeholder {
        color: ${({ theme }) => theme.primaryTextCardColor};
      }
    }

    &:focus-within {
      box-shadow: unset;
      border-color: unset;
    }
  }

  &.input-with-rate {
    input {
      padding-top: 0px;
      padding-bottom: 10px;
    }
  }

  &.transparent-child-wrap {
    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:has(input:hover) {
      .pinned-child {
        background-color: ${({ theme }) => theme.containerColor};
      }
    }

    .pinned-child {
      border-left: none;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      background-color: ${({ theme }) => theme.backgroundColor};

      &:hover {
        background-color: ${({ theme }) => theme.backgroundColor};
      }
    }
  }

  .input-balance {
    position: absolute;
    bottom: -35px;
    right: 15px;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: ${({ theme }) => theme.primaryTextCardColor};
  }

  .input-converted-amount {
    position: absolute;
    bottom: -2px;
    left: 25px;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
    color: ${({ theme }) => theme.mainHeadingText};
  }

  .useMax-btn {
    position: absolute;
    top: -20px;
    right: 15px;
    font-size: 14px;

    &::before {
      position: absolute;
      background-color: ${({ theme }) => theme.btnBackroundNewsColor};
      width: 100%;
      content: '';
      height: 1px;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .pointer {
    cursor: pointer;
  }
`

export const NewInputLabel = styled.label`
  color: ${({ theme }) => theme.mainHeadingText};
  display: block;
  white-space: nowrap;
  font-weight: 700;
  font-size: 14px;
  position: absolute;
  top: -20px;
  left: 12px;
`

export const InputStyledStatus = styled.div<{ theme: MavrykTheme }>`
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 13px;
  z-index: 1;
  line-height: 13px;
  text-align: center;
  visibility: visible;
  pointer-events: none;
  will-change: transform, opacity;

  &.${INPUT_STATUS_ERROR} {
    background-image: url('/icons/input-error.svg');
    height: 15px;
    width: 15px;
  }

  &.${INPUT_STATUS_SUCCESS} {
    background-image: url('/icons/input-success.svg');
    height: 12px;
    width: 17px;
  }
`

export const InputPinnedTokenInfo = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  column-gap: 10px;
  min-width: max-content;
  align-items: center;
  padding: 0 15px;
  height: 100%;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  color: ${({ theme }) => theme.mainHeadingText};

  svg,
  .image-wrapper {
    width: 24px;
    height: 24px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    fill: ${({ theme }) => theme.mainHeadingText};
  }
`

export const InputPinnedDropDown = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  min-width: max-content;
  align-items: center;
  padding: 0 7px;
  height: 100%;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  color: ${({ theme }) => theme.mainHeadingText};
`

import styled from 'styled-components'
import { MavrykTheme } from 'utils/interfaces'

export const LBFAQStyled = styled.div<{ theme: MavrykTheme }>`
  z-index: 1;
  background: ${({ theme }) => theme.darkBackroundColor};
  border: 1px solid ${({ theme }) => theme.lbBorder};
  border-radius: 10px;
  padding: 50px 40px 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 20px;
`

export const FaqItem = styled.div<{ last?: boolean }>`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  position: relative;
  margin-bottom: 45px;

  &:not(:last-child) {
    ::before {
      content: '';
      position: absolute;
      bottom: -32px;
      left: 0;
      height: 2px;
      width: 100%;
      background: #503eaa;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 769px) {
    div {
      font-size: 16px;

      &.title {
        font-size: 20px;
        line-height: 22px;
      }
    }
  }

  @media screen and (max-width: 500px) {
    div {
      font-size: 14px;

      &.title {
        font-size: 18px;
        line-height: 20px;
      }
    }
  }
`

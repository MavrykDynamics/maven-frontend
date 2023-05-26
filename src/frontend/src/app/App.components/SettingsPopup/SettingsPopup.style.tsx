import styled from 'styled-components/macro'
import { cyanColor, silverColor, titleColor } from 'styles'
import { MavrykTheme } from 'utils/interfaces'

export const PopupContainerWrapper = styled.div<{ theme: MavrykTheme }>`
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: #160e3f;
  border: 1px solid ${titleColor};
  border-radius: 10px;
  height: fit-content;
  max-width: 395px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 1165px) {
    width: 95vw;
    padding: 40px 20px;
  }

  @media (max-height: 650px) {
    max-height: 80vh;
    top: 50%;
  }

  .close_modal {
    position: absolute;
    font-size: 35px;
    font-weight: 100;
    height: 18px;
    width: 18px;
    color: #8d86eb;
    transform: rotate(45deg);
    top: 15px;
    right: 15px;
    cursor: pointer;
  }

  &.settings {
    background: ${({ theme }) => theme.darkBackroundColor};
    .theme-switcher-block {
      display: flex;
      flex-direction: column;
      row-gap: 30px;
      margin-top: 40px;

      .buttons-wrapper {
        display: flex;
        column-gap: 10px;
        justify-content: center;
      }
    }
  }

  @media (max-width: 500px) {
    &.settings {
      .theme-switcher-block {
        display: flex;
        flex-direction: column;
        row-gap: 15px;
        margin-top: 20px;

        .buttons-wrapper {
          display: flex;
          column-gap: 10px;
          justify-content: center;
        }
      }
    }
  }
`

export const ChangeNodeNodesList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 18px;
  max-height: 200px;
  height: fit-content;
  overflow-y: auto;
  padding-right: 10px;

  @media (max-height: 650px) {
    max-height: 85px;
  }
`

export const ChangeNodeNodesListItem = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  padding: 20px;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  /* color: #8d86eb; */
  color: ${({ theme }) => theme.settingsPopupText};
  margin-top: 12px;
  border-radius: 10px;
  cursor: pointer;
  border: ${({ isSelected, theme }) => (isSelected ? `1px solid ${theme.selectedColor}` : `1px solid ${titleColor};`)};

  &.add_node {
    width: calc(100% - 10px);
    margin-top: 25px;
    justify-content: space-between;
    cursor: default;
    position: relative;

    .add-new-node-handler {
      width: 100%;
      font-weight: 600;
      font-size: 18px;
      line-height: 18px;
      color: ${({ theme }) => theme.settingsPopupText};
      white-space: nowrap;
      margin-right: 10px;
    }

    #inputStyled {
      margin: 0;
    }

    input {
      height: 35px;
      width: 100%;
      margin: 0;
      padding: 0;
      padding-left: 7px;
      font-size: 16px;
      text-overflow: ellipsis;
      transition: 0.5s all;
      overflow: hidden;
      white-space: nowrap;
    }

    &.expanded {
      .add-new-node-handler {
        display: none;
      }
    }
  }

  span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .user-url {
    color: #6a6a9b;
    font-size: 16px;
  }

  .img_wrapper {
    height: 35px;
    width: 35px;
    margin-right: 18px;
    font-size: 10px;

    img {
      height: 100%;
      object-fit: contain;
    }
  }

  @media (max-width: 500px) {
    padding: 15px 20px;
    &.add_node {
      margin-top: 15px;
    }
  }
`

export const PopupStyled = styled.div`
  .popup-enter {
    opacity: 0;
  }

  .popup-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }

  .popup-exit {
    opacity: 1;
  }

  .popup-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }

  .close_modal {
    position: absolute;
    font-size: 60px;
    font-weight: 100;
    height: 35px;
    width: 35px;
    color: ${({ theme }) => theme.settingsPopupText};
    /* color: #8d86eb; */
    transform: rotate(45deg);
    top: 15px;
    right: 15px;
    cursor: pointer;
  }
`

export const PopupContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #0000007a;
  z-index: 15;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;

  .wert-io-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 535px;
    width: 100%;
    height: 660px;

    .close_modal {
      position: absolute;
      font-size: 60px;
      font-weight: 100;
      height: 35px;
      width: 35px;
      color: #8d86eb;
      transform: unset;
      top: 5px;
      right: 15px;
      cursor: pointer;
    }

    @media (max-width: 550px) {
      width: 100vw;
      height: 100vh !important;
    }
  }
`

export const PopupTitle = styled.div`
  font-weight: 700;
  font-size: 25px;
  line-height: 25px;
  color: #8d86eb;
  position: relative;

  &.change_node {
    margin: 0 auto;
    width: fit-content;
    color: ${({ theme }) => theme.settingsPopupText};
    &::before {
      display: none;
    }
  }

  &::before {
    content: '';
    width: 77px;
    height: 4px;
    background: #503eaa;
    position: absolute;
    bottom: -10px;
    left: 0;
  }

  @media (max-width: 500px) {
    font-size: 20px;
    /* text-align: center; */

    &::before {
      height: 2px;
    }
  }
`

export const DescrText = styled.div<{ theme: MavrykTheme }>`
  max-width: 620px;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.settingsPopupTextDescr};
  margin-top: 30px;

  &.change_node {
    text-align: center;
    padding: 0 10px;
    font-size: 14px;
  }

  @media (max-width: 500px) {
    font-size: 14px;
  }
`

import styled from 'styled-components/macro'

export const ToggleButtonWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: fit-content;
  justify-content: center;
  border: 2px solid #503eaa;
  border-radius: 20px;
  font-size: 16px;
  color: #8d86eb;
  max-height: 40px;

  &.swap-toggler {
    margin: 0;
    div {
      padding: 8px 7px;
      font-size: 14px;
    }
  }
`

export const ToggleButtonItem = styled.div`
  padding: 15px 30px;
  height: inherit;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s all ease-in-out;
  font-weight: 600;
  cursor: pointer;
  text-transform: capitalize;
  font-size: 16px;

  &.chart-toggler {
    padding: 10px 15px;
    font-size: 16px;
  }

  &.selected {
    background: #8d86eb;
    border-radius: 17.5px;
    color: #160e3f;
    transition: 0.4s all ease-in-out;
  }
`

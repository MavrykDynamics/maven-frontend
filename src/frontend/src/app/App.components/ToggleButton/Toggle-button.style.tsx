import styled from 'styled-components/macro';

export const ToggleButtonWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: fit-content;
  justify-content: center;
  border: 2px solid #503EAA;
  border-radius: 20px;
  font-size: 16px;
  color: #8D86EB;
  max-height: 40px;
`;

export const ToggleButtonItem = styled.div`
  padding: 15px 30px;
  height: 31px;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s all ease-in-out;
  font-weight: 600;
  cursor: pointer;
  text-transform: capitalize;
  font-size: 16px;

  &.selected {
    background: #8D86EB;
    border-radius: 17.5px;
    color: #160E3F;
    transition: 0.4s all ease-in-out;
  }
`;

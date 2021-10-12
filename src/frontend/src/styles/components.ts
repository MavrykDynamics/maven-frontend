import styled from 'styled-components/macro'

export const Page = styled.div`
  margin: auto;
  padding: 0 20px;
  max-width: calc(100vw - 40px);
  width: 1280px;
  position: relative;

  @media (max-width: 700px) { 
    padding: 0 10px;
    max-width: calc(100vw - 20px);
   }
`

export const Message = styled.div`
  text-align: center;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50vh;
`

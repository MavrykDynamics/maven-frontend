import styled from 'styled-components'

export const LBStyled = styled.div`
  .content-wrapper {
    padding-top: 150px;
    display: grid;
    grid-template-columns: minmax(400px, 33%) minmax(auto, 67%);
    grid-template-rows: 112px 502px 685px;
    gap: 20px;
    min-height: calc(100vh - 200px);
    max-width: 1440px;
    width: calc(100vw - 5%);
    margin: 0 auto;
  }

  @media screen and (max-width: 1024px) {
    .content-wrapper {
      display: flex;
      row-gap: 20px;
      flex-direction: column;
      padding-bottom: 70px;
    }
  }
`

import styled from "styled-components";

export const LBStyled = styled.div`

  .content-wrapper {
    padding-top: 150px;
    display: grid;
    /* grid-template-columns: 467px 955px; */
    grid-template-columns: 33% 67%;
    grid-template-rows: 112px 502px 685px;
    gap: 20px;
    /* min-height: 1530px; */
    min-height: calc(100vh - 200px);
    max-width: 1440px;
    width: calc(100vw - 5%);
    margin: 0 auto;
  }

`
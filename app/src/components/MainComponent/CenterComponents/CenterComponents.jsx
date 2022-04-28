import React from "react";

import styled from "styled-components";
import { observer } from "mobx-react-lite";
import PeriodComponent from "./PeriodComponent/PeriodComponent";

const Main = styled.div`
  background-color: transparent;
  height: 100%;
  flex: 1 1 auto;

  border-radius: 16px;
`;

function CenterComponents() {
  return (
    <Main>
      <PeriodComponent />
    </Main>
  );
}

export default observer(CenterComponents);

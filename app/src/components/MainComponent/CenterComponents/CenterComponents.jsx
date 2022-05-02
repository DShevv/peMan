import React from "react";

import styled from "styled-components";
import { observer } from "mobx-react-lite";
import PeriodComponent from "./PeriodComponent/PeriodComponent";
import ChartComponent from "./ChartComponent/ChartComponent";

const Main = styled.div`
  background-color: transparent;
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  border-radius: 16px;
  min-width: 520px;
`;

function CenterComponents() {
  return (
    <Main>
      <PeriodComponent />
      <ChartComponent />
      <div
        style={{ width: `100%`, height: `70px`, background: "#ffffff" }}
      ></div>
    </Main>
  );
}

export default observer(CenterComponents);

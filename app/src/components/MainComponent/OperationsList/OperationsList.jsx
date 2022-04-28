import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

const StyledList = styled.div`
  width: 320px;
  background-color: #ffffff;
  height: 100%;
  flex: 0 1 auto;
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
`;

function OperationsList() {
  return <StyledList></StyledList>;
}

export default observer(OperationsList);

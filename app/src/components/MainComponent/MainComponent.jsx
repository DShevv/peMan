import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import CategoryList from "./CategoryList/CategoryList";
import CenterComponents from "./CenterComponents/CenterComponents";
import OperationsList from "./OperationsList/OperationsList";

const StyledMain = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  display: flex;
  column-gap: 20px;
`;

function MainComponent() {
  return (
    <StyledMain>
      <CategoryList />
      <CenterComponents />
      <OperationsList />
    </StyledMain>
  );
}

export default observer(MainComponent);

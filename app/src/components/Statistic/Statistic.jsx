import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import StatCenterComponents from "./StatCenterComponents/StatCenterComponents";
import StatCategoriesList from "./StatCategoriesList/StatCategoriesList";
import { useContext } from "react";
import { Context } from "../..";

const StyledMain = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: ${(props) => props.theme.background};
  width: 100%;
  height: 100%;
  display: flex;
  column-gap: 20px;
`;

function MainComponent() {
  const { store } = useContext(Context);

  return (
    <StyledMain theme={store.allThemes[store.theme]}>
      <StatCenterComponents />
      <StatCategoriesList />
    </StyledMain>
  );
}

export default observer(MainComponent);

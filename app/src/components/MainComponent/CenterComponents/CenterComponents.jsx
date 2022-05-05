import React from "react";

import styled from "styled-components";
import { observer } from "mobx-react-lite";
import PeriodComponent from "./PeriodComponent/PeriodComponent";
import ChartComponent from "./ChartComponent/ChartComponent";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../..";

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

const ToStat = styled.div`
  width: 100%;
  height: 80px;
  background: ${(props) => props.theme.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
  padding: 15px;
`;

const LinkButton = styled(NavLink)`
  width: 290px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  outline: none;
  border: none;
  background: ${(props) => props.theme.primary};
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.2s ease-in;

  :hover {
    background: ${(props) => props.theme.hover};
  }
`;

function CenterComponents() {
  const { store } = useContext(Context);

  return (
    <Main>
      <PeriodComponent />
      <ChartComponent />
      <ToStat theme={store.allThemes[store.theme]}>
        <LinkButton theme={store.allThemes[store.theme]} to="statistics">
          Статистика
        </LinkButton>
      </ToStat>
    </Main>
  );
}

export default observer(CenterComponents);

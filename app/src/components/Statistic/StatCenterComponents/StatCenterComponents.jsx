import React from "react";

import styled from "styled-components";
import { observer } from "mobx-react-lite";
import StatPeriodComponent from "./StatPeriodComponent/StatPeriodComponent";
import ChartComponent from "./ChartComponent/ChartComponent";
import { NavLink } from "react-router-dom";
import PeriodStatComponent from "./PeriodStatComponent/PeriodStatComponent";

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
  background: #ffffff;
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
  background: #ccf2f4;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  color: #4b4b4b;
  text-decoration: none;
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.2s ease-in;

  :hover {
    background: #a4ebf3;
  }
`;

const Container = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  column-gap: 20px;
`;

function StatCenterComponents() {
  return (
    <Main>
      <Container>
        <StatPeriodComponent />
        <PeriodStatComponent />
      </Container>

      <ChartComponent />
      <ToStat>
        <LinkButton to="/">На главную</LinkButton>
      </ToStat>
    </Main>
  );
}

export default observer(StatCenterComponents);

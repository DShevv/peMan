import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import PeriodGoal from "./PeriodGoal";
import PeriodSize from "./PeriodSize";
import { useContext } from "react";
import { Context } from "../../../..";
import arrow from "../../../../accets/arrow.svg";
import { useEffect } from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.secondary};
  height: 100px;
  flex: 1 1 auto;
  display: flex;
  padding: 10px;
  box-shadow: 0px 1px 11px -2px rgb(0 0 0 / 25%);
  border-radius: 16px;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  height: 70%;
  width: 10%;
  background-color: ${(props) => props.theme.primary};
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease-in;
  box-shadow: 0px 0px 19px -6px rgba(0, 0, 0, 0.25);
  background-image: url(${arrow});
  background-position: center;
  background-repeat: no-repeat;
  transform: ${(props) => (props.left ? "rotate(180deg)" : "")};

  :hover {
    background-color: ${(props) => props.theme.hover};
  }
`;

const NameCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 100%;
`;

function StatPeriodComponent() {
  const { store } = useContext(Context);
  const [page, setPage] = useState(null);

  useEffect(() => {
    store.fetchSpendings();
  }, [store.selectedPeriod]);

  useEffect(() => {}, [store.spendings]);

  function clearPage() {
    setPage(null);
  }
  return (
    <Container theme={store.allThemes[store.theme]}>
      <Button
        theme={store.allThemes[store.theme]}
        onClick={() => {
          setPage(false);
        }}
        left={true}
      />
      <NameCont>
        <PeriodSize move={page} clearMove={clearPage} />
        <PeriodGoal />
      </NameCont>
      <Button
        theme={store.allThemes[store.theme]}
        onClick={() => {
          setPage(true);
        }}
      />
    </Container>
  );
}

export default observer(StatPeriodComponent);

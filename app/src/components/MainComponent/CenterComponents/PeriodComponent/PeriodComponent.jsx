import React, { useState } from "react";

import styled from "styled-components";
import { observer } from "mobx-react-lite";
import PeriodGoal from "./PeriodGoal";
import PeriodSize from "./PeriodSize";
import { useContext } from "react";
import { Context } from "../../../..";

const Container = styled.div`
  background-color: #ffffff;
  height: 100px;
  width: 100%;
  display: flex;
  padding: 10px;
  box-shadow: 0px 1px 11px -2px rgb(0 0 0 / 25%);
  border-radius: 16px;
  justify-content: space-between;
`;

const Button = styled.button`
  cursor: pointer;
`;

const NameCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
`;

function PeriodComponent() {
  const { store } = useContext(Context);
  const [page, setPage] = useState(null);

  function clearPage() {
    setPage(null);
  }
  return (
    <Container>
      <Button
        onClick={() => {
          setPage(false);
        }}
      >
        Пред.
      </Button>
      <NameCont>
        <PeriodSize move={page} clearMove={clearPage} />
        <PeriodGoal />
      </NameCont>
      <Button
        onClick={() => {
          setPage(true);
        }}
      >
        След.
      </Button>
    </Container>
  );
}

export default observer(PeriodComponent);

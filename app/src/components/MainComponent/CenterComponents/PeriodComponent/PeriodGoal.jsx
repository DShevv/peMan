import React from "react";
import { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import { Context } from "../../../..";

const Container = styled.div`
  display: flex;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  color: ${(props) => (props.warn ? "#ff2424" : props.theme.text)};
  max-height: 50%;
  justify-content: space-between;
`;

const GoalInput = styled.input`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  color: inherit;
  background: transparent;
  outline: none;
  border: none;
  max-width: 45%;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  [type="number"] {
    -moz-appearance: textfield;
  }
`;

const Sum = styled.div`
  display: flex;
  width: 45%;
  justify-content: right;
`;

function PeriodGoal() {
  const { store } = useContext(Context);
  const [sum, setSum] = useState();
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    let storage = localStorage.getItem("goal");
    if (storage !== null) {
      setGoal(storage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("goal", goal);
  }, [goal]);

  useEffect(() => {
    if (store.spendings !== null) {
      let sum = store.spendings.reduce((prev, curr) => prev + curr.Value, 0);
      setSum(sum);
    } else {
      setSum(0);
    }
  }, [store.spendings]);

  return (
    <Container
      warn={goal !== null ? sum > goal : false}
      theme={store.allThemes[store.theme]}
    >
      <Sum>{sum}</Sum>
      /
      <GoalInput
        type="number"
        placeholder="План"
        min={0}
        value={goal !== null ? goal : ""}
        onChange={(e) => {
          if (e.target.value < 1) {
            setGoal(null);
          } else {
            setGoal(e.target.value);
          }
        }}
      />
    </Container>
  );
}

export default PeriodGoal;

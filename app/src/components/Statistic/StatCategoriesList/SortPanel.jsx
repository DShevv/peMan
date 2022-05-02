import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

const Conatiner = styled.div`
  margin: 5px;
  padding: 10px 28px;
  display: flex;
  background-color: #ccf2f4;
  border-radius: 10px;
  justify-content: space-between;
`;

const SortButton = styled.button`
  position: relative;
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: #4b4b4b;
  cursor: pointer;

  :nth-child(${(props) => props.selected})::before {
    content: "▴";
    position: absolute;
    top: ${(props) => (props.up ? "-45%" : "55%")};
    left: 50%;
    transform: rotate(${(props) => (props.up ? "0deg" : "180deg")})
      translateX(${(props) => (props.up ? "-50%" : "50%")});
  }
`;

function SortPanel(props) {
  function changeSort(num) {
    if (num === props.selected.pos) {
      props.changeSelected({ ...props.selected, up: !props.selected.up });
    } else {
      props.changeSelected({ pos: num, up: false });
    }
  }

  return (
    <Conatiner>
      <SortButton
        selected={props.selected.pos}
        up={props.selected.up}
        onClick={() => {
          changeSort(1);
        }}
      >
        Категория
      </SortButton>
      <SortButton
        selected={props.selected.pos}
        up={props.selected.up}
        onClick={() => {
          changeSort(2);
        }}
      >
        Сумма
      </SortButton>
    </Conatiner>
  );
}

export default observer(SortPanel);

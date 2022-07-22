import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../../..";

const StyledCategory = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) =>
    props.num === 1
      ? "0px 0px 10px 2px rgb(0 0 0 / 43%) inset"
      : "0px 0px 10px 2px rgba(34, 60, 80, 0.2) inset"};
  border-radius: 16px;
  background: ${(props) =>
    props.selected ? props.theme.select : "transparent"};
`;

const Image = styled.img`
  height: 35px;
  width: 35px;
  filter: ${(props) => (props.theme === 1 ? "invert(1)" : "")};
`;

function PicItem(props) {
  const { store } = useContext(Context);
  const [isSelected, setSelected] = useState(false);

  function toggleSelect() {
    setSelected(!isSelected);
    props.setCategory(props.id);
    props.close();
    props.setPic(props.url);
  }

  return (
    <StyledCategory
      theme={store.allThemes[store.theme]}
      num={store.theme}
      onClick={toggleSelect}
      selected={props.selected === props.url}
    >
      <Image theme={store.theme} src={props.url} />
    </StyledCategory>
  );
}

export default observer(PicItem);

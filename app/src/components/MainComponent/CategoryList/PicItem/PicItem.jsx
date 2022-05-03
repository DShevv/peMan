import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

const StyledCategory = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 19px -6px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background: ${(props) => (props.selected ? "#87f4fa" : "transparent")};
`;

const Image = styled.img`
  height: 35px;
  width: 35px;
`;

function PicItem(props) {
  const [isSelected, setSelected] = useState(false);

  function toggleSelect() {
    setSelected(!isSelected);
    props.setCategory(props.id);
    props.close();
    props.setPic(props.url);
  }

  return (
    <StyledCategory
      onClick={toggleSelect}
      selected={props.selected === props.url}
    >
      <Image src={props.url} />
    </StyledCategory>
  );
}

export default observer(PicItem);

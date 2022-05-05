import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../..";

const StyledCategory = styled.div`
  position: relative;
  width: 100%;
  background-color: ${(props) => props.theme.item};
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  min-height: 50px;
  padding: 10px 10px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  overflow: hidden;

  :hover {
    background: ${(props) => props.theme.hover};
  }
`;

const Image = styled.img`
  flex: 0 0 auto;
  height: 30px;
  width: 30px;
  object-position: center;
  object-fit: cover;
  filter: ${(props) => (props.theme === 1 ? "invert(1)" : "")};
`;

const Title = styled.div`
  flex: 1 0 auto;
  text-align: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: ${(props) => props.theme.text};
`;

const Elem = styled.div`
  width: 70px;
  text-align: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: ${(props) => props.theme.text};
`;

const Category = styled.div`
  display: flex;
  max-width: 200px;
  align-items: center;
  overflow: hidden;
`;

function StatCategory(props) {
  const { store } = useContext(Context);

  return (
    <StyledCategory theme={store.allThemes[store.theme]}>
      <Category>
        <Image theme={store.theme} src={props.category.pic} />
        <Title theme={store.allThemes[store.theme]}>
          {props.category.name}
        </Title>
      </Category>
      <Elem theme={store.allThemes[store.theme]}>{props.data.value}</Elem>
    </StyledCategory>
  );
}

export default observer(StatCategory);

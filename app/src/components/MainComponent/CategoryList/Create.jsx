import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import UserService from "../../../services/userService";
import PicSelector from "./PicSelector";

const StyledCategory = styled.div`
  flex: ${(props) => (props.opened ? "0 0 100%" : "0 0 70px")};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 10px 15px;
  transition: all 0.2s ease-in-out;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
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
  cursor: pointer;
  transition: all 0.2s ease-in;
  box-shadow: 0px 0px 19px -6px rgba(0, 0, 0, 0.25);

  :hover {
    background: #a4ebf3;
  }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextInput = styled.input`
  height: 52px;
  padding: 7px 26px;
  background: #ffffff;
  box-shadow: 0px 0px 19px -6px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: #4b4b4b;
  border: none;
  outline: none;

  ::placeholder {
    color: #5c5c5c;
  }
`;

const Caption = styled.div`
  width: 100%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  display: flex;
  justify-content: center;
  color: #4b4b4b;
`;

function useOutsideClick(ref, toggle) {
  useEffect(() => {
    function handelClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggle(false);
      }
    }

    document.addEventListener("mousedown", handelClickOutside);
    return () => {
      document.removeEventListener("mousedown", handelClickOutside);
    };
  }, [ref, toggle]);
}

function Create(props) {
  const { store } = useContext(Context);
  const [category, setCategory] = useState({});
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, props.toggle);

  function changePic(pic) {
    setCategory({ ...category, pic });
  }

  async function createCategory() {
    try {
      if (
        category.pic === undefined ||
        category.name === undefined ||
        category.name.length < 2
      ) {
        console.log("nelza"); ////////////////////////////////////////////////
      } else {
        await UserService.createCategory(
          store.user,
          category.name,
          category.pic
        );
        props.toggle(false);
      }
    } catch (error) {}
  }

  return (
    <StyledCategory opened={props.creation} ref={wrapperRef}>
      {props.creation ? (
        <Container>
          <Caption>Создание категории</Caption>
          <PicSelector setCategory={changePic} category={category} />
          <TextInput
            type="text"
            placeholder="Название"
            onChange={(e) => {
              setCategory({ ...category, name: e.target.value });
            }}
          />
          <Button onClick={createCategory}>Создать</Button>
        </Container>
      ) : (
        <Button onClick={props.toggle}>Создать</Button>
      )}
    </StyledCategory>
  );
}

export default observer(Create);

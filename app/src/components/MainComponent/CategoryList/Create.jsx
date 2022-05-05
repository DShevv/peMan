import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import UserService from "../../../services/userService";
import PicSelector from "./PicSelector";
import { toast } from "react-toastify";

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
  background: ${(props) => props.theme.primary};
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  transition: all 0.2s ease-in;
  box-shadow: 0px 0px 19px -6px rgba(0, 0, 0, 0.25);

  :hover {
    background: ${(props) => props.theme.hover};
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
  background: ${(props) => props.theme.item};
  box-shadow: 0px 0px 19px -6px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.text};
  border: none;
  outline: none;

  ::placeholder {
    color: ${(props) => props.theme.textDark};
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
  color: ${(props) => props.theme.text};
`;

function useOutsideClick(ref, toggle, setCategory) {
  useEffect(() => {
    function handelClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggle(false);
        setCategory({});
      }
    }

    document.addEventListener("mousedown", handelClickOutside);
    return () => {
      document.removeEventListener("mousedown", handelClickOutside);
    };
  }, [ref, toggle, setCategory]);
}

function Create(props) {
  const { store } = useContext(Context);
  const [category, setCategory] = useState({});
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, props.toggle, setCategory);

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
        console.log(category.pic);
        if (category.pic === undefined) {
          toast.warn("Не выбрана иконка");
        } else {
          toast.warn("Минимальная длинна названия 2 символа");
        }
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
          <Caption theme={store.allThemes[store.theme]}>
            Создание категории
          </Caption>
          <PicSelector setCategory={changePic} category={category} />
          <TextInput
            theme={store.allThemes[store.theme]}
            type="text"
            placeholder="Название"
            onChange={(e) => {
              setCategory({ ...category, name: e.target.value });
            }}
          />
          <Button theme={store.allThemes[store.theme]} onClick={createCategory}>
            Создать
          </Button>
        </Container>
      ) : (
        <Button theme={store.allThemes[store.theme]} onClick={props.toggle}>
          Создать
        </Button>
      )}
    </StyledCategory>
  );
}

export default observer(Create);

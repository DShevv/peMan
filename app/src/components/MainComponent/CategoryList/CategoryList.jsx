import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import UserService from "../../../services/userService";
import { Context } from "../../..";
import Category from "./Category";
import Create from "./Create";
import AddSpend from "./AddSpend/AddSpend";
import { toast } from "react-toastify";

const StyledList = styled.div`
  position: relative;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;

  flex: 1 1 0;
  row-gap: 10px;
  box-shadow: ${(props) =>
    props.theme === 1
      ? "0px 0px 10px 2px rgb(0 0 0 / 43%) inset"
      : "0px 0px 10px 2px rgba(34, 60, 80, 0.2) inset"};
  overflow-y: scroll;
  overflow: scroll;
  max-height: ${(props) => (props.creation ? "0" : "1000px")};
  padding: ${(props) =>
    props.creation ? "0px 0px 0px 0px" : "10px 10px 10px 15px"};
  border-bottom: 5px solid transparent;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-radius: 16px;
  border: ${(props) => (props.creation ? "0" : "auto")};
  transition: all 0.2s ease-in-out;

  ::-webkit-scrollbar {
    display: block;
    width: 5px;
    height: 80%;
  }
  ::-webkit-scrollbar-track {
    height: 80%;
    background-color: transparent;
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;

    background-color: #97dce489;
  }

  ::-webkit-scrollbar-button {
    height: 5px;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-width: 330px;
  background-color: ${(props) => props.theme.secondary};
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
  border-bottom: 5px solid transparent;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-radius: 16px;
`;

function CategoryList(props) {
  const [categories, setCategories] = useState(null);
  const [isCreation, setIsCreation] = useState(false);
  const [selected, setSelected] = useState(null);
  const { store } = useContext(Context);

  function Select(id) {
    setSelected(id);
  }

  async function getCategories() {
    try {
      const response = await UserService.fetchCategories(store.user.id);
      setCategories(response.data);
      store.setCategories(response.data);
    } catch (error) {
      toast.warn("Не удалось получить данные");
    }
  }

  function ToggleIsCreation(value) {
    setIsCreation(value);
  }

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    getCategories();
  }, [isCreation]);

  useEffect(() => {}, [categories]);

  return (
    <Container theme={store.allThemes[store.theme]}>
      <StyledList creation={isCreation} theme={store.theme}>
        {categories === null
          ? "loading..."
          : categories.map((elem) => {
              return (
                <Category
                  key={elem.id}
                  id={elem.id}
                  pic={elem.Pic}
                  title={elem.Name}
                  user={elem.Usert}
                  getCategories={getCategories}
                  selected={selected === elem.id ? true : false}
                  click={Select}
                />
              );
            })}
      </StyledList>
      <Create creation={isCreation} toggle={ToggleIsCreation} />
      <AddSpend click={Select} category={selected} />
    </Container>
  );
}

export default observer(CategoryList);

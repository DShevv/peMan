import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import SortPanel from "./SortPanel";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../..";
import Operation from "./Operation";
import UserService from "../../../services/userService";

const Conatiner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  max-width: 330px;

  background-color: ${(props) => props.theme.secondary};
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
  padding: 5px;
  border-radius: 16px;
`;

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

function OperationsList(props) {
  const { store } = useContext(Context);
  const [selected, setSelected] = useState({ pos: 1, up: false });
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    try {
      const response = await UserService.fetchCategories(store.user.id);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setCategories(null);
    getCategories();
  }, [store.spendings, store.categodies]);

  function compare(a, b) {
    if (selected.pos === 1) {
      let date1 = new Date(a?.Date);
      let date2 = new Date(b?.Date);
      if (date1 > date2) {
        return selected.up ? 1 : -1;
      }
      if (date1 < date2) {
        return selected.up ? -1 : 1;
      }
      return 0;
    }
    if (selected.pos === 2) {
      if (store.spendings !== null) {
        let cat1 = a.Category;
        let cat2 = b.Category;
        if (cat1 > cat2) {
          return selected.up ? 1 : -1;
        }
        if (cat1 < cat2) {
          return selected.up ? -1 : 1;
        }
        return 0;
      }
    }
    if (selected.pos === 3) {
      if (a.Value > b.Value) {
        return selected.up ? 1 : -1;
      }
      if (a.Value < b.Value) {
        return selected.up ? -1 : 1;
      }
      return 0;
    }
  }

  function changeSelected(data) {
    setSelected(data);
  }

  return (
    <Conatiner theme={store.allThemes[store.theme]}>
      <SortPanel selected={selected} changeSelected={changeSelected} />
      <StyledList theme={store.theme}>
        {store.spendings !== null
          ? store.spendings
              .slice()
              .sort(compare)
              .map((elem) => {
                return (
                  <Operation
                    key={elem.id}
                    data={elem}
                    category={
                      categories !== null
                        ? categories.find((cat) => cat.id === elem.Category)
                        : ""
                    }
                  />
                );
              })
          : ""}
      </StyledList>
    </Conatiner>
  );
}

export default observer(OperationsList);

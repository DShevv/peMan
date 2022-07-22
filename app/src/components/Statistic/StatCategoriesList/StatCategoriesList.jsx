import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import SortPanel from "./SortPanel";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../..";
import StatCategory from "./StatCategory";
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

function StatCategoriesList(props) {
  const { store } = useContext(Context);
  const [selected, setSelected] = useState({ pos: 2, up: false });
  const [allCategories, setCategories] = useState(null);
  const [curCat, setCurCat] = useState(null);

  async function getCategories() {
    try {
      const response = await UserService.fetchCategories(store.user.id);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, [store.spendings]);

  useEffect(() => {
    if (store.spendings !== null) {
      const categories = store.spendings
        .map((elem) => elem.Category)
        .filter((value, index, arr) => {
          return arr.indexOf(value) === index;
        });
      const spendingsPerCategory = categories.map((elem) => {
        let sum = store.spendings
          .filter((value) => value.Category === elem)
          .reduce((prev, curr) => prev + curr.Value, 0);
        return {
          name:
            allCategories !== null
              ? allCategories.find((cat) => cat.id == elem).Name
              : "",
          value: sum,
          pic:
            allCategories !== null
              ? allCategories.find((cat) => cat.id == elem).Pic
              : "",
        };
      });
      setCurCat(spendingsPerCategory);
    } else {
      setCurCat(null);
    }
  }, [allCategories]);

  function compare(a, b) {
    if (selected.pos === 1) {
      if (store.spendings !== null) {
        let cat1 = a.name;
        let cat2 = b.name;
        if (cat1 > cat2) {
          return selected.up ? 1 : -1;
        }
        if (cat1 < cat2) {
          return selected.up ? -1 : 1;
        }
        return 0;
      }
    }
    if (selected.pos === 2) {
      if (a.value > b.value) {
        return selected.up ? 1 : -1;
      }
      if (a.value < b.value) {
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
        {curCat !== null
          ? curCat.sort(compare).map((elem, index) => {
              return (
                <StatCategory
                  key={`${elem.name}${index}`}
                  data={elem}
                  category={elem}
                />
              );
            })
          : ""}
      </StyledList>
    </Conatiner>
  );
}

export default observer(StatCategoriesList);

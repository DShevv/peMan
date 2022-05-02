import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../../..";
import { useEffect } from "react";
import UserService from "../../../../services/userService";

const Container = styled.div`
  height: 100%;
  min-width: 322px;
  flex: 0 1 40%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 10px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
  padding: 10px;
`;

const TextField = styled.div`
  display: flex;
  align-items: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #4b4b4b;
`;

function PeriodStatComponent() {
  const { store } = useContext(Context);
  const [stat, setStat] = useState({
    sum: null,
    count: null,
    categories: null,
    max: null,
  });
  const [allCategories, setCategories] = useState(null);

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
  }, []);

  //сумма затрат за период, количество операций, количество категорий и категория с наибольшей суммой затарт
  useEffect(() => {
    if (store.spendings !== null) {
      const sum = store.spendings.reduce((prev, cur) => prev + cur.Value, 0);
      const count = store.spendings.length;
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
      const max = spendingsPerCategory.reduce((prev, cur) =>
        prev.value > cur.value ? prev : cur
      );

      setStat({
        sum,
        count,
        categories: categories.length,
        max,
      });
    } else {
      setStat({
        sum: null,
        count: null,
        categories: null,
        max: null,
      });
    }
  }, [store.spendings, allCategories]);

  return stat.sum !== null ? (
    <Container>
      <TextField>Сумма: {stat.sum}</TextField>
      <TextField>Всего операций: {stat.count}</TextField>
      <TextField>Всего категорий: {stat.categories}</TextField>
      <TextField>Наибольшая категория расходов: {stat.max.value}</TextField>
    </Container>
  ) : (
    <Container>
      <TextField>Недостаточно данных</TextField>
    </Container>
  );
}

export default observer(PeriodStatComponent);

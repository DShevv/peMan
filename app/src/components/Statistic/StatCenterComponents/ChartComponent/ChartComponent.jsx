import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../../..";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import UserService from "../../../../services/userService";

const Container = styled.div`
  background-color: #ffffff;
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  padding: 10px;
  box-shadow: 0px 1px 11px -2px rgb(0 0 0 / 25%);
  border-radius: 16px;
  justify-content: space-between;
  align-items: center;
`;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
];

function ChartComponent() {
  const { store } = useContext(Context);
  const [data, setData] = useState([]);
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

  useEffect(() => {}, [curCat]);

  useEffect(() => {
    getCategories();
  }, [store.categodies]);

  useEffect(() => {
    if (store.spendings !== null) {
      let catIds = store.spendings
        .slice()
        .map((elem) => elem.Category)
        .filter((value, index, arr) => {
          return arr.indexOf(value) === index;
        });

      let catData = catIds.map((elem) =>
        allCategories !== null
          ? allCategories.find((cat) => cat.id == elem).Name
          : ""
      );
      setCurCat(catData);

      const days = [];
      for (let index = 0; index < store.period.length; index++) {
        days.push(store.selectedPeriod.start + index * 24 * 60 * 60 * 1000);
      }

      const spendingsPerDay = days.map((elem) => {
        let spendings = store.spendings.filter(
          (value) => new Date(value.Date).getTime() === new Date(elem).getTime()
        );

        let categories = spendings
          .map((elem) => elem.Category)
          .filter((value, index, arr) => {
            return arr.indexOf(value) === index;
          });

        let spendingsPerCategory = categories.map((elem) => {
          let sum = store.spendings
            .filter((value) => value.Category === elem)
            .reduce((prev, curr) => prev + curr.Value, 0);
          return {
            name:
              allCategories !== null
                ? allCategories.find((cat) => cat.id == elem).Name
                : "",
            value: sum,
          };
        });

        let res = {
          day: new Date(elem).toLocaleDateString().slice(0, 5),
        };
        spendingsPerCategory.forEach((elem) => {
          res[elem.name] = elem.value;
        });
        return res;
      });
      setData(spendingsPerDay);
    } else {
      setData([]);
      setCurCat(null);
    }
  }, [store.spendings, allCategories]);

  return store.spendings === null ? (
    <Container>no data</Container>
  ) : (
    <Container>
      <ResponsiveContainer>
        <BarChart
          width="100%"
          height="100%"
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          {curCat !== null
            ? curCat.map((elem, index) => {
                return (
                  <Bar
                    key={`${elem}${index}`}
                    dataKey={elem}
                    stackId="a"
                    fill={COLORS[index % COLORS.length]}
                    legendType="none"
                  />
                );
              })
            : ""}
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default observer(ChartComponent);

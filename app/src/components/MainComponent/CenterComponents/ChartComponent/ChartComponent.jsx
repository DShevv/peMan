import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../../..";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { useEffect } from "react";
import UserService from "../../../../services/userService";

const Container = styled.div`
  background-color: ${(props) => props.theme.secondary};
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  padding: 10px;
  box-shadow: 0px 1px 11px -2px rgb(0 0 0 / 25%);
  border-radius: 16px;
  justify-content: space-between;
  align-items: center;
`;

const TextField = styled.text`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
`;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    textC,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <TextField x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </TextField>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <TextField
        x={ex + (cos >= 0 ? 1 : -1) * 30}
        y={ey}
        textAnchor={textAnchor}
        fill={textC}
      >{`${value}`}</TextField>
      <TextField
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey + 10}
        dy={18}
        textAnchor={textAnchor}
        fill={textC}
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </TextField>
    </g>
  );
};

function ChartComponent() {
  const { store } = useContext(Context);
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [allCategories, setCategories] = useState(null);

  async function getCategories() {
    try {
      const response = await UserService.fetchCategories(store.user.id);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  useEffect(() => {
    getCategories();
  }, [store.categodies]);

  useEffect(() => {
    if (store.spendings !== null) {
      let categories = store.spendings
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
      setData(spendingsPerCategory);
    } else {
      setData([]);
    }
  }, [store.spendings, allCategories]);

  return (
    <Container theme={store.allThemes[store.theme]}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="70%"
            dataKey="value"
            onMouseEnter={onPieEnter}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                textC={store.allThemes[store.theme].text}
                style={{
                  filter: `drop-shadow(0px 1px 11px rgb(0 0 0 / 25%)`,
                  WebkitFilter: `drop-shadow(0px 1px 11px rgb(0 0 0 / 25%)`,
                }}
                stroke={0}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default observer(ChartComponent);

import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

const StyledCategory = styled.div`
  position: relative;
  width: 100%;
  background-color: ${(props) => (props.select ? "#a4ebf3" : "#f4f9f9")};
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
    background: #a4ebf3;
  }
`;

const Image = styled.img`
  flex: 0 0 auto;
  height: 30px;
  width: 30px;
  object-position: center;
  object-fit: cover;
`;

const Title = styled.div`
  flex: 1 0 auto;
  text-align: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: #4b4b4b;
`;

const Elem = styled.div`
  width: 70px;
  text-align: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  color: #4b4b4b;
`;

const Category = styled.div`
  display: flex;
  max-width: 200px;
  align-items: center;
  overflow: hidden;
`;

function StatCategory(props) {
  return (
    <StyledCategory>
      <Category>
        <Image src={props.category.pic} />
        <Title>{props.category.name}</Title>
      </Category>
      <Elem>{props.data.value}</Elem>
    </StyledCategory>
  );
}

export default observer(StatCategory);

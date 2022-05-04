import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import CategoryList from "./CategoryList/CategoryList";
import CenterComponents from "./CenterComponents/CenterComponents";
import OperationsList from "./OperationsList/OperationsList";
import { useContext } from "react";
import { Context } from "../..";
import { useEffect } from "react";
import { toast } from "react-toastify";
import UserService from "../../services/userService";

const StyledMain = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  display: flex;
  column-gap: 20px;
`;

function MainComponent() {
  const { store } = useContext(Context);

  useEffect(() => {
    store.fetchPeriod();
  }, []);

  useEffect(() => {
    if (store.periodSpend !== null) {
      store.periodSpend.forEach((elem) => {
        if (
          new Date(
            new Date(elem.Date).getTime() + Number(elem.NotiDelta)
          ).setHours(0, 0, 0, 0) === new Date(Date.now()).setHours(0, 0, 0, 0)
        ) {
          toast.info("Напоминани о платеже ", { autoClose: false });
          UserService.nextPeriodSpend(elem.id);
        }
      });
    }
  }, [store.periodSpend]);

  return (
    <StyledMain>
      <CategoryList />
      <CenterComponents />
      <OperationsList />
    </StyledMain>
  );
}

export default observer(MainComponent);

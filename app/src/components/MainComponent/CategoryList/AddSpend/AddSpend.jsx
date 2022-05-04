import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Context } from "../../../..";
import done from "../../../../accets/done.svg";
import UserService from "../../../../services/userService";
import { toast } from "react-toastify";

const Container = styled.div`
  position: absolute;
  max-height: 470px;
  left: 104%;
  background-color: #ffffff;
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  visibility: ${(props) => (props.opened ? "visible" : "hidden")};
  width: ${(props) => (props.opened ? "100%" : "0%")};
  padding: ${(props) => (props.opened ? "10px" : "0px")};
  border-radius: 10px;
  transition: all 0.1s ease-in-out;
  overflow: hidden;
  row-gap: 20px;
  z-index: 10;
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

const TextInput = styled.input`
  width: 100%;
  min-width: 100%;
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

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  [type="number"] {
    -moz-appearance: textfield;
  }
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

const Checkbox = styled.input`
  width: 25px;
  height: 25px;
  border-radius: 7px;
  border: 1px solid #a4ebf3;
  appearance: none;
  outline: none;
  cursor: pointer;

  :checked {
    background-image: url(${done});
    background-position: 10% 50%;
    background-repeat: no-repeat;
    background-size: 130%;
  }
`;

const Check = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const Label = styled.label`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  display: flex;
  justify-content: center;
  color: #4b4b4b;
  cursor: pointer;
`;

const PeriodCont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

function useOutsideClick(ref, setOpened, clearCategory) {
  useEffect(() => {
    function handelClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpened(false);
        clearCategory(null);
      }
    }

    document.addEventListener("mousedown", handelClickOutside);
    return () => {
      document.removeEventListener("mousedown", handelClickOutside);
    };
  }, [ref, setOpened, clearCategory]);
}

function AddSpend(props) {
  const { store } = useContext(Context);
  const [opened, setOpened] = useState(null);
  const [spend, setSpend] = useState({
    category: props.category,
    value: null,
    date: null,
    nextPay: null,
    NotiDate: null,
    isPeriod: false,
  });
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, setOpened, props.click);

  useEffect(() => {
    setOpened(props.category === null ? false : true);
  }, [props.category]);

  async function checkAndCreate() {
    try {
      let error = false;
      if (spend.value === null || spend.date === null) {
        toast.warn("Неверно введены данные");
        error = true;
      }
      if (
        spend.isPeriod &&
        (spend.nextPay === null || spend.NotiDate === null)
      ) {
        error = true;

        toast.warn("Неверно введены данные");
      }
      if (spend.value < 0) {
        error = true;

        toast.warn("Сумма не может быть меньше 0");
      }
      let delta = null;
      let notiDelta = null;
      let date = Date.parse(spend.date);
      if (spend.isPeriod) {
        let next = Date.parse(spend.nextPay);
        let noti = Date.parse(spend.NotiDate);

        if (date >= next || noti <= Date.now() || noti > next) {
          error = true;

          if (date >= next) {
            toast.warn("Следующий платёж должен быть позже даты платежа");
          } else if (noti > next) {
            toast.warn(
              "Дата напоминания не может быть позже даты следующего платежа"
            );
          } else {
            toast.warn("Минимальная дата напоминания - завтра");
          }
        } else {
          delta = next - date;
          notiDelta = noti - date;
        }
      }

      if (!error) {
        await UserService.createSpendings(
          store.user.id,
          props.category,
          spend.value,
          1,
          date,
          spend.isPeriod,
          delta,
          notiDelta
        );
        await store.fetchSpendings();
        setOpened(false);
        props.click(null);
      }
    } catch (error) {
      toast.warn(error?.message);
    }
  }

  return (
    <Container ref={wrapperRef} opened={opened}>
      <Caption>Добавление платежа</Caption>
      <TextInput
        type="number"
        placeholder="Сумма"
        onChange={(e) => {
          setSpend({ ...spend, value: e.target.value });
        }}
      />
      <TextInput
        type="text"
        onChange={(e) => {
          setSpend({ ...spend, date: e.target.value });
        }}
        onFocus={(e) => {
          e.target.type = "date";
        }}
        onBlur={(e) => {
          e.target.type = "text";
        }}
        placeholder="Дата платежа"
      />
      <Check>
        <Checkbox
          id="Period"
          type="checkbox"
          onChange={(e) => {
            setSpend({ ...spend, isPeriod: e.target.checked });
          }}
        />
        <Label htmlFor="Period">Периодический</Label>
      </Check>

      {!spend.isPeriod ? (
        ""
      ) : (
        <PeriodCont>
          <TextInput
            type="text"
            onChange={(e) => {
              setSpend({ ...spend, nextPay: e.target.value });
            }}
            onFocus={(e) => {
              e.target.type = "date";
            }}
            onBlur={(e) => {
              e.target.type = "text";
            }}
            placeholder="Следующий платёж"
          />
          <TextInput
            type="text"
            onChange={(e) => {
              setSpend({ ...spend, NotiDate: e.target.value });
            }}
            onFocus={(e) => {
              e.target.type = "date";
            }}
            onBlur={(e) => {
              e.target.type = "text";
            }}
            placeholder="Напомнить"
          />
        </PeriodCont>
      )}

      <Button onClick={checkAndCreate}>Добавить</Button>
    </Container>
  );
}

export default observer(AddSpend);

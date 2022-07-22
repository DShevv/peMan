import React, { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../../../..";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
  box-shadow: 0px 1px 11px -2px rgb(0 0 0 / 25%);
  padding: 5px 10px;
  background: ${(props) => props.theme.light};
  width: 100%;
`;

const Text = styled.div`
  width: 100%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  color: ${(props) => props.theme.text};
  text-align: center;
  cursor: pointer;
`;

const TextInput = styled.input`
  width: 100%;
  min-width: 100%;
  height: 52px;
  padding: 7px 26px;
  background: ${(props) => props.theme.secondary};
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

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  [type="number"] {
    -moz-appearance: textfield;
  }
`;

const CreationCont = styled.div`
  position: absolute;
  display: flex;
  max-height: ${(props) => (props.opened ? "1000px" : "0px")};
  overflow: hidden;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
  background: ${(props) => props.theme.light};
  padding: ${(props) => (props.opened ? "10px" : "0")};
  top: 150%;
  border-radius: 10px;
  box-shadow: 0px 0px 19px -6px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in-out;
  z-index: 10;
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

function useOutsideClick(ref, secondRef, setOpened, isOpened) {
  useEffect(() => {
    function handelClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpened(false);
      } else {
        if (
          secondRef.current !== event.target &&
          !secondRef.current.contains(event.target)
        ) {
          setOpened(!isOpened);
        }
      }
    }

    document.addEventListener("mousedown", handelClickOutside);
    return () => {
      document.removeEventListener("mousedown", handelClickOutside);
    };
  }, [ref, secondRef, setOpened, isOpened]);
}

function PeriodSize(props) {
  const { store } = useContext(Context);
  const [isOpened, setIsOpened] = useState(false);
  const [period, setPeriod] = useState({ ...store.period });
  const [newPeriod, setNewPeriod] = useState({ ...store.period });
  const wrapperRef = useRef(null);
  const ChangeRef = useRef(null);
  useOutsideClick(wrapperRef, ChangeRef, setIsOpened, isOpened);

  useEffect(() => {
    localStorage.setItem("period", JSON.stringify(store.period));
    checkDate({ ...store.period });
  }, [store.period]);

  useEffect(() => {
    if (props.move !== null) {
      if (props.move) {
        setPeriod({
          ...period,
          startDate:
            period.startDate + store.period.length * 24 * 60 * 60 * 1000,
        });
      } else {
        setPeriod({
          ...period,
          startDate:
            period.startDate - store.period.length * 24 * 60 * 60 * 1000,
        });
      }

      props.clearMove();
    }
  }, [props.move]);

  useEffect(() => {
    store.setCurrentPeriod({
      start: period.startDate,
      end:
        period.startDate +
        period.length * 24 * 60 * 60 * 1000 -
        24 * 60 * 60 * 1000,
    });
  }, [period]);

  function checkDate(test) {
    let now = Date.now();
    let calc;
    let calc2;

    calc = Math.floor(
      Math.abs(now - store.period.startDate) /
        (1000 * 60 * 60 * 24 * store.period.length)
    );
    calc = now >= store.period.startDate ? calc : -calc - 1;
    calc2 =
      store.period.startDate + store.period.length * 24 * 60 * 60 * 1000 * calc;
    setPeriod({
      startDate: calc2,
      length: store.period.length,
    });
    store.setCurrentPeriod({
      start: period.startDate,
      end: period.startDate + period.length * 24 * 60 * 60 * 1000,
    });
  }

  function changeClick() {
    let error = false;
    if (newPeriod.length < 1) {
      error = true;
    }
    if (error) {
      console.log(error);
    } else {
      store.setPeriod(newPeriod);
      setIsOpened(false);
    }
  }

  return (
    <Container ref={wrapperRef} theme={store.allThemes[store.theme]}>
      <Text theme={store.allThemes[store.theme]}>
        {`${new Date(period.startDate)
          .toLocaleDateString()
          .slice(0, 5)} по ${new Date(
          period.startDate +
            period.length * 24 * 60 * 60 * 1000 -
            24 * 60 * 60 * 1000
        )
          .toLocaleDateString()
          .slice(0, 5)}`}
      </Text>

      <CreationCont
        theme={store.allThemes[store.theme]}
        ref={ChangeRef}
        opened={isOpened}
      >
        <TextInput
          theme={store.allThemes[store.theme]}
          type="text"
          onChange={(e) => {
            setNewPeriod({
              ...newPeriod,
              startDate: Date.parse(e.target.value),
            });
          }}
          onFocus={(e) => {
            e.target.type = "date";
          }}
          onBlur={(e) => {
            e.target.type = "text";
          }}
          placeholder="Дата начала"
        />
        <TextInput
          theme={store.allThemes[store.theme]}
          type="number"
          min={1}
          onChange={(e) => {
            setNewPeriod({ ...newPeriod, length: e.target.value });
          }}
          placeholder="Количество дней"
        />

        <Button theme={store.allThemes[store.theme]} onClick={changeClick}>
          Изменить
        </Button>
      </CreationCont>
    </Container>
  );
}

export default PeriodSize;

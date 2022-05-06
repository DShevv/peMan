import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { useState, useRef, useEffect } from "react";
import arrow from "../accets/arrow.svg";

const PopBtn = styled.div`
  width: 20px;
  height: 20px;
  transform: ${(props) => (props.opened ? "rotate(270deg)" : "rotate(90deg)")};

  background-color: ${(props) => props.theme.hover};
  transition: all 0.2s ease-in-out;
  -webkit-mask: url(${arrow});
  mask-image: url(${arrow});
  mask-position: center;
  mask-size: contain;
  mask-repeat: no-repeat;
`;

const StyledHeader = styled.header`
  position: relative;
  height: 40px;
  min-width: 100px;

  padding: 0 15px;

  filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.25));
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.secondary};
  border-radius: 10px;
  cursor: pointer;
  z-index: 10;

  :hover ${PopBtn} {
    transform: ${(props) =>
      props.opened
        ? "rotate(270deg) translateX(2px)"
        : "rotate(90deg) translateX(2px)"};
  }
`;

const Round = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;

  background-color: ${(props) => props.color};
`;

const Container = styled.div`
  position: absolute;
  top: 120%;
  width: 100%;
  left: 0%;
  display: ${(props) => (props.opened ? "flex" : "none")};
  flex-direction: column;
  row-gap: 10px;
  height: fit-content;
  padding: 15px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.secondary};
  z-index: 11;
`;

const Main = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Line = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 26px;
  border-radius: 6px;

  :hover {
    background-color: ${(props) => props.theme.select};
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

function ColorSwitcher(props) {
  const { store } = useContext(Context);
  const [opened, setOpened] = useState(false);
  const wrapperRef = useRef(null);
  const ChangeRef = useRef(null);
  useOutsideClick(wrapperRef, ChangeRef, setOpened, opened);

  return (
    <StyledHeader
      ref={wrapperRef}
      theme={store.allThemes[store.theme]}
      opened={opened}
    >
      <Main>
        <Round color={store.allThemes[store.theme].hover} />
        <PopBtn
          opened={opened}
          num={store.theme}
          theme={store.allThemes[store.theme]}
        />
      </Main>

      <Container
        opened={opened}
        theme={store.allThemes[store.theme]}
        ref={ChangeRef}
      >
        {props.data.map((elem, index) => {
          return (
            <Line
              key={`${index}${elem.primary}`}
              theme={store.allThemes[store.theme]}
              onClick={(e) => {
                setOpened(false);
                store.setTheme(index);
                localStorage.setItem("theme", index);
              }}
            >
              <Round color={elem.hover} />
              <Round color={elem.primary} />
              <Round color={elem.backgroud} />
            </Line>
          );
        })}
      </Container>
    </StyledHeader>
  );
}

export default observer(ColorSwitcher);

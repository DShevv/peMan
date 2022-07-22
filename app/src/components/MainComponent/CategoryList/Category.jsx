import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import cross from "../../../accets/red-cross.svg";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import UserService from "../../../services/userService";

const DeleteBtn = styled.button`
  position: absolute;
  left: 120%;
  top: 50%;
  transform: translate(-100%, -50%);
  height: 30px;
  width: 30px;
  background: url(${cross});
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  outline: none;
  transition: all 0.2s ease-in-out;

  :hover {
    transform: translate(-100%, -50%) scale(1.1);
  }
`;

const StyledCategory = styled.div`
  position: relative;
  width: 100%;
  background-color: ${(props) =>
    props.select ? props.theme.hover : props.theme.item};
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
  display: flex;
  min-height: 50px;
  padding: 10px 10px;
  column-gap: 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  overflow: hidden;

  :hover {
    background: ${(props) => props.theme.hover};
  }
  :hover ${DeleteBtn} {
    left: 97%;
  }
`;

const Image = styled.img`
  height: 30px;
  width: 30px;
  object-position: center;
  object-fit: cover;
  filter: ${(props) => (props.theme === 1 ? "invert(1)" : "")};
`;

const Title = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  color: ${(props) => props.theme.text};
`;

const DelConfirm = styled.div`
  position: absolute;
  left: ${(props) => (props.comfirm ? "0%" : "100%")};
  top: 0%;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  color: #ffffff;
  background-color: #c70000;
  transition: all 0.2s ease-in-out;
`;

function useOutsideClick(ref, setDel) {
  useEffect(() => {
    function handelClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDel(false);
      }
    }

    document.addEventListener("mousedown", handelClickOutside);
    return () => {
      document.removeEventListener("mousedown", handelClickOutside);
    };
  }, [ref, setDel]);
}

function Category(props) {
  const { store } = useContext(Context);
  const [del, setDel] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, setDel);

  function select(e) {
    if (!del) {
      if (props.selected) {
        props.click(null);
      } else {
        props.click(props.id);
      }
    }
  }

  function delPress(e) {
    e.stopPropagation();
    setDel(true);
  }
  async function deleteCategory(e) {
    e.stopPropagation();
    try {
      await UserService.deleteCategory(props.id);
      props.getCategories();
    } catch (error) {}
  }

  return (
    <StyledCategory
      theme={store.allThemes[store.theme]}
      select={props.selected}
      onMouseDown={select}
    >
      <Image src={props.pic} theme={store.theme} />
      <Title theme={store.allThemes[store.theme]}> {props.title}</Title>
      {store.user.id === props.user ? <DeleteBtn onMouseDown={delPress} /> : ""}
      <DelConfirm ref={wrapperRef} comfirm={del} onMouseDown={deleteCategory}>
        Удалить
      </DelConfirm>
    </StyledCategory>
  );
}

export default observer(Category);

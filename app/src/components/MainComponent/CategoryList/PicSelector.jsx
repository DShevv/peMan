import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import UserService from "../../../services/userService";
import PicItem from "./PicItem/PicItem";
import { useContext } from "react";
import { Context } from "../../..";

const StyledCategory = styled.div`
  height: ${(props) => (props.opened ? "200px" : "52px")};
  padding: 7px 24px;
  background: ${(props) => props.theme.item};
  box-shadow: 0px 0px 19px -6px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  display: flex;
  align-items: ${(props) => (props.opened ? "flex-start" : "center")};
  justify-content: start;
  vertical-align: middle;
  flex-wrap: wrap;
  row-gap: 12px;
  column-gap: 12px;
  color: ${(props) => props.theme.text};
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  overflow-y: auto;

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

const Container = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;

const Image = styled.img`
  height: 30px;
  width: 30px;
  filter: ${(props) => (props.theme === 1 ? "invert(1)" : "")};
`;

const Caption = styled.div``;

function PicSelector(props) {
  const [selectedPic, setPic] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [pictures, setPictures] = useState(null);
  const { store } = useContext(Context);

  function toggle() {
    setIsOpened(!isOpened);
  }

  function setUrl(url) {
    setPic(url);
  }

  async function getPictures() {
    try {
      const response = await UserService.fetchPictures();
      setPictures(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPictures();
  }, [isOpened]);

  return (
    <StyledCategory
      theme={store.allThemes[store.theme]}
      opened={isOpened}
      onClick={toggle}
    >
      {isOpened ? (
        pictures === null ? (
          "loading..."
        ) : (
          pictures.map((elem) => {
            return (
              <PicItem
                selected={selectedPic}
                key={elem.id}
                id={elem.id}
                setCategory={props.setCategory}
                url={elem.Url}
                close={toggle}
                setPic={setUrl}
              />
            );
          })
        )
      ) : selectedPic == null ? (
        "Выберите иконку"
      ) : (
        <Container>
          <Image src={selectedPic} theme={store.theme} />
          <Caption>Выбранная иконка</Caption>
        </Container>
      )}
    </StyledCategory>
  );
}

export default observer(PicSelector);

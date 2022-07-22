import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import ColorSwitcher from "./ColorSwitcher";
import CurrencySwitcher from "./CurrencySwitcher";
import { useEffect } from "react";

const StyledHeader = styled.header`
  width: 100%;
  min-height: 60px;
  padding: 0 30px;
  display: flex;
  flex: 0 1 auto;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.25));
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.light};
  z-index: 10;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  padding: 2px 15px;
  font-size: 20px;
  line-height: 29px;
  border-radius: 10px;
  border: none;
  filter: drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.25));
  outline: none;
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.primary};
  cursor: pointer;
  transition: all 0.2s ease;

  :hover {
    background: ${(props) => props.theme.hover};
  }
`;

function Header(props) {
  const { store } = useContext(Context);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedCur = localStorage.getItem("cur");
    if (savedCur !== null) {
      store.setCurrency(savedCur);
    }
    if (savedTheme !== null) {
      store.setTheme(savedTheme);
    }
  }, []);

  return (
    <StyledHeader theme={store.allThemes[store.theme]}>
      {store.isAuth ? (
        <Container>
          <ColorSwitcher data={store.allThemes} />
          <Button
            theme={store.allThemes[store.theme]}
            onClick={(e) => store.logout()}
          >
            Выйти
          </Button>
          {store.allCurrency !== null ? (
            <CurrencySwitcher data={store.allCurrency} />
          ) : (
            ""
          )}
        </Container>
      ) : (
        <Container>"PeMan"</Container>
      )}
    </StyledHeader>
  );
}

export default observer(Header);

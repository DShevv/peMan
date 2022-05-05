import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "..";
import { observer } from "mobx-react-lite";

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
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Header(props) {
  const { store } = useContext(Context);
  return (
    <StyledHeader theme={store.allThemes[store.theme]}>
      <Container>
        {store.isAuth ? (
          <button onClick={(e) => store.logout()}>Выйти</button>
        ) : (
          "PeMan"
        )}
      </Container>
    </StyledHeader>
  );
}

export default observer(Header);

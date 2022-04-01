import React, { useContext } from "react";
import styled from "styled-components";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const StyledHeader = styled.header`
  width: 100%;
  min-height: 60px;
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
  color: #4b4b4b;
  background: #efffff;
`;

function Header(props) {
  const { store } = useContext(Context);
  return (
    <StyledHeader>
      PeMan {store.user.name}
      {store.isAuth ? (
        <button onClick={(e) => store.logout()}>Выйти</button>
      ) : (
        ""
      )}
    </StyledHeader>
  );
}

export default observer(Header);

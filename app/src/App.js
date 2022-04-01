import React, { useContext, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import styled from "styled-components";
import { Context } from ".";
import AuthForm from "./components/AuthForm/AuthForm";
import Header from "./components/header";
import { observer } from "mobx-react-lite";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
`;

function App() {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      {store.isLoading ? (
        <div>Loading...</div>
      ) : (
        <Main>
          <Routes>
            {store.isAuth ? (
              <Route index element={<div>po kaify</div>} />
            ) : (
              <Route index element={<AuthForm />} />
            )}
            {store.isAuth ? (
              <Route path="statistics" element={<div />} />
            ) : (
              <Route path="statistics" element={<AuthForm />} />
            )}
          </Routes>
        </Main>
      )}
    </BrowserRouter>
  );
}

export default observer(App);

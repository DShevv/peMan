import React, { useContext, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import styled from "styled-components";
import { Context } from ".";
import AuthForm from "./components/AuthForm/AuthForm";
import Header from "./components/header";
import { observer } from "mobx-react-lite";
import MainComponent from "./components/MainComponent/MainComponent";
import Statistic from "./components/Statistic/Statistic";

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
              <Route index element={<MainComponent />} />
            ) : (
              <Route index element={<AuthForm />} />
            )}
            {store.isAuth ? (
              <Route path="statistics" element={<Statistic />} />
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

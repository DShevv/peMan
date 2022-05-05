import React, { useContext, useEffect } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import styled from "styled-components";
import { Context } from ".";
import AuthForm from "./components/AuthForm/AuthForm";
import Header from "./components/header";
import { observer } from "mobx-react-lite";
import MainComponent from "./components/MainComponent/MainComponent";
import Statistic from "./components/Statistic/Statistic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  background-color: ${(props) => props.theme.backgroud};
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
        <Main theme={store.allThemes[store.theme]}>
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
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Main>
      )}
    </BrowserRouter>
  );
}

export default observer(App);

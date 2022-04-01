import React from "react";
import { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegisterForm";
import { observer } from "mobx-react-lite";

const StyledForm = styled.form`
  margin-top: 60px;
  margin-bottom: 60px;
  width: 410px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #efffff;
  box-shadow: 0px 0px 19px -6px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
`;

const SwitchBtn = styled.button`
  height: 56px;
  width: 252px;
  margin-bottom: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: #4b4b4b;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :hover {
    transform: scale(1.02);
  }
`;

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  function loginToggle(e) {
    e.preventDefault();
    setIsLogin(!isLogin);
  }

  return (
    <StyledForm autoComplete="on">
      {isLogin ? <LoginForm /> : <RegistrationForm />}
      <SwitchBtn onClick={loginToggle}>
        {isLogin ? "Регистрация" : "Вход"}
      </SwitchBtn>
    </StyledForm>
  );
}

export default observer(AuthForm);

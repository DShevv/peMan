import React, { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Context } from "../..";

const FromContainer = styled.div`
  width: 410px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  position: relative;
  top: -54px;
  width: 252px;
  margin-top: 27px;
  display: flex;
  justify-content: center;
  padding: 13px;
  background: ${(props) => props.theme.light};
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  color: ${(props) => props.theme.text};
  cursor: default;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 46px;
  margin-top: 20px;
  margin-bottom: 54px;
`;

const StyledInput = styled.input`
  height: 52px;
  padding: 7px 26px;
  background: ${(props) => props.theme.secondary};
  box-shadow: 0px 0px 19px -6px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.text};
  border: none;
  outline: none;

  ::placeholder {
    color: ${(props) => props.theme.textDark};
  }
`;

const SubmitBtn = styled.button`
  height: 56px;
  width: 252px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.hover};
  box-shadow: 0px 1px 11px -2px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.text};
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :hover {
    transform: scale(1.02);
  }
`;

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    first: "",
    second: "",
  });
  const [name, setName] = useState("");
  const { store } = useContext(Context);

  function submit(e) {
    e.preventDefault();

    if (
      password.first === password.second &&
      password.first.length > 2 &&
      name.length > 1
    ) {
      store.registration(email, password.first, name);
    } else {
      if (password.first.length < 3) {
        toast.warn("Минимальная длинна пароля 3 символа");
      } else if (name.length <= 1) {
        toast.warn("Имя не может быть меньше 2 символов");
      } else {
        toast.warn("Пароли не совпадают");
      }
    }
  }

  return (
    <FromContainer>
      <Title theme={store.allThemes[store.theme]}>Регистрация</Title>
      <InputContainer>
        <StyledInput
          theme={store.allThemes[store.theme]}
          name="email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledInput
          theme={store.allThemes[store.theme]}
          name="password"
          type="password"
          placeholder="Пароль"
          value={password.first}
          onChange={(e) => setPassword({ ...password, first: e.target.value })}
        />
        <StyledInput
          theme={store.allThemes[store.theme]}
          name="password"
          type="password"
          placeholder="Повторите пароль"
          value={password.second}
          onChange={(e) => setPassword({ ...password, second: e.target.value })}
        />
        <StyledInput
          theme={store.allThemes[store.theme]}
          name="Name"
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputContainer>
      <SubmitBtn theme={store.allThemes[store.theme]} onClick={submit}>
        Продолжить
      </SubmitBtn>
    </FromContainer>
  );
}

export default RegistrationForm;

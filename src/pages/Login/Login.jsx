import React, { useState } from "react";

import loginImage from "../../assets/images/login.png";
import { login } from "../../services/login";
import {
  Button,
  Container,
  Error,
  Form,
  ImageContainer,
  MainContainer
} from "./login.style";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameIsValid, setUserNameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  localStorage.setItem("language", "");

  const handleChange = (event) => {
    const lang = event.target.value;
    localStorage.setItem("language", lang);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userName.length < 1) {
      setUserNameIsValid(false);
    } else {
      setUserNameIsValid(true);
    }

    if (password.length < 1) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }

    if (password.length > 1 && userName.length > 1) {
      try {
        localStorage.setItem("userName", userName);
        localStorage.setItem("password", password);
        const data = await login(userName, password);
        console.log(`🚀🚀 🚀🚀🚀🚀🚀🚀`, data);
      } catch (error) {
        console.log(
          `🚀🚀 ~~ handleSubmit ~~ error`,
          error.response.data
        );
      }
    }
  };

  return (
    <MainContainer>
      <Container>
        <ImageContainer>
          <img src={loginImage} alt='login' />
        </ImageContainer>
        <select onChange={handleChange}>
          <option value='English'>English</option>
          <option value='arabic'>عربي</option>
        </select>
        <Form>
          <h2>Sign In</h2>
          <div>
            <input
              placeholder='User Name'
              type='text'
              value={userName}
              onChange={handleUserNameChange}
              required
            />
            {userNameIsValid ? (
              <Error />
            ) : (
              <Error>User Name is Required</Error>
            )}
          </div>
          <div>
            <input
              placeholder='Password'
              type='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordIsValid ? (
              <Error />
            ) : (
              <Error>Password is Required</Error>
            )}
          </div>
          <Button onClick={handleSubmit}>Sign In</Button>
        </Form>
      </Container>
    </MainContainer>
  );
}

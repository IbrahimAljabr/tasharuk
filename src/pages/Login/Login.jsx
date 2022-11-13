import React, { useState } from "react";

import loginImage from "../../assets/images/login.png";
import {
  Button,
  Container,
  Form,
  ImageContainer,
  MainContainer
} from "./login.style";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  localStorage.setItem("language", "");

  const handleChange = (event) => {
    const lang = event.target.value;
    localStorage.setItem("language", lang);
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
          <input
            placeholder='User Name'
            type='text'
            value={userName}
            required
            onChange={handleUserNameChange}
          />
          <input
            placeholder='Password'
            type='password'
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <Button>Sign In</Button>
        </Form>
      </Container>
    </MainContainer>
  );
}

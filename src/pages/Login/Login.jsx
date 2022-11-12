import React, { useState } from "react";

import loginImage from '../../assets/images/login.png';
import { Button, Container, Form, ImageContainer, MainContainer } from './login.style';

export default function Login() {

  const [input, setInput] = useState('')
  const handleInputChange = (e) => setInput(e.target.value)

  return (
    <MainContainer >
      <Container >
        <ImageContainer>
          <img src={loginImage} alt='login' />
        </ImageContainer>
        <Form>
          <h2>Sign In</h2>
          <input placeholder='User Name' type='text' value={input} required
            onChange={handleInputChange} />

          <input placeholder='Password' type='password' required
            value={input} onChange={handleInputChange} />

          <Button>Sign In</Button>

        </Form>
      </Container>
    </MainContainer>
  );
}

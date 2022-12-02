import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/login.png";
import Snackbars from "../../components/SnackBar";
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

  const [snack, setSnack] = useState({
    open: false,
    type: "success",
    message: ""
  });

  const navigate = useNavigate();
  const auth = cookie.get("auth");

  const { pathname } = useLocation();
  const userPath = pathname.split("/")?.[1] === "school-schema";

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
        if (userPath) {
          await login(userName, password);

          navigate("/questions", {
            state: {
              schemaId: pathname.split("/")?.[2],
              email: userName
            }
          });
        } else {
          await login(userName, password);
          cookie("auth", "Authenticated");
          navigate("/school-management");
        }

        setSnack({
          ...snack,
          open: true,
          message: "Welcome",
          type: "success"
        });
      } catch (error) {
        console.log(`📌 📁 ~ error`, error?.response?.data);
        setSnack({
          ...snack,
          open: true,
          message: "Wrong User Name OR Password",
          type: "error"
        });
      }
    }
  };

  useEffect(() => {
    if (!userPath && auth) {
      navigate("/school-management");
    } else if (userPath) {
      setUserName(pathname.split("/")?.[4]);
    }
  }, []);

  return (
    <MainContainer>
      <Container>
        <ImageContainer>
          <img src={loginImage} alt='login' />
        </ImageContainer>
        {/* <select onChange={handleChange}>
          <option value='English'>English</option>
          <option value='arabic'>عربي</option>
        </select> */}
        <Form>
          <h2>Sign In</h2>
          <div>
            <input
              placeholder='User Name'
              type='text'
              value={userName}
              onChange={handleUserNameChange}
              required
              autoComplete='off'
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
              autoComplete='off'
            />
            {passwordIsValid ? (
              <Error />
            ) : (
              <Error>Password is Required</Error>
            )}
          </div>
          <Button onClick={handleSubmit}>Sign In</Button>
        </Form>
        <Snackbars setOpen={setSnack} type={snack} />
      </Container>
    </MainContainer>
  );
}

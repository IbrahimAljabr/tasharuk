import styled from "styled-components";
import mq from "../../styles/media-query";

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35rem;
  height: 100%;
  flex-direction: column;

  input {
    padding: 1rem;
    margin: 1rem 0 0.5rem 0;
    border-radius: 0.5rem;
    border: 1px solid white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 20rem;
  }

  h2 {
    font-weight: 200;
  }
`;

export const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #edf0f6;
`;

export const Button = styled.button`
  background-color: #57c1b5;
  border-radius: 1rem;
  margin: 4rem 0;
  border: none;
  padding: 1rem 10rem;
  color: white;
  cursor: pointer;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;

  ${mq.desktop`
    width: 100%;
    height: 100%;
  `};

  select {
    background-color: white;
    padding: 0.5rem;
    position: absolute;
    right: 2rem;
    top: 2rem;
    border-radius: 0.5rem;
  }
`;

export const ImageContainer = styled.div`
  display: none;

  img {
    width: 100%;
    height: 100%;
  }

  ${mq.desktop`
    display: flex;
    justify-content: center;
    width: 70%;
    height: 100%;
  `};
`;

export const Error = styled.p`
  margin: 0;
  padding: 0;
  color: red;
  font-size: 0.8rem;
  text-align: left;
  height: 1rem;
`;

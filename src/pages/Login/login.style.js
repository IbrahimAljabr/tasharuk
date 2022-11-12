import styled from "styled-components";
import mq from "../../styles/media-query";

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rem;
  height: 100%;
  flex-direction: column;

  input {
    padding: 0.8rem;
    margin: 0.8rem 0;
    border-radius: 1rem;
    border: 1px solid white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 14rem;
  }

  h2 {
    padding-right: 15rem;
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
  margin: 1rem 0;
  border: none;
  padding: 0.8rem 7rem;
  color: white;
`;

export const Container = styled.div`
  width: 22rem;
  height: 20rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;

  ${mq.desktop`
    width: 60rem;
    height: 25rem;
  `};
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
    width: 30rem;
    height: 25rem;
  `};
`;

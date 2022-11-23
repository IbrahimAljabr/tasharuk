import styled from "styled-components";

export const SubContainer = styled.div`
  height: 8rem;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const OutLineButton = styled.div`
  padding: 0.5rem 6rem;
  background-color: #81d0c7;
  border-radius: 2rem;
  cursor: pointer;
  color: white;
  border: none;
`;

export const FileButton = styled.div`
  padding: 0.5rem 4rem;
  background-color: white;
  border-radius: 2rem;
  cursor: pointer;
  color: green;
  border: 1px solid gray;
  margin-top: 2rem;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const AddContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;

  input::-webkit-file-upload-button {
    padding: 0.5rem 1.5rem;
    background-color: white;
    border-radius: 2rem;
    cursor: pointer;
    color: green;
    border: 1px solid gray;
    margin-right: 2rem;
  }

  input {
    background-color: #f8f8f8;
  }
`;

export const Form = styled.div`
  display: flex;
  justify-content: space-around;
  width: 35rem;
  background-color: #f8f8f8;
  flex-wrap: wrap;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  div {
    margin-bottom: 1rem;
  }
`;

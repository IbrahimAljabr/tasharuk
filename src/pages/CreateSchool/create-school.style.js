import Select from "@mui/material/Select";
import styled from "styled-components";

export const SubContainer = styled.div`
  height: 8rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OutLineButton = styled.button`
  padding: 0.5rem 3rem;
  background-color: white;
  margin: 0 2rem 0 0;
  border: 1px solid gray;
  border-radius: 1rem;
  height: 2rem;
  cursor: pointer;
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ErrorText = styled.div`
  height: 2rem;
  font-size: 0.8rem;
  padding: 0;
  margin: 0;
  color: red;
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

  input {
    background-color: white;
  }
`;

export const SelectInput = styled(Select)`
  width: 10rem;
  background-color: white;
`;

import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers-pro";
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
  border-radius: 0.8rem;
  height: 2rem;
  cursor: pointer;
  max-width: 10rem;
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
  margin-bottom: 5rem;

  input {
    background-color: white;
  }
`;

export const SurveyForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 40rem;

  input {
    background-color: white;
  }
`;

export const SelectInput = styled(Select)`
  width: 15rem;
  background-color: white;
`;

export const TextInput = styled(TextField)`
  width: 15rem;
  background-color: white;
`;

export const DatePickerInput = styled(DatePicker)`
  width: 18rem;
  background-color: white;
  margin: 10rem;
  padding: 2rem;

  fieldset {
    border-color: lightgray !important;
  }

  label {
    color: gray !important;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    height: 3rem;
  }
`;

export const SelectInputContainer = styled.div`
  margin: 1rem 0;

  div {
    width: 100%;
  }
`;

export const PositionInput = styled.input`
  margin-left: 3rem;
`;

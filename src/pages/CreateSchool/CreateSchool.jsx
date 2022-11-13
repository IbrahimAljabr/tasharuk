import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormContainer,
  OutLineButton,
  SubContainer
} from "./create-school.style";

function CreateSchool({ lang }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  return (
    <Container dir={lang === "arabic" && "rtl"}>
      <SubContainer>
        <OutLineButton onClick={() => navigate("/survey")}>
          Survey
        </OutLineButton>
      </SubContainer>
      <FormContainer>
        <Form>
          <TextField
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            id='outlined-basic'
            label='School Name'
            variant='outlined'
          />
          <TextField
            id='outlined-basic'
            label='Contract Person'
            variant='outlined'
          />
          <TextField
            id='outlined-basic'
            label='Number of Students'
            variant='outlined'
          />
          <TextField
            id='outlined-basic'
            label='Phone Number'
            variant='outlined'
          />
          <TextField
            id='outlined-basic'
            label='NUmber Of Teachers'
            variant='outlined'
          />
          <TextField
            id='outlined-basic'
            label='Country'
            variant='outlined'
          />
          <TextField
            id='outlined-basic'
            label='Email'
            variant='outlined'
          />
          <TextField
            id='outlined-basic'
            label='Website'
            variant='outlined'
          />

          <OutLineButton
            onClick={() => navigate("/add-school-students")}
          >
            Next
          </OutLineButton>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default CreateSchool;

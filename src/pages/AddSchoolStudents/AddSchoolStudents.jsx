import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import {
  AddContainer,
  FileButton,
  Form,
  FormContainer,
  OutLineButton,
  SubContainer
} from "./add-school-students";

function AddSchoolStudents({ lang }) {
  const [name, setName] = useState("");
  return (
    <Container dir={lang === "arabic" && "rtl"}>
      <SubContainer></SubContainer>
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

          <AddContainer>
            <OutLineButton>Add</OutLineButton>
            <p>Or</p>
            <FileButton>Attached File </FileButton>
          </AddContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default AddSchoolStudents;

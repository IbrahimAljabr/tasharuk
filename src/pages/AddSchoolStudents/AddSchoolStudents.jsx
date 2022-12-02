import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Container from "@mui/material/Container";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbars from "../../components/SnackBar";
import {
  addSchoolUser,
  addUsersBulk,
  getAllPositions,
  getUsers
} from "../../services/school";
import {
  ErrorText,
  Form,
  FormContainer,
  SelectInput,
  SubContainer,
  TextInput
} from "../CreateSchool/create-school.style";
import {
  AddContainer,
  LineButton,
  OutLineButton
} from "./add-school-students";
import UsersTable from "./Table";

function AddSchoolStudents({ lang }) {
  const navigate = useNavigate();
  const companyId = useLocation()?.state?.row?.company_register_id;
  const auth = cookie.get("auth");

  const initialValue = {
    firstName: "",
    lastName: "",
    position: "",
    phoneNumber: "",
    email: "",
    password: ""
  };

  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState(initialValue);
  const [positions, setPositions] = useState([]);
  const [snack, setSnack] = useState({
    open: false,
    type: "success",
    message: ""
  });

  const id = useLocation()?.state?.row;
  console.log(`🚀🚀 ~~ AddSchoolStudents ~~ id`, id);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleInput = (event) => {
    const formData = new FormData();
    formData.append("users-csv", event.target.files[0]);
    // const body = event.target.files[0];

    uploadFile(id.company_register_id, formData);
  };

  const uploadFile = async (id, formData) => {
    try {
      const res = await addUsersBulk(id, formData);
      console.log(`🚀🚀 ~~ 🚀🚀 ~~ res 🚀🚀`, res);
      setSnack({
        ...snack,
        open: true,
        message: "File uploaded successfully",
        type: "success"
      });
    } catch (error) {
      console.log(`🚀🚀 ~~ 🚀🚀🚀🚀 ~~ error🚀🚀`, error);
      setSnack({
        ...snack,
        open: true,
        message: error?.response?.data?.error_message,
        type: "error"
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
  };

  const getAllSchoolUsers = async () => {
    const res = await getUsers(id.id);
    setData(res?.response_body);
  };

  useEffect(() => {
    if (auth) {
      getAllSchoolUsers();
    } else {
      navigate("/");
    }
  }, []);

  const validate = (value) => {
    const errors = {};

    if (!value.firstName) {
      errors.firstName = "First Name Is Required";
    }

    if (!value.lastName) {
      errors.lastName = "Last Name Is Required";
    }

    if (!value.position) {
      errors.position = "Position Is Required";
    }

    if (!value.password) {
      errors.password = "password Is Required";
    }

    if (!value.phoneNumber) {
      errors.phoneNumber = "Phone Number Is Required";
    }

    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!value.email) {
      errors.email = "Email Is Required";
    } else if (!regex.test(value.email)) {
      errors.email = "Email Is Not valid";
    }

    return errors;
  };

  const addStudents = async () => {
    const body = {
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      password: formValues.password,
      email: formValues.email,
      company_register_id: companyId,
      position_id: formValues.position,
      mobile_number: formValues.phoneNumber
    };

    try {
      const user = await addSchoolUser(body);
      setFormValues(initialValue);
      setFormErrors(initialValue);
      setSnack({
        ...snack,
        open: true,
        message: "User added successfully",
        type: "success"
      });
      navigate(`/create-survey`, {
        state: { user: user?.response_body, schoolId: id.id }
      });
    } catch (error) {
      setSnack({
        ...snack,
        open: true,
        message: error?.response?.data?.error_message,
        type: "error"
      });
    }
  };

  const getPositions = async () => {
    const data = await getAllPositions();
    setPositions(data.response_body);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      addStudents();
    }
  }, [formErrors]);

  useEffect(() => {
    if (auth) {
      getPositions();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <SubContainer>
        <LineButton
          onClick={() =>
            navigate(`/survey/${id.id}`, {
              state: id.id
            })
          }
        >
          Survey
        </LineButton>
      </SubContainer>
      <FormContainer>
        <Form>
          <div>
            <TextInput
              autoComplete='off'
              onChange={handleChange}
              value={formValues.firstName}
              id='outlined-basic'
              label='First Name'
              variant='outlined'
              name='firstName'
            />
            <ErrorText>{formErrors.firstName}</ErrorText>
          </div>
          <div>
            <TextInput
              autoComplete='off'
              onChange={handleChange}
              value={formValues.lastName}
              id='outlined-basic'
              label='Last Name'
              variant='outlined'
              name='lastName'
            />
            <ErrorText>{formErrors.lastName}</ErrorText>
          </div>
          <div>
            <FormControl>
              <InputLabel>Position</InputLabel>
              <SelectInput
                label='Position'
                onChange={handleChange}
                name='position'
                sx={{ width: 235 }}
              >
                {positions?.map(({ id, type_en }) => (
                  <MenuItem key={id} value={id}>
                    {type_en}
                  </MenuItem>
                ))}
              </SelectInput>

              <ErrorText>{formErrors.position}</ErrorText>
            </FormControl>
          </div>

          <div>
            <TextInput
              autoComplete='off'
              id='outlined-basic'
              label='Phone Number'
              variant='outlined'
              name='phoneNumber'
              value={formValues.phoneNumber}
              onChange={handleChange}
            />
            <ErrorText>{formErrors.phoneNumber}</ErrorText>
          </div>
          <div>
            <TextInput
              autoComplete='off'
              id='outlined-basic'
              label='Email'
              variant='outlined'
              name='email'
              value={formValues.email}
              onChange={handleChange}
            />
            <ErrorText>{formErrors.email}</ErrorText>
          </div>
          <div>
            <TextInput
              autoComplete='off'
              id='outlined-basic'
              label='Password'
              variant='outlined'
              name='password'
              type='password'
              value={formValues.password}
              onChange={handleChange}
            />
            <ErrorText>{formErrors.password}</ErrorText>
          </div>

          <AddContainer>
            <OutLineButton onClick={handleSubmit}>Add</OutLineButton>
            <p>Or</p>
            <input onChange={handleInput} type='file' accept='.csv' />
          </AddContainer>
        </Form>
      </FormContainer>
      <Snackbars setOpen={setSnack} type={snack} />
      <UsersTable data={data} />
    </Container>
  );
}

export default AddSchoolStudents;

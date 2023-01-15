import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Container from "@mui/material/Container";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbars from "../../components/SnackBar";
import {
  createSchool,
  editSchool,
  getAllCountries
} from "../../services/school";
import {
  ErrorText,
  Form,
  FormContainer,
  OutLineButton,
  SelectInput,
  SubContainer,
  TextInput
} from "./create-school.style";

function CreateSchool({ lang }) {
  const navigate = useNavigate();
  const oldData = useLocation().state;
  console.log(`🚀🚀 ~~ CreateSchool ~~ oldData`, oldData);
  const auth = cookie.get("auth");

  const initialValue = {
    schoolName: "",
    numberOfStudents: "",
    phoneNumber: "",
    numberOfTeachers: "",
    country: "",
    website: "",
    email: "",
    firstName: "",
    lastName: "",
    companyRegisterId: ""
  };

  const [formValues, setFormValues] = useState(initialValue);
  console.log(`🚀🚀 ~~ CreateSchool ~~ formValues`, formValues);
  const [formErrors, setFormErrors] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [snack, setSnack] = useState({
    open: false,
    type: "success",
    message: ""
  });

  const validate = (value) => {
    const errors = {};

    if (!value.schoolName) {
      errors.schoolName = "School Name Is Required";
    }

    if (!value.firstName) {
      errors.firstName = "First Name Is Required";
    }

    if (!value.lastName) {
      errors.lastName = "LastName Is Required";
    }

    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!value.email) {
      errors.email = "Email Is Required";
    } else if (!regex.test(value.email)) {
      errors.email = "Email Is Not valid";
    }

    if (!value.numberOfStudents) {
      errors.numberOfStudents = "Number Of Students Is Required";
    }

    if (!value.phoneNumber) {
      errors.phoneNumber = "Phone Number Is Required";
    }

    if (!value.numberOfTeachers) {
      errors.numberOfTeachers = "Number Of Teachers Is Required";
    }

    if (!value.country) {
      errors.country = "Country Is Required";
    }

    if (!value.website) {
      errors.website = "Website Is Required";
    }

    if (!value.companyRegisterId) {
      errors.companyRegisterId = "Company Register Is Required";
    }

    return errors;
  };

  const body = {
    school_name_en: formValues.schoolName,
    students_no: formValues.numberOfStudents,
    teachers_no: formValues.numberOfTeachers,
    company_register_id: formValues.companyRegisterId,
    country_code: formValues.country,
    contract_person_email: formValues.email,
    contract_person_first_name: formValues.firstName,
    contract_person_last_name: formValues.lastName,
    contract_person_mobile_number: formValues.phoneNumber,
    website: formValues.website
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await editSchool(body);
      setFormValues(initialValue);
      setFormErrors(initialValue);
      setLoading(false);
      navigate(`/school-management`);
    } catch (error) {
      setLoading(false);
      setSnack({
        ...snack,
        open: true,
        message: error?.response?.data?.error_message,
        type: "error"
      });
    }
  };

  const createNewSchool = async () => {
    try {
      setLoading(true);
      const data = await createSchool(body);
      const row = data?.response_body;
      setLoading(false);
      navigate(`/survey/${row.id}`, { state: row.id });
    } catch (error) {
      console.log(`🚀🚀 `, error?.response?.data);
      setLoading(false);
      setSnack({
        ...snack,
        open: true,
        message: error?.response?.data?.error_message,
        type: "error"
      });
    }
  };

  const getCountries = async () => {
    const data = await getAllCountries();
    setCountries(data.response_body);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      createNewSchool();
    }
  }, [formErrors]);

  const editDate = () => {
    if (oldData) {
      console.log(`🚀🚀 ~~ editDate ~~ oldData`, oldData);
      const values = {
        schoolName: oldData?.row?.school_name_en,
        numberOfStudents: oldData?.row?.students_no,
        phoneNumber: oldData?.row?.contact_person?.mobileNumber,
        firstName: oldData?.row?.contact_person?.firstName,
        lastName: oldData?.row?.contact_person?.lastName,
        email: oldData?.row?.contact_person?.email,
        numberOfTeachers: oldData?.row?.teachers_no,
        country: oldData?.row?.country?.country_code,
        website: oldData?.row?.website,
        companyRegisterId: oldData?.row?.company_register_id
      };

      setFormValues(values);
    }
  };

  useEffect(() => {
    if (auth) {
      getCountries();
      editDate();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <SubContainer>
        <h2>Add School</h2>
      </SubContainer>
      <FormContainer>
        <Form>
          <div>
            <TextInput
              autoComplete='off'
              onChange={handleChange}
              value={formValues.schoolName}
              label='School Name'
              variant='outlined'
              name='schoolName'
            />
            <ErrorText>{formErrors.schoolName}</ErrorText>
          </div>

          <div>
            <TextInput
              autoComplete='off'
              label='Company Register Number'
              variant='outlined'
              name='companyRegisterId'
              value={formValues.companyRegisterId}
              onChange={handleChange}
            />
            <ErrorText>{formErrors.companyRegisterId}</ErrorText>
          </div>
          <div>
            <TextInput
              autoComplete='off'
              label='Contract Person First Name'
              variant='outlined'
              name='firstName'
              value={formValues.firstName}
              onChange={handleChange}
            />
            <ErrorText>{formErrors.firstName}</ErrorText>
          </div>

          <div>
            <TextInput
              autoComplete='off'
              label='Contract Person Last Name'
              variant='outlined'
              name='lastName'
              value={formValues.lastName}
              onChange={handleChange}
            />
            <ErrorText>{formErrors.lastName}</ErrorText>
          </div>

          <div>
            <TextInput
              autoComplete='off'
              label='Contract Person Email'
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
              label='Number of Students'
              variant='outlined'
              name='numberOfStudents'
              value={formValues.numberOfStudents}
              onChange={handleChange}
            />
            <ErrorText>{formErrors.numberOfStudents}</ErrorText>
          </div>
          <div>
            <TextInput
              autoComplete='off'
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
              label='Number Of Teachers'
              variant='outlined'
              name='numberOfTeachers'
              value={formValues.numberOfTeachers}
              onChange={handleChange}
            />
            <ErrorText>{formErrors.numberOfTeachers}</ErrorText>
          </div>
          <div>
            <FormControl>
              <InputLabel>Country</InputLabel>
              <SelectInput
                label='Country'
                onChange={handleChange}
                name='country'
              >
                {countries?.map(
                  ({ country_code, country_name_en }) => (
                    <MenuItem key={country_code} value={country_code}>
                      {country_name_en}
                    </MenuItem>
                  )
                )}
              </SelectInput>

              <ErrorText>{formErrors.country}</ErrorText>
            </FormControl>
          </div>

          <div>
            <TextInput
              autoComplete='off'
              label='Website'
              variant='outlined'
              name='website'
              value={formValues.website}
              onChange={handleChange}
            />
            <ErrorText>{formErrors.website}</ErrorText>
          </div>

          <OutLineButton
            disabled={loading}
            onClick={oldData ? handleEdit : handleSubmit}
            type='submit'
          >
            Submit
          </OutLineButton>
        </Form>
      </FormContainer>
      <Snackbars setOpen={setSnack} type={snack} />
    </Container>
  );
}

export default CreateSchool;

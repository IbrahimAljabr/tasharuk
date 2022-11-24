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
  const auth = cookie.get("auth");

  const initialValue = {
    schoolName: "",
    contractPerson: "",
    numberOfStudents: "",
    phoneNumber: "",
    numberOfTeachers: "",
    country: "",
    website: "",
    companyRegisterId: ""
  };

  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState(initialValue);
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

    if (!value.contractPerson) {
      errors.contractPerson = "ContractPerson Is Required";
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
      const data = await editSchool(body);
      const id = data?.response_body?.company_register_id;
      navigate(`/add-school-students/${id}`, { state: { id } });
    } catch (error) {
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
      const data = await createSchool(body);
      const row = data?.response_body;
      navigate(`/add-school-students/${row.id}`, { state: { row } });
    } catch (error) {
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
      const values = {
        schoolName: oldData?.row?.school_name_en,
        numberOfStudents: oldData?.row?.students_no,
        phoneNumber: "",
        numberOfTeachers: oldData?.row?.teachers_no,
        country: oldData?.row?.country?.country_code,
        contractPerson: "",
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
        {/* <h2>Add Users</h2>
        <OutLineButton onClick={() => navigate("/survey")}>
          Survey
        </OutLineButton> */}
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
              label='Contract Person'
              variant='outlined'
              name='contractPerson'
              value={formValues.contractPerson}
              onChange={handleChange}
            />
            <ErrorText>{formErrors.contractPerson}</ErrorText>
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

          <OutLineButton
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

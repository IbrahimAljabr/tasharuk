import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbars from "../../components/SnackBar";
import { addSchoolToSchema } from "../../services/schemas";
import { getSchools } from "../../services/school";
import { Create } from "../Capabilities/capabilities.style";
import {
  DateContainer,
  DatePickerInput,
  ErrorText,
  FormContainer,
  OutLineButton,
  SelectInput,
  SelectInputContainer,
  SurveyForm
} from "../CreateSchool/create-school.style";

function LinkSchemaWithSchool({ lang }) {
  const navigate = useNavigate();
  const auth = cookie.get("auth");

  const id = useLocation()?.state?.row;

  const initialValue = {
    school: "",
    startValue: "",
    endValue: ""
  };

  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState(initialValue);

  const [snack, setSnack] = useState({
    open: false,
    type: "success",
    message: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
  };

  const validate = (value) => {
    const errors = {};

    if (!value.school) {
      errors.school = "School Is Required";
    }

    if (!value.startValue) {
      errors.startValue = "StartDate Is Required";
    }

    if (!value.endValue) {
      errors.endValue = "EndDate Is Required";
    }

    return errors;
  };

  const addUser = async () => {
    const body = {
      school_id: formValues?.school,
      schema_id: id,
      start_date: formValues?.startValue,
      end_date: formValues?.endValue
    };
    console.log(`🚀🚀 ~~ addUser ~~ body`, body);
    try {
      await addSchoolToSchema(body);
      setFormValues(initialValue);
      setFormErrors(initialValue);
    } catch (error) {
      console.log(`🚀🚀 ~~ addUser ~~ error`, error);
      setSnack({
        ...snack,
        open: true,
        message: error?.response?.data?.error_message,
        type: "error"
      });
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      addUser();
    }
  }, [formErrors]);

  const getAllSchools = async () => {
    const res = await getSchools(id);
    setData(res?.response_body);
  };

  useEffect(() => {
    if (auth) {
      getAllSchools();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <Create>
        <AddCircleIcon />
        <p>Create New School Schema</p>
      </Create>
      <FormContainer>
        <SurveyForm>
          <p>Select Date and School</p>

          <DateContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <DatePickerInput
                  label='Start Date'
                  value={formValues?.startValue}
                  onChange={(newValue) => {
                    setFormValues({
                      ...formValues,
                      startValue: newValue
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <ErrorText>{formErrors?.startValue}</ErrorText>
              </div>
              <p>To</p>
              <div>
                <DatePickerInput
                  label='End Date'
                  value={formValues?.endValue}
                  onChange={(newValue) => {
                    setFormValues({
                      ...formValues,
                      endValue: newValue
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <ErrorText>{formErrors?.endValue}</ErrorText>
              </div>
            </LocalizationProvider>
          </DateContainer>
          <SelectInputContainer>
            <FormControl>
              <InputLabel>School</InputLabel>
              <SelectInput
                label='School'
                onChange={handleChange}
                name='school'
              >
                {data?.map(({ id, school_name_en }) => (
                  <MenuItem key={id} value={id}>
                    {school_name_en}
                  </MenuItem>
                ))}
              </SelectInput>

              <ErrorText>{formErrors.school}</ErrorText>
            </FormControl>
          </SelectInputContainer>
          <OutLineButton onClick={handleSubmit}>Add</OutLineButton>
        </SurveyForm>
      </FormContainer>
      <Snackbars setOpen={setSnack} type={snack} />
    </Container>
  );
}

export default LinkSchemaWithSchool;

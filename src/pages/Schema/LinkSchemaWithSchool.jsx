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
import {
  addSchoolToSchema,
  getAllActiveSchemas
} from "../../services/schemas";
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

  const id = useLocation()?.state;
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

    if (!value.schema) {
      errors.schema = "Schema Is Required";
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
      school_id: id,
      schema_id: formValues?.schema,
      start_date: formValues?.startValue?.$d,
      end_date: formValues?.endValue?.$d
    };
    try {
      await addSchoolToSchema(body);
      setSnack({
        ...snack,
        open: true,
        message: "added successfully",
        type: "success"
      });
      setFormValues(initialValue);
      setFormErrors(initialValue);
      navigate(`/survey/${id}`, { state: id });
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

  const getAllSchemas = async () => {
    const res = await getAllActiveSchemas();
    setData(res?.response_body);
  };

  useEffect(() => {
    if (auth) {
      getAllSchemas();
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
          <p>Select Date and Schema</p>

          <SelectInputContainer>
            <FormControl>
              <InputLabel>Schema</InputLabel>
              <SelectInput
                label='Schema'
                onChange={handleChange}
                name='schema'
              >
                {data?.map(({ id, name_en }) => (
                  <MenuItem key={id} value={id}>
                    {name_en}
                  </MenuItem>
                ))}
              </SelectInput>

              <ErrorText>{formErrors.school}</ErrorText>
            </FormControl>
          </SelectInputContainer>

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

          <OutLineButton onClick={handleSubmit}>Add</OutLineButton>
        </SurveyForm>
      </FormContainer>
      <Snackbars setOpen={setSnack} type={snack} />
    </Container>
  );
}

export default LinkSchemaWithSchool;

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Container from "@mui/material/Container";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbars from "../../components/SnackBar";
import {
  addUserToSchema,
  getAllSchoolSchema
} from "../../services/schemas";
import { Create } from "../Capabilities/capabilities.style";
import {
  ErrorText,
  FormContainer,
  OutLineButton,
  SelectInput,
  SelectInputContainer,
  SurveyForm
} from "../CreateSchool/create-school.style";

function Survey({ lang }) {
  const navigate = useNavigate();
  const auth = cookie.get("auth");

  const { user, schoolId } = useLocation()?.state;

  const [data, setData] = useState([]);
  console.log(`🚀🚀 ~~ Survey ~~ data`, data[1]);
  const [formValues, setFormValues] = useState({ schema: "" });
  console.log(`🚀🚀 ~~ Survey ~~ formValues`, formValues);
  const [formErrors, setFormErrors] = useState({ schema: "" });
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

    return errors;
  };

  const addUser = async () => {
    const body = {
      school_schemas_id: formValues?.schema,
      school_users_id: user?.id
    };
    console.log(`🚀🚀 ~~ addUser ~~ body`, body);
    try {
      await addUserToSchema(body);
    } catch (error) {
      console.log(`🚀🚀 ~~ addUser ~~ error`, error?.response?.data);
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

  const getSchoolSchema = async () => {
    const res = await getAllSchoolSchema(schoolId);
    console.log(`🚀🚀 ~~ addUser ~~ 🚀🚀🚀🚀`, res);

    setData(res?.response_body);
  };

  useEffect(() => {
    if (auth) {
      getSchoolSchema();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <Create>
        <AddCircleIcon />
        <p>Create New Survey for user</p>
      </Create>
      <FormContainer>
        <SurveyForm>
          <p>Select Schema</p>
          <SelectInputContainer>
            <FormControl>
              <InputLabel>Schema</InputLabel>
              <SelectInput
                label='Schema'
                onChange={handleChange}
                name='schema'
              >
                {data?.map((schema) => (
                  <MenuItem key={schema.id} value={schema.id}>
                    {schema?.schema.name_en}
                  </MenuItem>
                ))}
              </SelectInput>

              <ErrorText>{formErrors.schema}</ErrorText>
            </FormControl>
          </SelectInputContainer>
          <OutLineButton onClick={handleSubmit}>Add</OutLineButton>
        </SurveyForm>
      </FormContainer>

      <Snackbars setOpen={setSnack} type={snack} />
    </Container>
  );
}

export default Survey;

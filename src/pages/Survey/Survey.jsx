import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbars from "../../components/SnackBar";
import {
  addUserToSchema,
  getAllSchoolSchema
} from "../../services/schemas";
import { getUserById } from "../../services/school";
import {
  Create,
  CreateContainer,
  ModelBody,
  ModelContainerUrl,
  ModelHeader,
  ModelSwitch
} from "../Capabilities/capabilities.style";
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
  const appUrl = "http://localhost:3000";

  const [userUrl, setUserUrl] = useState("");
  const [userData, setUserData] = useState("");
  console.log(`🚀🚀 ~~ Survey ~~ userData`, userData);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, schoolId } = useLocation()?.state;

  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({ schema: "" });
  const [formErrors, setFormErrors] = useState({ schema: "" });

  const [snack, setSnack] = useState({
    open: false,
    type: "success",
    message: ""
  });

  const showUrl = async () => {
    console.log(
      `🚀🚀 ~~ showUrl ~~ userData?.email`,
      userData?.email
    );
  };

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
      const res = await addUserToSchema(body);

      const userRes = await getUserById(
        res?.response_body?.school_user_id
      );

      const url = `${appUrl}/school-schema/${formValues?.schema}/email/${userRes?.response_body?.email}`;
      console.log(`🚀🚀 ~~ 🚀🚀 ~~ 🚀🚀`, url);
      setUserUrl(url);
      setOpen(true);

      setSnack({
        ...snack,
        open: true,
        message: "Added Successfully",
        type: "success"
      });
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
      <CreateContainer>
        <Create>
          <AddCircleIcon />
          <p>Create New Survey for user</p>
        </Create>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          disableEnforceFocus
        >
          <ModelContainerUrl>
            <ModelHeader>
              This URL should be send to the users
            </ModelHeader>

            <ModelBody>
              <ModelSwitch>
                <p>{userUrl}</p>
              </ModelSwitch>
            </ModelBody>
            <OutLineButton onClick={handleClose}>Done</OutLineButton>
          </ModelContainerUrl>
        </Modal>
      </CreateContainer>

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

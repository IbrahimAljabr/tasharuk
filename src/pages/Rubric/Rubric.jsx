import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import {
  Create,
  GoBack,
  ModelBody,
  ModelButton,
  ModelContainer,
  ModelHeader,
  ModelSwitch
} from "../Capabilities/capabilities.style";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Modal from "@mui/material/Modal";
import cookie from "cookiejs";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbars from "../../components/SnackBar";
import {
  createRubric,
  deleteRubrics,
  editRubric,
  getAllRubricById
} from "../../services/rubrics";
import { editSchema } from "../../services/schemas";
import { ErrorText } from "../CreateSchool/create-school.style";
import RubricTable from "./Table";

function Rubric({ lang }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const indicator = useLocation()?.state;

  const value = {
    description: "",
    name: "",
    score: ""
  };

  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState(value);
  const [formErrors, setFormErrors] = useState(value);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(0);
  const [snack, setSnack] = useState({
    open: false,
    type: "success",
    message: ""
  });

  const handleEditCapability = async (event) => {
    event.preventDefault();

    const body = {
      description_en: formValues.description,
      name_en: formValues.name,
      score: formValues.score
    };

    try {
      setLoading(true);
      await editRubric(editId, body);
      getRubric();
      setOpen(false);
      setEdit(false);
      setLoading(false);
      setFormValues(value);
      setSnack({
        ...snack,
        open: true,
        message: "Edited Successfully ",
        type: "success"
      });
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

  const handleEdit = async (body) => {
    setEdit(true);
    setOpen(true);
    setFormValues({
      ...formValues,
      name: body?.name_en,
      description: body?.description_en,
      score: body?.score
    });
    setEditId(body?.id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
  };
  const auth = cookie.get("auth");

  const validate = (value) => {
    const errors = {};

    if (!value.name) {
      errors.name = "Name Is Required";
    }

    if (!value.description) {
      errors.description = "Description Is Required";
    }

    if (!value.score) {
      errors.score = "Score Is Required";
    }

    return errors;
  };

  let order = data.reduce((acc, value) => {
    return (acc = acc > value.order_no ? acc : value.order_no);
  }, 0);

  const addRubric = async () => {
    const body = {
      indicator_id: indicator?.row?.id,
      description_en: formValues.description,
      name_en: formValues.name,
      score: formValues.score,
      order_no: order ? order + 1 : 1
    };

    const schemaValue = {
      is_active: true
    };

    try {
      setLoading(true);
      await createRubric(body);
      setLoading(false);
      setOpen(false);
      getRubric();
      setSnack({
        ...snack,
        open: true,
        message: "Added Successfully ",
        type: "success"
      });
      await editSchema(indicator?.schemaId, schemaValue);
      setFormValues(value);
      setFormErrors(value);
    } catch (error) {
      console.log(`📌 📁 ~ error`, error);
      setLoading(false);
      setSnack({
        ...snack,
        open: true,
        message: error?.response?.data?.error_message,
        type: "error"
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRubrics(id);
      getRubric();
      setSnack({
        ...snack,
        open: true,
        message: "Deleted Successfully ",
        type: "success"
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

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      addRubric();
    }
  }, [formErrors]);

  const getRubric = async () => {
    const res = await getAllRubricById(indicator?.row?.id);
    setData(res?.response_body);
  };

  useEffect(() => {
    if (auth) {
      getRubric();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <GoBack onClick={() => navigate(-1)}>
        <KeyboardBackspaceIcon />
        <p>{indicator?.row?.description_en}</p>
      </GoBack>
      <Create>
        <AddCircleIcon />
        <p onClick={handleOpen}>Create Rubric</p>
      </Create>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        disableEnforceFocus
      >
        <ModelContainer>
          <ModelHeader>
            <AddCircleIcon />
            {edit ? <p>Edit Rubric</p> : <p>Create Rubric</p>}
          </ModelHeader>

          <ModelBody>
            <form>
              <ModelSwitch>
                <p>Rubric Name</p>
              </ModelSwitch>
              <div>
                <input
                  type='text'
                  required
                  name='name'
                  onChange={handleChange}
                  value={formValues?.name}
                  autoComplete='off'
                />
                <ErrorText>{formErrors.name}</ErrorText>
              </div>
              <ModelSwitch>
                <p>Rubric Description</p>
              </ModelSwitch>
              <div>
                <textarea
                  type='text'
                  required
                  name='description'
                  onChange={handleChange}
                  value={formValues?.description}
                />
                <ErrorText>{formErrors.description}</ErrorText>
              </div>
              <ModelSwitch>
                <p>Rubric Score</p>
              </ModelSwitch>
              <div>
                <input
                  type='text'
                  required
                  name='score'
                  onChange={handleChange}
                  value={formValues?.score}
                />
                <ErrorText>{formErrors.score}</ErrorText>
              </div>
              <ModelButton
                disabled={loading}
                type='submit'
                onClick={edit ? handleEditCapability : handleSubmit}
              >
                {edit ? <>Edit Rubric</> : <>Add Rubric</>}
              </ModelButton>
              <ModelButton
                disabled={loading}
                onClick={handleClose}
                cancel='true'
              >
                Cancel
              </ModelButton>
            </form>
          </ModelBody>
        </ModelContainer>
      </Modal>
      <Snackbars setOpen={setSnack} type={snack} />

      <RubricTable
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </Container>
  );
}

export default Rubric;

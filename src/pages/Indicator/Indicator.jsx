import AddCircleIcon from "@mui/icons-material/AddCircle";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbars from "../../components/SnackBar";
import {
  createIndicator,
  deleteIndicators,
  editIndicator,
  getAllIndicator
} from "../../services/indicators";
import {
  Create,
  GoBack,
  ModelBody,
  ModelButton,
  ModelContainer,
  ModelHeader,
  ModelSwitch
} from "../Capabilities/capabilities.style";
import { ErrorText } from "../CreateSchool/create-school.style";
import IndicatorTable from "./Table";

function Indicator({ lang }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const indicator = useLocation()?.state?.row;
  const auth = cookie.get("auth");

  const [data, setData] = useState([]);

  const [formValues, setFormValues] = useState({ description: "" });
  const [formErrors, setFormErrors] = useState({ description: "" });
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(0);
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

  const handleEditCapability = async (event) => {
    event.preventDefault();

    const body = {
      description_en: formValues.description
    };

    try {
      await editIndicator(editId, body);

      getIndicator();
      setOpen(false);
      setEdit(false);
      setSnack({
        ...snack,
        open: true,
        message: "Edited Successfully ",
        type: "success"
      });
      setFormValues({ description: "" });
      setFormErrors({ description: "" });
    } catch (error) {
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
    setFormValues({ ...formValues, name: body?.name_en });
    setEditId(body?.id);
  };

  const validate = (value) => {
    const errors = {};

    if (!value.description) {
      errors.description = "Description Is Required";
    }

    return errors;
  };

  const handleNavigate = async (row) => {
    navigate(`/rubric/${row?.id}`, {
      state: {
        row,
        schemaId: data?.[0]?.sub_capability?.capability?.schema?.id
      }
    });
  };

  let order = data.reduce((acc, value) => {
    return (acc = acc > value.order_no ? acc : value.order_no);
  }, 0);

  const addIndicator = async () => {
    const body = {
      sub_capability_id: indicator?.id,
      description_en: formValues.description,
      order_no: order ? order + 1 : 1
    };

    try {
      await createIndicator(body);
      setOpen(false);
      getIndicator();
      setSnack({
        ...snack,
        open: true,
        message: "Added Successfully ",
        type: "success"
      });
      setFormValues({ description: "" });
      setFormErrors({ description: "" });
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
      addIndicator();
    }
  }, [formErrors]);

  const getIndicator = async () => {
    try {
      const res = await getAllIndicator(indicator?.id);
      setData(res?.response_body);
    } catch (error) {
      console.log(`🚀🚀 ~~ getIndicator ~~ error`, error?.response);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteIndicators(id);
      getIndicator();
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
    if (auth) {
      getIndicator();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <GoBack onClick={() => navigate(-1)}>
        <KeyboardBackspaceIcon />
        <p>{indicator?.name_en}</p>
      </GoBack>
      <Create>
        <AddCircleIcon />
        <p onClick={handleOpen}>Create a Indicator</p>
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
              {edit ? (
                <p>Edit Sub-Capability</p>
              ) : (
                <p>Create Sub-Capability</p>
              )}
            </ModelHeader>

            <ModelBody>
              <form>
                <ModelSwitch>
                  <p>Indicator description</p>
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

                <ModelButton
                  type='submit'
                  onClick={edit ? handleEditCapability : handleSubmit}
                >
                  {edit ? <>Edit Indicator</> : <>Add Indicator</>}
                </ModelButton>
                <ModelButton onClick={handleClose} cancel='true'>
                  Cancel
                </ModelButton>
              </form>
            </ModelBody>
          </ModelContainer>
        </Modal>
      </Create>
      <Snackbars setOpen={setSnack} type={snack} />

      <IndicatorTable
        data={data}
        handleNavigate={handleNavigate}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </Container>
  );
}

export default Indicator;

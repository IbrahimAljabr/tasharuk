import AddCircleIcon from "@mui/icons-material/AddCircle";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbars from "../../components/SnackBar";
import {
  createUserCapability,
  deleteUserCapability,
  editUserCapability,
  getAllUserCapabilityById
} from "../../services/capabilities";
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
import SubCapabilityTable from "./Table";

function UserCapability({ lang }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const subCap = useLocation()?.state?.row;
  console.log(`📌 📁 ~ subCap`, subCap);

  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({ name: "" });
  const [formErrors, setFormErrors] = useState({ name: "" });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(0);
  const auth = cookie.get("auth");
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
    getUserCapability();
  };

  const validate = (value) => {
    const errors = {};

    if (!value.name) {
      errors.name = "Name Is Required";
    }

    return errors;
  };

  const handleEditCapability = async (event) => {
    event.preventDefault();

    const body = {
      name_en: formValues.name
    };

    try {
      setLoading(true);
      await editUserCapability(editId, body);
      getUserCapability();
      setOpen(false);
      setLoading(false);
      setEdit(false);
      setFormValues({ name: "" });
      setSnack({
        ...snack,
        open: true,
        message: "Edited Successfully ",
        type: "success"
      });
      setFormValues({ name: "" });
      setFormErrors({ name: "" });
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
    setFormValues({ ...formValues, name: body?.name_en });
    setEditId(body?.id);
  };

  const getUserCapability = async () => {
    const res = await getAllUserCapabilityById(subCap?.id);
    setData(res?.response_body);
  };

  const handleNavigate = async (row) => {
    navigate(`/sub-capability/${row?.id}`, { state: { row } });
  };

  let order = data.reduce((acc, value) => {
    return (acc = acc > value.order_no ? acc : value.order_no);
  }, 0);

  const addSubCapabilities = async () => {
    const body = {
      capability_id: subCap?.id,
      name_en: formValues.name,
      order_no: order ? order + 1 : 1
    };

    try {
      setLoading(true);
      await createUserCapability(body);
      setLoading(false);
      setOpen(false);
      getUserCapability();
      setSnack({
        ...snack,
        open: true,
        message: "Added Successfully ",
        type: "success"
      });
      setFormValues({ name: "" });
      setFormErrors({ name: "" });
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

  const handleDelete = async (id) => {
    try {
      await deleteUserCapability(id);
      getUserCapability();
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
      addSubCapabilities();
    }
  }, [formErrors]);

  useEffect(() => {
    if (auth) {
      getUserCapability();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <GoBack onClick={() => navigate(-1)}>
        <KeyboardBackspaceIcon />
        <p>{subCap?.capability_name_en}</p>
      </GoBack>
      <Create>
        <AddCircleIcon />
        <p onClick={handleOpen}>Create User-Capability</p>
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
                <p>Edit User-Capability</p>
              ) : (
                <p>Create User-Capability</p>
              )}
            </ModelHeader>

            <ModelBody>
              <form>
                <ModelSwitch>
                  <p>User-Capability Name</p>
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
                <ModelButton
                  disabled={loading}
                  type='submit'
                  onClick={edit ? handleEditCapability : handleSubmit}
                >
                  {edit ? (
                    <>Edit User Capability</>
                  ) : (
                    <>Add User Capability</>
                  )}
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
      </Create>
      <Snackbars setOpen={setSnack} type={snack} />

      <SubCapabilityTable
        data={data}
        handleNavigate={handleNavigate}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </Container>
  );
}

export default UserCapability;

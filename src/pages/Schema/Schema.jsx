import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbars from "../../components/SnackBar";
import {
  createSchema,
  deleteSchema,
  editSchema,
  getAllSchemas
} from "../../services/schemas";
import { Create } from "../Capabilities/capabilities.style";
import SchemaModal from "./SchemaModal";
import SchemaTable from "./Table";

function Schema({ lang }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const auth = cookie.get("auth");

  const initialValue = {
    name: "",
    description: ""
  };

  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState(initialValue);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(0);
  const [snack, setSnack] = useState({
    open: false,
    type: "success",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleEditSchema = async (event) => {
    event.preventDefault();

    const body = {
      description: formValues.description,
      name_en: formValues.name
    };

    try {
      setLoading(true);
      await editSchema(editId, body);
      getSchema();
      setOpen(false);
      setLoading(false);
      setEdit(false);
      setFormValues(initialValue);
      setSnack({
        ...snack,
        open: true,
        message: "Edited Successfully ",
        type: "success"
      });
      setFormValues(initialValue);
      setFormErrors(initialValue);
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
      description: body?.description,
      isActive: body?.is_active,
      schemaId: body?.id
    });
    setEditId(body?.id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getSchema = async () => {
    const res = await getAllSchemas();
    setData(res?.response_body);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
  };

  const validate = (value) => {
    const errors = {};

    if (!value.name) {
      errors.name = "Name Is Required";
    }

    if (!value.description) {
      errors.description = "Description Is Required";
    }

    return errors;
  };

  const addSchema = async () => {
    const body = {
      name_en: formValues.name,
      description: formValues.description
    };

    try {
      setLoading(true);
      await createSchema(body);
      setLoading(false);
      setOpen(false);
      getSchema();
      setSnack({
        ...snack,
        open: true,
        message: "Added Successfully ",
        type: "success"
      });
      setFormValues(initialValue);
      setFormErrors(initialValue);
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
      await deleteSchema(id);
      getSchema();
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
      addSchema();
    }
  }, [formErrors]);

  useEffect(() => {
    if (auth) {
      getSchema();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <Create>
        <AddCircleIcon />
        <p onClick={handleOpen}>Create New Schema</p>
        <SchemaModal
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formErrors={formErrors}
          handleEditCapability={handleEditSchema}
          edit={edit}
          formValues={formValues}
          loading={loading}
        />
      </Create>
      <SchemaTable
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Snackbars setOpen={setSnack} type={snack} />
    </Container>
  );
}

export default Schema;

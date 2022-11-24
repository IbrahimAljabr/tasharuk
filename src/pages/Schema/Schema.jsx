import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleEditCapability = async (event) => {
    event.preventDefault();

    const body = {
      description_en: formValues.description,
      name_en: formValues.name,
      score: formValues.score
    };

    try {
      await editSchema(editId, body);
      getSchema();
      setOpen(false);
      setEdit(false);
      setFormValues(initialValue);
    } catch (error) {
      console.log(`🚀🚀 ~~ edit `, error);
    }
  };

  const handleEdit = async (body) => {
    setEdit(true);
    setOpen(true);
    setFormValues({
      ...formValues,
      name: body?.name_en,
      description_en: body?.description_en,
      score: body?.score
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

    await createSchema(body);
    setOpen(false);
    getSchema();
  };

  // const handleNavigate = async (id) => {
  //   navigate(`/indicator/${id}`, { state: { id } });
  // };

  const handleDelete = async (id) => {
    try {
      await deleteSchema(id);
      getSchema();
    } catch (error) {
      console.log(`🚀🚀 ~~ handleDelete ~~ error`, error);
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
          handleEditCapability={handleEditCapability}
          edit={edit}
          formValues={formValues}
        />
      </Create>
      <SchemaTable
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Container>
  );
}

export default Schema;

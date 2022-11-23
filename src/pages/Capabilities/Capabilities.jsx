import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createCapabilities,
  deleteCapability,
  editCapability,
  getAllCapabilities
} from "../../services/capabilities";
import { Create } from "./capabilities.style";
import CapabilitiesModal from "./CapabilitiesModal";
import CapabilitiesTable from "./Table";

function Capabilities({ lang }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({ name: "" });
  const [formErrors, setFormErrors] = useState({ name: "" });
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    getCapabilities();
  };

  const validate = (value) => {
    const errors = {};

    if (!value.name) {
      errors.name = "Name Is Required";
    }

    return errors;
  };

  let order = data.reduce((acc, value) => {
    return (acc = acc > value.order_no ? acc : value.order_no);
  }, 0);

  const addCapabilities = async () => {
    const body = {
      schema_id: 11,
      capability_name_en: formValues.name,
      order_no: order ? order + 1 : 1
    };

    try {
      const res = await createCapabilities(body);
      console.log(`🚀🚀🚀🚀  res`, res);
      setOpen(false);
    } catch (error) {
      console.log(`🚀🚀🚀🚀error`, error?.response?.data);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      addCapabilities();
    }
  }, [formErrors]);

  const getCapabilities = async () => {
    const res = await getAllCapabilities();
    setData(res?.response_body);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCapability(id);
      getCapabilities();
    } catch (error) {
      console.log(`🚀🚀 ~~ handleDelete ~~ error`, error);
    }
  };

  const handleEditCapability = async (event) => {
    event.preventDefault();

    const body = {
      capability_name_en: formValues.name
    };

    try {
      const res = await editCapability(editId, body);
      console.log(`🚀🚀 ~~ handleEdit ~~ res`, res);
      getCapabilities();
      setOpen(false);
      setEdit(false);
      setFormValues({ name: "" });
    } catch (error) {
      console.log(`🚀🚀 ~~ edit `, error);
    }
  };

  const handleEdit = async (body) => {
    console.log(`🚀🚀 ~~  body`, body);
    setEdit(true);
    setOpen(true);
    setFormValues({ ...formValues, name: body?.capability_name_en });
    setEditId(body?.id);
  };

  const handleNavigate = async (id) => {
    navigate(`/sub-capability/${id}`, { state: { id } });
  };

  useEffect(() => {
    getCapabilities();
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <Create>
        <AddCircleIcon />
        <p onClick={handleOpen}>
          {edit ? (
            <>Create New Capability </>
          ) : (
            <> Create New Capability</>
          )}
        </p>

        <CapabilitiesModal
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formErrors={formErrors}
          formValues={formValues}
          edit={edit}
          handleEditCapability={handleEditCapability}
        />
      </Create>
      <CapabilitiesTable
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleNavigate={handleNavigate}
      />
    </Container>
  );
}

export default Capabilities;

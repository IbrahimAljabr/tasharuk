import AddCircleIcon from "@mui/icons-material/AddCircle";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Container from "@mui/material/Container";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbars from "../../components/SnackBar";
import {
  createCapabilities,
  deleteCapability,
  editCapability,
  getAllCapability
} from "../../services/capabilities";
import { Create, GoBack } from "./capabilities.style";
import CapabilitiesModal from "./CapabilitiesModal";
import CapabilitiesTable from "./Table";

function Capabilities({ lang }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    description: ""
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    description: ""
  });
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(0);

  const [snack, setSnack] = useState({
    open: false,
    type: "success",
    message: ""
  });
  const id = useLocation()?.state?.row;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const auth = cookie.get("auth");

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
      schema_id: id.id,
      capability_name_en: formValues.name,
      order_no: order ? order + 1 : 1
    };

    try {
      setLoading(true);
      await createCapabilities(body);
      getCapabilities();
      setOpen(false);
      setLoading(false);
      setSnack({
        ...snack,
        open: true,
        message: "Add Successfully ",
        type: "success"
      });
      setFormValues({ name: "", description: "" });
      setFormErrors({ name: "", description: "" });
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

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      addCapabilities();
    }
  }, [formErrors]);

  const getCapabilities = async () => {
    try {
      const res = await getAllCapability(id.id);
      setData(res?.response_body);
    } catch (error) {
      console.log(
        `🚀🚀 ~~ getCapabilities ~~ error`,
        error?.response?.data
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCapability(id);
      getCapabilities();
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

  const handleEditCapability = async (event) => {
    event.preventDefault();

    const body = {
      capability_name_en: formValues.name
    };

    try {
      setLoading(true);
      await editCapability(editId, body);
      setLoading(false);
      getCapabilities();
      setOpen(false);
      setEdit(false);
      setFormValues({ name: "" });
      setSnack({
        ...snack,
        open: true,
        message: "Edited Successfully ",
        type: "success"
      });
      setFormValues({ name: "", description: "" });
      setFormErrors({ name: "", description: "" });
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
    setFormValues({ ...formValues, name: body?.capability_name_en });
    setEditId(body?.id);
  };

  const handleNavigate = async (row) => {
    navigate(`/user-capability/${row?.id}`, { state: { row } });
  };

  useEffect(() => {
    if (auth) {
      getCapabilities();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <GoBack onClick={() => navigate(-1)}>
        <KeyboardBackspaceIcon />
        <p>{id.name_en}</p>
      </GoBack>
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
          loading={loading}
        />
      </Create>
      <CapabilitiesTable
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleNavigate={handleNavigate}
      />
      <Snackbars setOpen={setSnack} type={snack} />
    </Container>
  );
}

export default Capabilities;

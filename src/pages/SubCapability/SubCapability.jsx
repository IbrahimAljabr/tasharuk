import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createSubCapability,
  deleteSubCapability,
  editSubCapability,
  getAllSubCapabilityById
} from "../../services/capabilities";
import {
  Create,
  ModelBody,
  ModelButton,
  ModelContainer,
  ModelHeader,
  ModelSwitch
} from "../Capabilities/capabilities.style";
import { ErrorText } from "../CreateSchool/create-school.style";
import SubCapabilityTable from "./Table";

function SubCapability({ lang }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const id = useLocation()?.state?.id;

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
    getSubCapability();
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
      const res = await editSubCapability(editId, body);
      console.log(`🚀🚀 ~~ handleEdit ~~ res`, res);
      getSubCapability();
      setOpen(false);
      setEdit(false);
      setFormValues({ name: "" });
    } catch (error) {
      console.log(`🚀🚀 ~~ edit `, error);
    }
  };

  const handleEdit = async (body) => {
    console.log(`🚀🚀 ~~  ~~ `, body);
    setEdit(true);
    setOpen(true);
    setFormValues({ ...formValues, name: body?.name_en });
    setEditId(body?.id);
  };

  const getSubCapability = async () => {
    const res = await getAllSubCapabilityById(id);
    setData(res?.response_body);
  };

  const handleNavigate = async (id) => {
    navigate(`/indicator/${id}`, { state: { id } });
  };

  let order = data.reduce((acc, value) => {
    return (acc = acc > value.order_no ? acc : value.order_no);
  }, 0);

  const addSubCapabilities = async () => {
    const body = {
      capability_id: id,
      name_en: formValues.name,
      order_no: order ? order + 1 : 1
    };

    try {
      const res = await createSubCapability(body);
      console.log(`🚀🚀🚀🚀  res`, res);
      setOpen(false);
      getSubCapability();
    } catch (error) {
      console.log(`🚀🚀🚀🚀🚀🚀🚀🚀🚀error`, error?.response?.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubCapability(id);
      getSubCapability();
    } catch (error) {
      console.log(`🚀🚀 ~~ handleDelete ~~ error`, error);
    }
  };

  useEffect(() => {
    getSubCapability();
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      addSubCapabilities();
    }
  }, [formErrors]);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <Create>
        <AddCircleIcon />
        <p onClick={handleOpen}>Create Sub-Capability</p>
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
                  <p>Sub-Capability Name</p>
                </ModelSwitch>
                <div>
                  <input
                    type='text'
                    required
                    name='name'
                    onChange={handleChange}
                    value={formValues?.name}
                  />
                  <ErrorText>{formErrors.name}</ErrorText>
                </div>
                <ModelButton
                  type='submit'
                  onClick={edit ? handleEditCapability : handleSubmit}
                >
                  {edit ? (
                    <>Edit Sub Capability</>
                  ) : (
                    <>Add sub Capability</>
                  )}
                </ModelButton>
                <ModelButton onClick={handleClose} cancel='true'>
                  Cancel
                </ModelButton>
              </form>
            </ModelBody>
          </ModelContainer>
        </Modal>
      </Create>
      <SubCapabilityTable
        data={data}
        handleNavigate={handleNavigate}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </Container>
  );
}

export default SubCapability;

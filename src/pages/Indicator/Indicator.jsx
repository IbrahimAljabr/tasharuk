import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createIndicator,
  deleteIndicators,
  editIndicator,
  getAllIndicator
} from "../../services/indicators";
import {
  Create,
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

  const id = useLocation()?.state?.id;

  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({ description: "" });
  const [formErrors, setFormErrors] = useState({ description: "" });
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(0);

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
      const res = await editIndicator(editId, body);
      console.log(`🚀🚀 ~~ handleEdit ~~ res`, res);
      getIndicator();
      setOpen(false);
      setEdit(false);
      setFormValues({ description: "" });
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

  const validate = (value) => {
    const errors = {};

    if (!value.description) {
      errors.description = "Description Is Required";
    }

    return errors;
  };

  const handleNavigate = async (id) => {
    navigate(`/rubric/${id}`, { state: { id } });
  };

  let order = data.reduce((acc, value) => {
    return (acc = acc > value.order_no ? acc : value.order_no);
  }, 0);

  const addIndicator = async () => {
    const body = {
      sub_capability_id: id,
      description_en: formValues.description,
      order_no: order ? order + 1 : 1
    };

    try {
      await createIndicator(body);
      setOpen(false);
      getIndicator();
    } catch (error) {
      console.log(`🚀🚀🚀🚀🚀🚀🚀🚀🚀error`, error?.response?.data);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      addIndicator();
    }
  }, [formErrors]);

  const getIndicator = async () => {
    try {
      const res = await getAllIndicator(id);
      setData(res?.response_body);
    } catch (error) {
      console.log(`🚀🚀🚀🚀🚀🚀🚀🚀🚀error`, error?.response?.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteIndicators(id);
      getIndicator();
    } catch (error) {
      console.log(`🚀🚀 ~~ handleDelete ~~ error`, error);
    }
  };

  useEffect(() => {
    getIndicator();
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
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

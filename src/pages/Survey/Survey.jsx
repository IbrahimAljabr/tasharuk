import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllSurvey } from "../../services/survey";
import { Create } from "../Capabilities/capabilities.style";
import SurveyTable from "./Table";

function Survey({ lang }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const id = useLocation()?.state?.id;

  const value = {
    description: "",
    name: "",
    score: ""
  };

  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState(value);
  const [formErrors, setFormErrors] = useState(value);

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

  const handleNavigate = async (id) => {
    navigate(`/indicator/${id}`, { state: { id } });
  };

  let order = data.reduce((acc, value) => {
    return (acc = acc > value.order_no ? acc : value.order_no);
  }, 0);

  const addRubric = async () => {
    const body = {
      indicator_id: id,
      description_en: formValues.description,
      name_en: formValues.name,
      score: formValues.score,
      order_no: order ? order + 1 : 1
    };
    console.log(`🚀🚀 ~~ addRubric ~~ body`, body);

    try {
      // await createRubric(body);
      setOpen(false);
      getSurvey();
    } catch (error) {
      console.log(`🚀🚀🚀🚀🚀🚀🚀🚀🚀error`, error?.response?.data);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      addRubric();
    }
  }, [formErrors]);

  const getSurvey = async () => {
    const res = await getAllSurvey(id);
    console.log(`🚀🚀🚀🚀🚀🚀 ~~  ~~ res`, res);
    setData(res?.response_body);
  };

  useEffect(() => {
    getSurvey();
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <Create>
        <AddCircleIcon />
        <p onClick={() => navigate("/create-survey")}>
          Create New Survey
        </p>
      </Create>
      <SurveyTable data={data} handleNavigate={handleNavigate} />
    </Container>
  );
}

export default Survey;

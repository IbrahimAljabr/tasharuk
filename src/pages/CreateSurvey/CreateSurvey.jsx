import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllSchoolSurvey } from "../../services/survey";
import { Create } from "../Capabilities/capabilities.style";
import SurveyTable from "./Table";

function CreateSurvey({ lang }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const auth = cookie.get("auth");
  const id = useLocation()?.state;

  const getSchoolSchema = async () => {
    try {
      const res = await getAllSchoolSurvey(id);

      setData(res?.response_body);
    } catch (error) {
      console.log(`🚀🚀 ~~ handleEditCapability ~~ error`, error);
    }
  };

  useEffect(() => {
    if (auth) {
      getSchoolSchema();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <Create>
        <AddCircleIcon />
        <p
          onClick={() =>
            navigate(`/link-school/${id}`, {
              state: id
            })
          }
        >
          Create Survey
        </p>
      </Create>
      <SurveyTable data={data} />
    </Container>
  );
}

export default CreateSurvey;

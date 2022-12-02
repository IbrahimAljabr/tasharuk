import Container from "@mui/material/Container";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCapabilityBySchemaId } from "../../services/survey";
import { LineButton } from "../AddSchoolStudents/add-school-students";
import { Create } from "../Capabilities/capabilities.style";
import PositionsTable from "./Table";

function CreateSurvey({ lang }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const auth = cookie.get("auth");
  const id = useLocation()?.state;
  console.log(`🚀🚀 ~~ CreateSurvey ~~ id`, id);

  const getSchoolSchema = async () => {
    try {
      const res = await getCapabilityBySchemaId(id?.schema?.id);

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
        <LineButton
          onClick={() =>
            navigate(`/add-school-students/${id?.school?.id}`, {
              state: { row: id?.school }
            })
          }
        >
          Add Users
        </LineButton>
      </Create>
      <PositionsTable
        data={data}
        id={id}
        getSchoolSchema={getSchoolSchema}
      />
    </Container>
  );
}

export default CreateSurvey;

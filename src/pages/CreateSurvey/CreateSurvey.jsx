import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Create } from "../Capabilities/capabilities.style";

import TableShare from "../../components/Table/Table";

function CreateSurvey({ lang }) {
  const navigate = useNavigate();

  const headers = [
    "Capability Schema Instants",
    "Start Date",
    "End Date",
    "Status"
  ];

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <Create>
        <AddCircleIcon />
        <p onClick={() => navigate("/create-survey")}>
          Create a New Survey
        </p>
      </Create>
      <TableShare headers={headers} />
    </Container>
  );
}

export default CreateSurvey;

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import cookie from "cookiejs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSchool } from "../../contexts/UserContext";
import { getSchools } from "../../services/school";
import { Create } from "../Capabilities/capabilities.style";

import SchoolTable from "./Table";

function SchoolManagement({ lang }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { setSchoolData } = useSchool();
  const auth = cookie.get("auth");
  const getAllSchools = async () => {
    const res = await getSchools();
    setData(res?.response_body);
  };

  useEffect(() => {
    if (auth) {
      getAllSchools();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <Create>
        <AddCircleIcon />
        <p onClick={() => navigate("/create-school")}>
          Create School
        </p>
      </Create>
      <SchoolTable data={data} setSchoolData={setSchoolData} />
    </Container>
  );
}

export default SchoolManagement;

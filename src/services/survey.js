import axios from "axios";

const { REACT_APP_API_URL } = process.env;

axios.defaults.withCredentials = true;

export const getAllSchoolSurvey = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/school-schemas/schools/${id}`
  );

  return data;
};

export const getCapabilityBySchemaId = async (schemaId) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/capabilities/schemas/${schemaId}`
  );

  return data;
};

export const addPosition = async (body) => {
  const { data } = await axios.post(
    `${REACT_APP_API_URL}/capability-positions`,
    body
  );

  return data;
};

export const deletePosition = async (body) => {
  console.log("delete this cap-pos:", body);
  const { data } = await axios.delete(
    `${REACT_APP_API_URL}/capability-positions/${body.school_schema_id}/${body.capability_id}/${body.position_id}`
  );

  return data;
};

export const getPositionsBySchoolSchemaId = async (
  schoolSchemaId
) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/capability-positions/${schoolSchemaId}`
  );

  return data;
};

export const getIndicatorsByEmail = async (schoolSchemaId, email) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/surveys/${schoolSchemaId}/email/${email}`
  );

  return data;
};

export const getRubricsById = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/rubrics/indicators/${id}`
  );

  return data;
};

export const updateRubrics = async (schemaId, email, rubricId) => {
  const { data } = await axios.put(
    `${REACT_APP_API_URL}/surveys/${schemaId}/${email}/${rubricId}`
  );

  return data;
};

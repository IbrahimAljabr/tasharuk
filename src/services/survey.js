import axios from "axios";

const { REACT_APP_API_URL } = process.env;

axios.defaults.withCredentials = true;

export const getAllSchoolSurvey = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/school-schemas/schools/${id}`
  );

  return data;
};

export const getCapabilityBySchemaId = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/capabilities/schemas/${id}`
  );

  return data;
};

export const addPosition = async (body) => {
  const { data } = await axios.post(
    `${REACT_APP_API_URL}/capability-positions`
  );

  return data;
};

export const deletePosition = async (id) => {
  const { data } = await axios.delete(
    `${REACT_APP_API_URL}/capability-positions${id}`
  );

  return data;
};

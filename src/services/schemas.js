import axios from "axios";

const { REACT_APP_API_URL } = process.env;

axios.defaults.withCredentials = true;

export const getAllSchemas = async () => {
  const { data } = await axios.get(`${REACT_APP_API_URL}/schemas`);

  return data;
};

export const getAllActiveSchemas = async () => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/schemas/active`
  );

  return data;
};

export const getAllSchoolSchema = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/school-schemas/schools/${id}`
  );

  return data;
};

export const addUserToSchema = async (body) => {
  const { data } = await axios.post(
    `${REACT_APP_API_URL}/surveys`,
    body
  );

  return data;
};

export const addSchoolToSchema = async (body) => {
  const { data } = await axios.post(
    `${REACT_APP_API_URL}/school-schemas`,
    body
  );

  return data;
};

export const createSchema = async (body) => {
  const { data } = await axios.post(
    `${REACT_APP_API_URL}/schemas`,
    body
  );

  return data;
};

export const deleteSchema = async (id) => {
  const { data } = await axios.delete(
    `${REACT_APP_API_URL}/schemas/${id}`
  );

  return data;
};

export const editSchema = async (id, body) => {
  const { data } = await axios.put(
    `${REACT_APP_API_URL}/schemas/${id}`,
    body
  );

  return data;
};

export const editSchoolSchema = async (id, body) => {
  console.log(`🚀🚀 ~~ editSchoolSchema ~~ id,body`, id, body);
  const { data } = await axios.put(
    `${REACT_APP_API_URL}/school-schemas/${id}`,
    body
  );

  return data;
};

export const getSchoolSchemaById = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/school-schemas/schemas/${id}`
  );

  return data;
};

export const activeSchoolSchema = async (id) => {
  const { data } = await axios.put(
    `${REACT_APP_API_URL}/schemas/${id}`
  );

  return data;
};

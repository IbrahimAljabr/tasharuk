import axios from "axios";

const { REACT_APP_API_URL } = process.env;

axios.defaults.withCredentials = true;

export const getAllRubricById = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/rubrics/indicators/${id}`
  );

  return data;
};

export const createRubric = async (body) => {
  const { data } = await axios.post(
    `${REACT_APP_API_URL}/rubrics`,
    body
  );

  return data;
};

export const deleteRubrics = async (id) => {
  const { data } = await axios.delete(
    `${REACT_APP_API_URL}/rubrics/${id}`
  );

  return data;
};

export const editRubric = async (id, body) => {
  const { data } = await axios.put(
    `${REACT_APP_API_URL}/rubrics/${id}`,
    body
  );

  return data;
};

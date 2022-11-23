import axios from "axios";

const { REACT_APP_API_URL } = process.env;

axios.defaults.withCredentials = true;

export const getAllIndicator = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/indicators/sub-capabilities/${id}`
  );

  return data;
};

export const createIndicator = async (body) => {
  const { data } = await axios.post(
    `${REACT_APP_API_URL}/indicators`,
    body
  );

  return data;
};

export const deleteIndicators = async (id) => {
  const { data } = await axios.delete(
    `${REACT_APP_API_URL}/indicators/${id}`
  );

  return data;
};

export const editIndicator = async (id, body) => {
  const { data } = await axios.put(
    `${REACT_APP_API_URL}/indicators/${id}`,
    body
  );

  return data;
};

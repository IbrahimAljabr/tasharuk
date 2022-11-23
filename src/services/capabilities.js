import axios from "axios";

const { REACT_APP_API_URL } = process.env;

axios.defaults.withCredentials = true;

export const getAllCapabilities = async () => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/capabilities`
  );

  return data;
};

export const getAllCapability = async () => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/capability-positions`
  );

  return data;
};

export const deleteCapability = async (id) => {
  const { data } = await axios.delete(
    `${REACT_APP_API_URL}/capabilities/${id}`
  );

  return data;
};

export const editCapability = async (id, body) => {
  const { data } = await axios.put(
    `${REACT_APP_API_URL}/capabilities/${id}`,
    body
  );

  return data;
};

export const editSubCapability = async (id, body) => {
  const { data } = await axios.put(
    `${REACT_APP_API_URL}/sub-capabilities/${id}`,
    body
  );

  return data;
};

export const deleteSubCapability = async (id) => {
  const { data } = await axios.delete(
    `${REACT_APP_API_URL}/sub-capabilities/${id}`
  );

  return data;
};

export const getAllSubCapabilityById = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/sub-capabilities/capabilities/${id}`
  );

  return data;
};

export const createCapabilities = async (body) => {
  const { data } = await axios.post(
    `${REACT_APP_API_URL}/capabilities`,
    body
  );
  console.log(`🚀🚀 ~~ createCapabilities ~~ data`, data);

  return data;
};

export const createSubCapability = async (body) => {
  const { data } = await axios.post(
    `${REACT_APP_API_URL}/sub-capabilities`,
    body
  );
  console.log(`🚀🚀 ~~ createCapabilities ~~ data`, data);

  return data;
};

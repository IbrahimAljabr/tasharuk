import axios from "axios";

const { REACT_APP_API_URL } = process.env;

axios.defaults.withCredentials = true;

export const getAllCapability = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/capabilities/schemas/${id}`
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

export const editUserCapability = async (id, body) => {
  const { data } = await axios.put(
    `${REACT_APP_API_URL}/users-capabilities/${id}`,
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

export const deleteUserCapability = async (id) => {
  const { data } = await axios.delete(
    `${REACT_APP_API_URL}/users-capabilities//${id}`
  );

  return data;
};

export const getAllSubCapabilityById = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/sub-capabilities/users-capabilities/${id}`
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

export const createUserCapability = async (body) => {
  const { data } = await axios.post(
    `${REACT_APP_API_URL}/users-capabilities`,
    body
  );
  console.log(`🚀🚀 ~~ createCapabilities ~~ data`, data);

  return data;
};

export const getAllUserCapabilityById = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/users-capabilities/capabilities/${id}`
  );

  return data;
};

import axios from "axios";

const { REACT_APP_API_URL } = process.env;

axios.defaults.withCredentials = true;

export const getSchools = async () => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/schools`,
    {}
  );

  return data;
};

export const getUsers = async (id) => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/school-users/schools/${id}`,
    {}
  );

  return data;
};

export const createSchool = async (body) => {
  const { data } = await axios.post(
    `${REACT_APP_API_URL}/schools`,
    body
  );

  return data;
};

export const addUsersBulk = async (id, formData) => {
  console.log(`🚀🚀 ~~ addUsersBulk ~~ id, body`, id, formData);
  const { data } = await axios({
    method:"post",
    url: `${REACT_APP_API_URL}/school-users/bulk-users/${id}`,
    data:formData,
    headers: { "Content-Type": "multipart/form-data" }
});

  return data;
};

export const addSchoolUser = async (body) => {
  const { data } = await axios.post(
    `${REACT_APP_API_URL}/school-users`,
    body
  );

  return data;
};

export const getAllCountries = async () => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/countries`,
    {}
  );

  return data;
};

export const getAllPositions = async () => {
  const { data } = await axios.get(
    `${REACT_APP_API_URL}/positions`,
    {}
  );

  return data;
};

export const deleteSchool = async (id) => {
  const { data } = await axios.delete(
    `${REACT_APP_API_URL}/schools/${id}`
  );

  return data;
};

export const editSchool = async (body) => {
  const { data } = await axios.put(
    `${REACT_APP_API_URL}/schools/${body?.company_register_id}`,
    body
  );

  return data;
};

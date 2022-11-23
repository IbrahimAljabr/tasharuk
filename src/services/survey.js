import axios from "axios";

const { REACT_APP_API_URL } = process.env;

axios.defaults.withCredentials = true;

export const getAllSurvey = async (id) => {
  const { data } = await axios.get(`${REACT_APP_API_URL}/surveys`);

  return data;
};

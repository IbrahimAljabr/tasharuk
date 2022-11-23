import axios from "axios";

const { REACT_APP_API_URL } = process.env;

const userName = localStorage.getItem("userName");
const password = localStorage.getItem("password");

/**
 * Login user.
 *
 *
 * @return {Promise<Object>} The login response.
 */
export const login = async ({ uname, pass }) => {
  const data = await axios.post(
    `${REACT_APP_API_URL}/system-users/login`,
    {},
    {
      auth: {
        username: userName,
        password: password
      }
    }
  );

  return data;
};

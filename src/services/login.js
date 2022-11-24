import axios from "axios";

const { REACT_APP_API_URL } = process.env;

axios.defaults.withCredentials = true;

/**
 * Login user.
 *
 *
 * @return {Promise<Object>} The login response.
 */
export const login = async (uname, pass) => {
  const data = await axios.post(
    `${REACT_APP_API_URL}/system-users/login`,
    {},
    {
      auth: {
        username: uname,
        password: pass
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }
  );
  console.log(`🚀🚀 ~~ login🚀🚀 ~~ data🚀🚀`, data);

  return data;
};

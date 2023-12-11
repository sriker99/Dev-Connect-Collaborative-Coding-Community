import axios from "axios";

const API_URL = "http://localhost:8000/api/user";

export const loginService = async (login) => {
  const loginInfo = await axios.post(`${API_URL}/login`, login);
  // if(loginInfo.data.success) {
  //   localStorage.setItem("user", JSON.stringify(loginInfo.data.user));
  //   localStorage.setItem("LoginToken", `Bearer ${loginInfo.data.token}`);
  // }
  return loginInfo.data;
};

export const logOutService = async () => {
    await axios.post(`${API_URL}/logout`);
    // localStorage.removeItem("user");
    // localStorage.removeItem("LoginToken");
  };
import axios from "axios";

const API_URL = "http://localhost:8000/api/user";

export const signUpService = async (signup) => {
  const response = await axios.post(`${API_URL}/signup`, signup);
  return response.data;
};
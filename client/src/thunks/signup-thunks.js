import { signUpService } from "../services/signup-service";

export const signupThunk = async (signup) => {
  const response = await signUpService(signup);
  console.log(response);
  return response;
};

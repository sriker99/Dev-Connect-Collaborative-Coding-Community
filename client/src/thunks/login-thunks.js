import { loginService, logOutService } from "../services/login-service";

export const LOGIN_USER = "LOGIN";
export const LOGOUT_USER = "LOGOUT";

// export const loginAction = async (dispatch, login) => {
//   const loginInfo = await loginService(login);
//   if (loginInfo.success) {
//     dispatch({
//       type: LOGIN_USER,
//       loginInfo,
//     });
//   }
//   return loginInfo;
// };

export const loginThunk = async (dispatch, login) => {
        const loginInfo = await loginService(login);
        if(loginInfo.success) {
            dispatch({ type: LOGIN_USER, payload: loginInfo.user });
        }

      return loginInfo;
};

export const logoutThunk = (dispatch) => {
    dispatch({
      type: LOGOUT_USER,
    });
    logOutService();
};
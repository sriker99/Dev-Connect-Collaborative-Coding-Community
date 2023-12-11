// import { isloggedinService } from "../../Services/LoginService";
// import { LOGIN_USER, LOGOUT_USER } from "../Actions/Login";

// const LogInReducer = (
//   state = isloggedinService()
//     ? { loggedIn: true, user: JSON.parse(localStorage.getItem("LoggedIn")) }
//     : { loggedIn: false, user: {} },
//   action
// ) => {
//   switch (action.type) {
//     case LOGOUT_USER:
//       return { loggedIn: false, user: {} };
//     case LOGIN_USER:
//       return { loggedIn: true, user: action.loginInfo };
//     default:
//       return state;
//   }
// };

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log("IN AUTH REDUCER", action.payload);
            return {...state, loggedIn: true, user: action.payload};
        case 'LOGOUT':
            return {...state, loggedIn: false, user: null};
        default:
            return state;
    }
};
export default authReducer;
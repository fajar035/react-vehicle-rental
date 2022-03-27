import { ACTION_STRING } from "./actionString";
import { loginApi, logoutApi } from "../../utils/https/auth";

export const loginAction = (body) => {
  return {
    type: ACTION_STRING.authLogin,
    payload: loginApi(body)
  };
};

export const logoutAction = (token) => {
  return {
    type: ACTION_STRING.authLogout,
    payload: logoutApi(token)
  };
};

import { ACTION_STRING } from "./actionString";
import { getUserIdApi } from "../../utils/https/user";

export const updateUserAction = (token) => {
  return {
    type: ACTION_STRING.updateImageUser,
    payload: getUserIdApi(token)
  };
};

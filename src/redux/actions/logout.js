import { ACTION_STRING } from "./actionString"

export const logoutAction = () => {
  return {
    type: ACTION_STRING.authLogout
  }
}

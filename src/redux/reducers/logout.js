import { ACTION_STRING } from "../actions/actionString"

const initialState = {
  userData: {
    token: JSON.parse(localStorage["vehicle-token"] || null),
    photo: "",
    role: 0
  }
}

const logoutReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case ACTION_STRING.authLogout:
      const token = JSON.parse(localStorage["vehicle-token"])

      if (token) {
        return {
          ...prevState.userData,
          token: "logout"
        }
      }
      break

    default:
      return prevState
  }
}

export default logoutReducer

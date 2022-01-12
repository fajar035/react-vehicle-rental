import { combineReducers } from "redux"
// menggabungkan semua reducer menjadi 1
import authReducer from "./auth"
import logoutReducer from "./logout"
// import themeReducer from "./theme"

const reducers = combineReducers({
  auth: authReducer
  // logout: authReducer
  // theme: themeReducer
})

export default reducers

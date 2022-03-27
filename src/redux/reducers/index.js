import { combineReducers } from "redux";
import authReducer from "./auth";
import storage from "redux-persist/lib/storage";

const appReducers = combineReducers({
  auth: authReducer
});

const rootReducer = (state, action) => {
  if (action.type === "AUTH_LOGOUT_FULFILLED") {
    storage.removeItem("persist:root");
    localStorage.removeItem("user-photo");
    localStorage.removeItem("user-role");
    localStorage.removeItem("vehicle-token");
    console.log("LOGOUT !!");
    state = undefined;
  }
  return appReducers(state, action);
};

export default rootReducer;

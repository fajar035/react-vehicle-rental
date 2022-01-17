import { combineReducers } from "redux"
import authReducer from "./auth"
import cardReducer from "./card"

const reducers = combineReducers({
  auth: authReducer,
  card: cardReducer
})

export default reducers

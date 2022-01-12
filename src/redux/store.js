import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import rpm from "redux-promise-middleware"

import reducers from "./reducers"

const enchancers = applyMiddleware(rpm, logger)
const store = createStore(reducers, enchancers)

export default store

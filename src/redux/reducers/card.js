import { ACTION_STRING } from "../actions/actionString"

import { ActionType } from "redux-promise-middleware"

const initialState = {
  vehiclePopular: {},
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {}
}
const cardReducer = (prevState = initialState, action) => {
  const { cardPopular } = ACTION_STRING
  const { Pending, Fulfilled, Rejected } = ActionType

  switch (action.type) {
    case cardPopular.concat("_", Pending):
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false
      }

    case cardPopular.concat("_", Fulfilled):
      const data = action.payload.data

      return {
        vehiclePopular: data,
        isRejected: false,
        isPending: false,
        isFulfilled: true
      }

    case cardPopular.concat("_", Rejected):
      const err = action.payload
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err
      }

    default:
      return prevState
  }
}

export default cardReducer

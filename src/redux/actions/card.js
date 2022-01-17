import { ACTION_STRING } from "./actionString"

import { card } from "../../utils/https/card"

export const cardAction = () => {
  return {
    type: ACTION_STRING.cardPopular,
    payload: card()
  }
}

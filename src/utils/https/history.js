import axios from "axios"

const URL = process.env.REACT_APP_HOST + "/history"
export const history = () => {
  return axios.get(URL)
}

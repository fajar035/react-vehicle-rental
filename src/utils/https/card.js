import axios from "axios"

const url = process.env.REACT_APP_HOST + "/history/popular"

export const card = () => {
  return axios.get(url)
}

import axios from "axios"

const url = `${process.env.REACT_APP_HOST}/vehicles?filter=bike`
export const getVeihcleBike = () => {
  return axios.get(url)
}

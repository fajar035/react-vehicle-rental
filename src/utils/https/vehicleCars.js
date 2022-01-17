import axios from "axios"

const url = `${process.env.REACT_APP_HOST}/vehicles?filter=cars`
export const getVehiclesCars = () => {
  return axios.get(url)
}

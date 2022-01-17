import axios from "axios"

const url = `${process.env.REACT_APP_HOST}/vehicles?filter=motorbike`
export const getVehiclesMotorBike = () => {
  return axios.get(url)
}

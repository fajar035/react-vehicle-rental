import axios from "axios";

export const getVehicleBikeApi = () => {
  const url = `${process.env.REACT_APP_HOST}/vehicles?filter=bike`;
  return axios.get(url);
};

export const getVehiclesMotorBikeApi = () => {
  const url = `${process.env.REACT_APP_HOST}/vehicles?filter=motorbike`;
  return axios.get(url);
};

export const getVehiclesCarsApi = () => {
  const url = `${process.env.REACT_APP_HOST}/vehicles?filter=cars`;
  return axios.get(url);
};

export const getVehiclesPopularApi = () => {
  const url = process.env.REACT_APP_HOST + "/history/popular";
  return axios.get(url);
};

// export const getVehicleSearchApi = (keyword, filter) => {
//   const url = process.env.REACT_APP_HOST + "";
// };

export const updateVehicleApi = (body, token) => {
  const url = process.env.REACT_APP_HOST + "/users/edit";
  const config = {
    headers: {
      "x-ccess-token": token
    }
  };
  return axios.patch(url, body, config);
};

export const getCategoryApi = () => {
  const url = process.env.REACT_APP_HOST + "/category";
  return axios.get(url);
};

export const getStatusApi = () => {
  const url = process.env.REACT_APP_HOST + "/status";
  return axios.get(url);
};

export const getLocationApi = () => {
  const url = process.env.REACT_APP_HOST + "/location";
  return axios.get(url);
};

export const addVehicleApi = (body, token) => {
  const url = process.env.REACT_APP_HOST + "/vehicles/";
  const config = {
    headers: {
      "x-access-token": token
    }
  };
  return axios.post(url, body, config);
};

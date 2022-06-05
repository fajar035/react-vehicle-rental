import axios from "axios";

export const getVehiclesBikeApi = () => {
  const url = `${process.env.REACT_APP_HOST}/vehicles?filterCategory=bike`;
  return axios.get(url);
};

export const getVehiclesMotorBikeApi = () => {
  const url = `${process.env.REACT_APP_HOST}/vehicles?filterCategory=motorbike`;
  return axios.get(url);
};

export const getVehiclesCarsApi = () => {
  const url = `${process.env.REACT_APP_HOST}/vehicles?filterCategory=cars`;
  return axios.get(url);
};

export const getVehiclesPopularApi = () => {
  const url = process.env.REACT_APP_HOST + "/history/popular";
  return axios.get(url);
};

export const searchVehicleHomeApi = (
  keyword,
  filterLocation,
  filterCategory
) => {
  const url =
    process.env.REACT_APP_HOST +
    `/vehicles?search=${keyword}&filterLocation=${filterLocation}&filterCategory=${filterCategory}`;
  return axios.get(url);
};

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

export const getVehicleApi = (id) => {
  const url = process.env.REACT_APP_HOST + "/vehicles/" + id;
  return axios.get(url);
};

export const getVehiclePopularIdApi = (id) => {
  const url = process.env.REACT_APP_HOST + "/history/popular/" + id;
  return axios.get(url);
};

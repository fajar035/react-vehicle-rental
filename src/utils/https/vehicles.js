import axios from "axios";

export const getVeihcleBikeApi = () => {
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

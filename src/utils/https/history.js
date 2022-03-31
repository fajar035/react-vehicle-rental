import axios from "axios";

export const getHistoryApi = (nameUser) => {
  const URL = process.env.REACT_APP_HOST + "/history?cari=" + nameUser;
  return axios.get(URL);
};

export const addHistoryApi = (body) => {
  return axios.post(URL, body);
};

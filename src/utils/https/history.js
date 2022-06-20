import axios from "axios";

export const getHistoryApi = (idUser, token) => {
  const URL =
    process.env.REACT_APP_HOST +
    "/history?id_user=" +
    idUser +
    "&sort=desc&by=id";
  return axios.get(URL, { headers: { "x-access-token": token } });
};

export const addHistoryApi = (body, token) => {
  const URL = process.env.REACT_APP_HOST + "/history";
  return axios.post(URL, body, {
    headers: { "x-access-token": token }
  });
};

export const deleteHistoryApi = (id, token) => {
  const URL = process.env.REACT_APP_HOST + "/history/" + id;
  return axios.delete(URL, { headers: { "x-access-token": token } });
};

export const updateRatingHistoryApi = (id, body, token) => {
  console.log(body);
  const url = process.env.REACT_APP_HOST + "/history/" + id;
  return axios.patch(url, body, {
    headers: { "x-access-token": token }
  });
};

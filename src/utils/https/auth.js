import axios from "axios";

export const loginApi = (body) => {
  const URL = process.env.REACT_APP_HOST + "/auth/login";
  return axios.post(URL, body);
};

export const registerApi = (body) => {
  const URL = process.env.REACT_APP_HOST + "/auth/register";
  return axios.post(URL, body);
};

export const logoutApi = (token) => {
  const URL = process.env.REACT_APP_HOST + "/auth/logout";
  return axios.delete(URL, { headers: { "x-access-token": token } });
};

export const getOtpApi = (body) => {
  const url = process.env.REACT_APP_HOST + "/auth/get-otp";
  return axios.post(url, body);
};

export const checkOtpApi = (body) => {
  const url = process.env.REACT_APP_HOST + "/auth/check-otp";
  return axios.post(url, body);
};

export const resetPasswordApi = (body) => {
  const url = process.env.REACT_APP_HOST + "/auth/forgot-password";
  return axios.post(url, body);
};

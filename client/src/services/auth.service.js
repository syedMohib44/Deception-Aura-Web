/* eslint-disable no-unused-vars */
import axios from "axios";
import jwt_decode from 'jwt-decode';

const API_URL = "http://localhost:28017/api";

const register = (formData) => {
  return axios.post(API_URL + '/auth/register', formData, {
    headers: {
      "content-type": "application/json"
    }
  })
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/auth/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.data) {
        //JSON.stringify(response.data.token)
        localStorage.setItem("token", 'Bearer ' + response.data.data.token);
      }
      return response.data;
    });
};

const loginAdmin = (username, password) => {
  return axios
    .post(API_URL + "/superadmin/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.data) {
        //JSON.stringify(response.data.token)
        localStorage.setItem("token", 'Bearer ' + response.data.data.token);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  login,
  loginAdmin,
  logout,
};
/* eslint-disable no-unused-vars */
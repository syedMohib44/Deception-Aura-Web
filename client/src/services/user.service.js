import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://localhost:28017/api/';
const getProducts = (limit, page, businessId) => {
  return axios.get(API_URL + `user/product?limit=${limit}&page=${page}&businessId=${businessId}&pagination=${true}`,
    { headers: authHeader() });
};

const getProductsConsumer = (limit, page, businessId) => {
  return axios.get(API_URL + `product?limit=${limit}&page=${page}&businessId=${businessId}&pagination=${true}`);
};

const getRatingAvg = (productId) => {
  return axios.get(API_URL + `rating/${productId}`);
};

const postProduct = (name, price, business) => {
  return axios.post(API_URL + 'user/product/', {
    name,
    price

  }, { headers: authHeader() });
}

export const postCampaing = (name, product, files) => {
  return axios.post(API_URL + 'user/campaing/', {
    name,
    product,
    files
  }, { headers: authHeader() });
}


const getCampaings = (limit, page, productId) => {
  return axios.get(API_URL + `user/campaing?productId=${productId}&page=${page}&limit=${limit}&pagination=${true}`,
    { headers: authHeader() });
}

const postRating = (ratingObj) => {
  console.log({ ...ratingObj });
  return axios.post(API_URL + 'rating/',
    { ...ratingObj });
}

const putCampaing = (updateObj) => {
  return axios.put(API_URL + 'user/campaing', {
    ...updateObj
  }, { headers: authHeader() });
}

const deactivateBusiness = ({ id, isActive }) => {
  return axios.put(API_URL + 'superadmin/business/deactivate', {
    id, isActive
  }, { headers: authHeader() });
}

export const getBusinesses = (limit, page) => {
  return axios.get(API_URL + `business?page=${page}&limit=${limit}&pagination=${true}`);
}

const getUserBoard = () => {
  return axios.get(API_URL + '/user', { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + '/mod', { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + '/admin', { headers: authHeader() });
};

export default {
  getProducts,
  getCampaings,
  putCampaing,
  getProductsConsumer,
  postProduct,
  getBusinesses,
  postCampaing,
  postRating,
  getUserBoard,
  deactivateBusiness,
  getModeratorBoard,
  getRatingAvg,
  getAdminBoard,
};
import {
  SET_MESSAGE,
  POST_DATA_SUCCESS,
  POST_DATA_FAIL
} from "./types";

import UserService from "../services/user.service";

export const postProduct = (formData) => (dispatch) => {

  return UserService.postProduct(formData).then(
    (response) => {
      console.log(response);
      dispatch({
        type: POST_DATA_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      console.log(error.response.data.data.message);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: POST_DATA_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const postCampaing = (formData) => (dispatch) => {

  return UserService.postCampaing(formData).then(
    (response) => {
      console.log(response);
      dispatch({
        type: POST_DATA_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      console.log(error.response.data.data.message);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: POST_DATA_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const postBusiness = (name, productId, files) => (dispatch) => {

  return UserService.postBusiness(name, productId, files).then(
    (response) => {
      console.log(response);
      dispatch({
        type: POST_DATA_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      console.log(error.response.data.data.message);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: POST_DATA_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

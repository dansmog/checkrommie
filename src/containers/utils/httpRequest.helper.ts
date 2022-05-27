import axios from "axios";
import { toast } from "react-toastify";
// import configKeys from './config.helper';

const axiosConfig = {
  baseURL: "https://checkroomie.herokuapp.com/api",
};

const httpRequestHelper = axios.create(axiosConfig)

httpRequestHelper.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),

  (error: any) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    console.log(error.response)

    if (!error.response.data) {
      return toast.error(
        "Please check your internet connectivity and try again"
      );
    }
    if (error.response.status === 401) {
      toast.error("Your token has expired, redirecting you to login page");
      localStorage.removeItem("checkrommie__user");
      setTimeout(() => {
        window.location.replace("/login");
      }, 2000);
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);


export default httpRequestHelper;
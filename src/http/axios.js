import axios from "axios";
import { url } from "../global/variables";

const axiosClient = axios.create({ baseURL: url });
export const setupInterceptors = (dispatch, navigate) => {
  axiosClient.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.data && user.data.accessToken) {
      config.headers.Authorization = `Bearer ${user.data.accessToken}`;
    }
    return config;
  });
  axiosClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response && error.response.status === 401) {
        if (error.response.status === 401) localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      }

      return Promise.reject(error);
    }
  );
};

export default axiosClient;

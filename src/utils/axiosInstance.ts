import axios from 'axios';
import store from '../store/store';
import { refreshTokensAsync } from '../services/token.service';


const axiosInstance = axios.create({
  baseURL: 'https://api.mwape.org',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().authSlice.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await store.dispatch(refreshTokensAsync());
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

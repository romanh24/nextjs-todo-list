import axios from 'axios';
import { ApiUrlV1 } from '@/app/api/constants/apiVersion';

const AxiosInstance = axios.create({
  baseURL: ApiUrlV1,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    const accessToken = userInfo ? JSON.parse(userInfo).accessToken : null;

    if (accessToken && config.headers) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const authResponse = await axios.post(`${ApiUrlV1}/auth`);
        localStorage.setItem('userInfo', JSON.stringify(authResponse.data));

        originalRequest.headers.authorization = `Bearer ${authResponse.data.accessToken}`;
        return AxiosInstance(originalRequest);
      } catch (authError) {
        console.error('Authentication failed:', authError);
        return Promise.reject(authError);
      }
    }

    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const refreshToken = userInfo.refreshToken;
        const userId = userInfo.user.id;

        if (!refreshToken) {
          new Error('Refresh token not found');
        }

        const response = await axios.post(`${ApiUrlV1}/auth/refresh`, {
          id: userId,
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            ...userInfo,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          })
        );

        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return AxiosInstance(originalRequest);
      } catch (err) {
        console.error('Token refresh failed', err);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;

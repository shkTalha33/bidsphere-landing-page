import axios from "axios";
export const baseURL = 'https://api.castle-auction.com/api/'
// export const baseURL = 'http://192.168.18.134:8080/api/'
export const socketURL = 'https://api.castle-auction.com/'
// export const token = localStorage.getItem("auction_user_token");
export const axiosInstance = axios.create({
  baseURL: baseURL,
});
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auction_user_token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => Promise.reject(error)
);
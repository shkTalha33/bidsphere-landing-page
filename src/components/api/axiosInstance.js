import axios from "axios";

const GoogleApiKey = "AIzaSyBH0Ey-G2PbWkSCLyGG1A9TCg9LDPlzQpc";

const headers = {
  "Content-Type": "application/json",
};

const headers2 = {
  "Content-Type": "multipart/form-data",
};

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5333/api/',
  baseURL: 'https://auctionhousebackend.onrender.com/api/',
  headers,
});

const axiosInstance2 = axios.create({
  baseURL: 'https://auctionhousebackend.onrender.com/api/',
  headers: headers2,
});

// Set the x-auth-token header for axiosInstance (JSON)
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auction_user_token')
    if (token) {
      config.headers["x-auth-token"] = `${token}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Set the x-auth-token header for axiosInstance2 (multipart/form-data)
axiosInstance2.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auction_user_token')
    if (token) {
      config.headers["x-auth-token"] = `${token}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { headers, headers2, GoogleApiKey, axiosInstance2 };
export default axiosInstance;

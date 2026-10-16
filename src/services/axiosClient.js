import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "api/v1";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

// Có thể thêm interceptors ở đây sau này
// axiosClient.interceptors.request.use(...)
// axiosClient.interceptors.response.use(...)

export default axiosClient;

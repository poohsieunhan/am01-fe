import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "api/v1";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});



export default axiosClient;

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "api/v1"; // Sử dụng đường dẫn tương đối để proxy hoạt động

const api = axios.create({
  baseURL: API_BASE_URL,
});

const exportTempApi = {
  downloadTemplate() {
    return api.get("/export/companyTemp", {
      responseType: "blob",
    });
  },
};

export default exportTempApi;

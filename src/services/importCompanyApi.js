import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "api/v1"; // Sử dụng đường dẫn tương đối để proxy hoạt động

const api = axios.create({
  baseURL: API_BASE_URL,
});

const importCompanyApi = {
  importExcel(formData) {
    return api.post("/import/importCompany", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default importCompanyApi;

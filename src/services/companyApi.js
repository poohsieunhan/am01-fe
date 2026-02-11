import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL + "api/v1"; // Sử dụng đường dẫn tương đối để proxy hoạt động

const api = axios.create({
  baseURL: API_BASE_URL,
});

const companyApi = {
  async getAll({ page = 1, limit = 10 }) {
    const res = await api.get("/company", {
      params: { page, limit },
    });
    return res.data.metadata; // Trả về phần metadata chứa data và pagination
  },

  async add(data) {
    const res = await api.post("/company", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/company/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/company/${id}`);
    return res.data;
  },
};

export default companyApi;

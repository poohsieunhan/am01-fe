import axiosClient from "./axiosClient";

const api = axiosClient;

const emailConfigApi = {
  async getAll({ page = 1, limit = 10, search = "" } = {}) {
    const res = await api.get("/emailconfig", {
      params: { page, limit, search: search || undefined },
    });
    return res.data.metadata;
  },

  async getById(id) {
    const res = await api.get(`/emailconfig/${id}`);
    return res.data.metadata;
  },

  async add(data) {
    const res = await api.post("/emailconfig", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/emailconfig/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/emailconfig/${id}`);
    return res.data;
  },
};

export default emailConfigApi;

import axiosClient from "./axiosClient";

const api = axiosClient;

const accountApi = {
  async getAll({ page = 1, limit = 10 } = {}) {
    const res = await api.get("/account", {
      params: { page, limit },
    });
    return res.data.metadata;
  },

  async getById(id) {
    const res = await api.get(`/account/${id}`);
    return res.data.metadata;
  },

  async add(data) {
    const res = await api.post("/account", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/account/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/account/${id}`);
    return res.data;
  },
};

export default accountApi;

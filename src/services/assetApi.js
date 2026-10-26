import axiosClient from "./axiosClient";

const api = axiosClient;

const assetApi = {
  async getAll({ page = 1, limit = 10 } = {}) {
    const res = await api.get("/asset", {
      params: { page, limit },
    });
    return res.data.metadata;
  },

  async getById(id) {
    const res = await api.get(`/asset/${id}`);
    return res.data.metadata;
  },

  async add(data) {
    const res = await api.post("/asset", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/asset/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/asset/${id}`);
    return res.data;
  },
};

export default assetApi;

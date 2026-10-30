import axiosClient from "./axiosClient";

const api = axiosClient;

const assetTypeApi = {
  async getAll({ page = 1, limit = 10, search = "" } = {}) {
    const res = await api.get("/assettype", {
      params: { page, limit, search: search || undefined },
    });
    return res.data.metadata;
  },

  async getById(id) {
    const res = await api.get(`/assettype/${id}`);
    return res.data.metadata;
  },

  async add(data) {
    const res = await api.post("/assettype", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/assettype/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/assettype/${id}`);
    return res.data;
  },
};

export default assetTypeApi;

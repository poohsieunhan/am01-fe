import axiosClient from "./axiosClient";

const api = axiosClient;

const assetNotificationApi = {
  async getAll({ page = 1, limit = 10 } = {}) {
    const res = await api.get("/assetnotification", {
      params: { page, limit },
    });
    return res.data.metadata;
  },

  async getById(id) {
    const res = await api.get(`/assetnotification/${id}`);
    return res.data.metadata;
  },

  async add(data) {
    const res = await api.post("/assetnotification", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/assetnotification/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/assetnotification/${id}`);
    return res.data;
  },
};

export default assetNotificationApi;

import axiosClient from "./axiosClient";

const api = axiosClient;

const assetTypeNotificationApi = {
  async getAll({ page = 1, limit = 10, search = "" } = {}) {
    const res = await api.get("/assettypenotification", {
      params: { page, limit, search: search || undefined },
    });
    return res.data.metadata;
  },

  async getById(id) {
    const res = await api.get(`/assettypenotification/${id}`);
    return res.data.metadata;
  },

  async add(data) {
    const res = await api.post("/assettypenotification", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/assettypenotification/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/assettypenotification/${id}`);
    return res.data;
  },
};

export default assetTypeNotificationApi;

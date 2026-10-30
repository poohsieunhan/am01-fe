import axiosClient from "./axiosClient";

const api = axiosClient;

const assetApi = {
  async getAll({ page = 1, limit = 10, search = "" } = {}) {
    const res = await api.get("/asset", {
      params: { page, limit, search: search || undefined },
    });
    return res.data.metadata;
  },

  async getExpiring({ days = 30, page = 1, limit = 50, type = "expiring", search = "" } = {}) {
    const res = await api.get("/asset/expiring", {
      params: { days, page, limit, type, search: search || undefined },
    });
    return res.data.metadata;
  },

  async sendNotificationMail({ type = "expiring", days = 30 } = {}) {
    const res = await api.post("/asset/send-notification-mail", { type, days });
    return res.data;
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

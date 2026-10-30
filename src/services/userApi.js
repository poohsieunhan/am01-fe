import axiosClient from "./axiosClient";

const api = axiosClient;

const userApi = {
  async login(credentials) {
    const res = await api.post("/user/login", credentials);
    return res.data.metadata;
  },

  async getAll({ page = 1, limit = 10, search = "" } = {}) {
    const res = await api.get("/user", {
      params: { page, limit, search: search || undefined },
    });
    return res.data.metadata;
  },

  async getById(id) {
    const res = await api.get(`/user/${id}`);
    return res.data.metadata;
  },

  async add(data) {
    const res = await api.post("/user", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/user/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/user/${id}`);
    return res.data;
  },
};

export default userApi;

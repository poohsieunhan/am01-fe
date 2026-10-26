import axiosClient from "./axiosClient";

const api = axiosClient;

const projectApi = {
  async getAll({ page = 1, limit = 10 } = {}) {
    const res = await api.get("/project", {
      params: { page, limit },
    });
    return res.data.metadata;
  },

  async getById(id) {
    const res = await api.get(`/project/${id}`);
    return res.data.metadata;
  },

  async add(data) {
    const res = await api.post("/project", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/project/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/project/${id}`);
    return res.data;
  },
};

export default projectApi;

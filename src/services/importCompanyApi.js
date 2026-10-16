import axiosClient from "./axiosClient";

const api = axiosClient;

const importCompanyApi = {
  importExcel(formData) {
    return api.post("/import/importCompany", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default importCompanyApi;

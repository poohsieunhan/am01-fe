import axiosClient from "./axiosClient";

const api = axiosClient;

const exportTempApi = {
  downloadTemplate() {
    return api.get("/export/companyTemp", {
      responseType: "blob",
    });
  },
};

export default exportTempApi;

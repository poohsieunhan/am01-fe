// src/hooks/useCompanies.js
import { useEffect, useState, useMemo } from "react";
import companyApi from "../../services/companyApi";
import toast from "react-hot-toast";

export function useCompanies(initialPage = 1, initialLimit = 10) {
  const [companies, setCompanies] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchCompanies = async ({ page = 1, limit = 10 } = {}) => {
    try {
      setLoading(true);
      setError("");
      const res = await companyApi.getAll({ page, limit });
      //console.log("fetchCompanies res:", res); 
      //console.log("res.pagination:", res.pagination);
      setCompanies(res.data || []);
      setPagination(res.pagination || null);
    } catch (err) {
      console.error(err);
      setError("Không tải được danh sách công ty. Kiểm tra lại backend.");
      toast.error("Không tải được danh sách công ty.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies({ page: initialPage, limit: initialLimit });
  }, [initialPage, initialLimit]);

  const handleChangePage = (page) => {
    //console.log("handleChangePage -> goto:", page);
    fetchCompanies({ page, limit: pagination?.limit || initialLimit });
  };

  const filteredCompanies = useMemo(() => {
    if (!searchText) return companies;

    const keyword = searchText.toLowerCase();
    return companies.filter((c) => {
      const ten = c.TenCongTy?.toLowerCase() || "";
      const mst = c.MaSoThue?.toLowerCase() || "";
      return ten.includes(keyword) || mst.includes(keyword);
    });
  }, [companies, searchText]);

  return {
    companies,
    filteredCompanies,
    pagination,
    loading,
    error,
    searchText,
    setSearchText,
    fetchCompanies,
    handleChangePage,
  };
}

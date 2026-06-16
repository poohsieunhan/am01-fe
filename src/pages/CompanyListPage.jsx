import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import CompanyToolbar from "../components/company/CompanyToolbar";
import MyDataTable from "../components/common/MyDataTable";
import CompanyFormModal from "../components/company/CompanyFormModal";
import { companyColumns } from "../components/company/companyColumns";

import importCompanyApi from "../services/importCompanyApi";
import exportTempApi from "../services/exporttempApi";
import toast from "react-hot-toast";

// Redux
import {
  fetchCompanies,
  setCompanySearchText,
} from "../features/company/companySlice";
import {
  selectFilteredCompanies,
  selectCompanyPagination,
  selectCompanyLoading,
  selectCompanyError,
  selectCompanySearchText,
} from "../features/company/companySelectors";

import { useCompanyForm } from "../hooks/company/useCompanyForm";

function CompanyListPage() {
  const dispatch = useDispatch();

  // selectors
  const filteredCompanies = useSelector(selectFilteredCompanies);
  const pagination = useSelector(selectCompanyPagination);
  const loading = useSelector(selectCompanyLoading);
  const error = useSelector(selectCompanyError);
  const searchText = useSelector(selectCompanySearchText);

  const {
    open,
    mode,
    selectedCompany,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  } = useCompanyForm();

  const limit = pagination?.limit || 10;

  useEffect(() => {
    dispatch(fetchCompanies({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleChangePage = useCallback(
    (nextPage) => {
      dispatch(fetchCompanies({ page: nextPage, limit }));
    },
    [dispatch, limit],
  );

  // Import Excel: giữ nguyên logic toast, nhưng refresh qua Redux
  const handleImportExcel = async (formData) => {
    try {
      const res = await importCompanyApi.importExcel(formData);
      const { total, inserted, errors } = res.data;

      if (errors?.length) {
        toast.error(`Import xong: ${inserted}/${total} dòng thành công`);
        errors.forEach((err) => toast(err, { icon: "⚠️" }));
      } else {
        toast.success(`Import thành công ${inserted}/${total} dòng`);
      }

      // refresh list
      dispatch(fetchCompanies({ page: 1, limit }));
    } catch (err) {
      toast.error("Import thất bại");
      console.log("handle import excel:", err);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const res = await exportTempApi.downloadTemplate();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "company_template.xlsx");
      document.body.appendChild(link);
      link.click();
      toast.success("Đã tải template Excel");
    } catch (err) {
      toast.error("Không thể tải template");
      console.log("handle template download:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="mx-auto max-w-7xl px-4 space-y-6">
        <CompanyToolbar
          searchText={searchText}
          setSearchText={(val) => dispatch(setCompanySearchText(val))}
          onAdd={openCreate}
          onImportExcel={handleImportExcel}
          onDownloadTemplate={handleDownloadTemplate}
        />

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          {loading && (
            <div className="py-10 text-center text-slate-500">
              Đang tải dữ liệu...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
              {error}
            </div>
          )}

          {!loading && !error && (
            <MyDataTable
              columns={companyColumns}
              data={filteredCompanies}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(company) => (
                <>
                  <button
                    type="button"
                    onClick={() => openEdit(company)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(company)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </>
              )}
            />
          )}
        </div>

        <CompanyFormModal
          open={open}
          mode={mode}
          formData={formData}
          formError={formError}
          submitting={submitting}
          selectedCompany={selectedCompany}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}

export default CompanyListPage;

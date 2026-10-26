import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProjectToolbar from "../components/project/ProjectToolbar";
import MyDataTable from "../components/common/MyDataTable";
import ProjectFormModal from "../components/project/ProjectFormModal";
import { projectColumns } from "../components/project/projectColumns";

// Redux
import {
  fetchProjects,
  setProjectSearchText,
} from "../features/project/projectSlice";
import {
  selectFilteredProjects,
  selectProjectPagination,
  selectProjectLoading,
  selectProjectError,
  selectProjectSearchText,
} from "../features/project/projectSelectors";

import { useProjectForm } from "../hooks/project/useProjectForm";

function ProjectListPage() {
  const dispatch = useDispatch();

  const filteredProjects = useSelector(selectFilteredProjects);
  const pagination = useSelector(selectProjectPagination);
  const loading = useSelector(selectProjectLoading);
  const error = useSelector(selectProjectError);
  const searchText = useSelector(selectProjectSearchText);

  const {
    open,
    mode,
    selectedProject,
    formData,
    formError,
    submitting,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleChange,
    handleSubmit,
  } = useProjectForm();

  const limit = pagination?.limit || 10;

  useEffect(() => {
    dispatch(fetchProjects({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleChangePage = useCallback(
    (nextPage) => {
      dispatch(fetchProjects({ page: nextPage, limit }));
    },
    [dispatch, limit]
  );

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="mx-auto max-w-7xl px-4 space-y-6">
        <ProjectToolbar
          searchText={searchText}
          setSearchText={(val) => dispatch(setProjectSearchText(val))}
          onAdd={openCreate}
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
              columns={projectColumns}
              data={filteredProjects}
              pagination={pagination}
              onChangePage={handleChangePage}
              actionsHeader="THAO TÁC"
              renderActions={(project) => (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(project)}
                    className="px-3 py-1 text-xs font-medium rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDelete(project)}
                    className="px-3 py-1 text-xs font-medium rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              )}
            />
          )}
        </div>

        <ProjectFormModal
          open={open}
          mode={mode}
          formData={formData}
          formError={formError}
          submitting={submitting}
          selectedProject={selectedProject}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      </div>
    </div>
  );
}

export default ProjectListPage;

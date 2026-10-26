import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProject,
  deleteProject,
  updateProject,
} from "../../features/project/projectSlice";
import { selectProjectPagination } from "../../features/project/projectSelectors";

function initialForm() {
  return {
    Name: "",
    Address: "",
  };
}

export function useProjectForm() {
  const dispatch = useDispatch();
  const pagination = useSelector(selectProjectPagination);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState(initialForm());
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const openCreate = () => {
    setMode("create");
    setSelectedProject(null);
    setFormData(initialForm());
    setFormError("");
    setOpen(true);
  };

  const openEdit = (project) => {
    setMode("edit");
    setSelectedProject(project);
    setFormData({
      Name: project.Name || "",
      Address: project.Address || "",
    });
    setFormError("");
    setOpen(true);
  };

  const openDelete = (project) => {
    setMode("delete");
    setSelectedProject(project);
    setFormError("");
    setOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
    setSelectedProject(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      if (mode !== "delete") {
        if (!formData.Name.trim()) {
          setFormError("Tên dự án là bắt buộc.");
          return;
        }
        if (!formData.Address.trim()) {
          setFormError("Địa chỉ dự án là bắt buộc.");
          return;
        }
      }

      const refetch = {
        page: mode === "edit" ? pagination?.page || 1 : 1,
        limit: pagination?.limit || 10,
      };

      const payload = {
        Name: formData.Name.trim(),
        Address: formData.Address.trim(),
      };

      if (mode === "create") {
        const action = await dispatch(createProject({ payload, refetch }));
        if (!createProject.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Thêm mới thất bại.");
          return;
        }
      } else if (mode === "edit") {
        const action = await dispatch(
          updateProject({ id: selectedProject.Id, payload, refetch })
        );
        if (!updateProject.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Cập nhật thất bại.");
          return;
        }
      } else if (mode === "delete") {
        const action = await dispatch(
          deleteProject({ id: selectedProject.Id, refetch })
        );
        if (!deleteProject.fulfilled.match(action)) {
          setFormError(action.payload?.message || "Xóa thất bại.");
          return;
        }
      }

      closeModal();
    } finally {
      setSubmitting(false);
    }
  };

  return {
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
  };
}

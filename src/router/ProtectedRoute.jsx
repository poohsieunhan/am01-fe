import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  selectIsAuthenticated,
  selectIsAdmin,
} from "../features/auth/authSelectors";

/**
 * Component bảo vệ Route theo trạng thái đăng nhập và quyền Admin
 * @param {boolean} requireAdmin - Nếu true, chỉ Admin (Role: 1) mới được truy cập, User sẽ bị chuyển về /asset
 */
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu route yêu cầu quyền Admin mà user chỉ có role User (Role !== 1)
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/asset" replace />;
  }

  return children;
}

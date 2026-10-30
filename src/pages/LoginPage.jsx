import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, User, Eye, EyeOff, ShieldCheck, Boxes } from "lucide-react";
import { login, clearAuthError } from "../features/auth/authSlice";
import {
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  selectUserRole,
} from "../features/auth/authSelectors";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const role = useSelector(selectUserRole);

  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Nếu đã đăng nhập thì tự động chuyển hướng
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname;
      if (from && (role === 1 || from === "/asset" || from === "/dashboard")) {
        navigate(from, { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, role, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginName.trim() || !password.trim()) return;

    dispatch(clearAuthError());
    dispatch(
      login({
        LoginName: loginName.trim(),
        Password: password.trim(),
      })
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 mb-4 shadow-lg shadow-indigo-500/10 backdrop-blur-sm">
            <Boxes className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Hệ thống Quản lý Tài sản
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Đăng nhập để truy cập hệ thống theo quyền hạn
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {authError && (
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3.5 text-sm text-rose-400 flex items-start gap-2.5">
                <span className="font-semibold">⚠️</span>
                <span>{authError}</span>
              </div>
            )}

            {/* LoginName Input */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="loginName"
                className="block text-xs font-medium text-slate-300"
              >
                Tên đăng nhập
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="loginName"
                  type="text"
                  autoComplete="username"
                  required
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  placeholder="Nhập tên đăng nhập..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5 text-left">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-slate-300"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Đăng nhập</span>
                </>
              )}
            </button>
          </form>

          {/* Quick instructions / info */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-400 text-left space-y-1">
            <p className="font-semibold text-slate-300">Phân quyền tài khoản:</p>
            <p>
              • <span className="text-indigo-400 font-medium">Role Admin (1):</span> Toàn quyền truy cập mọi menu & thêm/sửa/xóa.
            </p>
            <p>
              • <span className="text-emerald-400 font-medium">Role User (2):</span> Xem Dashboard và Tài sản, không sửa xóa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

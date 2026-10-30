import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  House,
  Building2,
  Boxes,
  Layers,
  FolderKanban,
  Users,
  MailCheck,
  Mail,
  BellRing,
  Bell,
  ChevronDown,
  ChevronRight,
  Settings,
  LayoutDashboard,
  UserCog,
  LogOut,
  User as UserIcon,
  Shield,
} from "lucide-react";
import { logout } from "../features/auth/authSlice";
import {
  selectCurrentUser,
  selectIsAdmin,
} from "../features/auth/authSelectors";

const layoutStyle = {
  display: "flex",
  height: "100vh",
  width: "100vw",
  overflowX: "hidden",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
};

const contentStyle = {
  flex: 1,
  minWidth: 0,
  padding: "16px",
  overflowY: "auto",
};

const activeLinkStyle = {
  fontWeight: "bold",
  color: "#1976d2",
};

function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isAdmin = useSelector(selectIsAdmin);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const isOrgActive =
    location.pathname.startsWith("/company") ||
    location.pathname.startsWith("/project");
  const [orgOpen, setOrgOpen] = useState(true);

  const isConfigActive =
    location.pathname.startsWith("/assettype") ||
    location.pathname.startsWith("/account") ||
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/emailconfig") ||
    location.pathname.startsWith("/emailrecipient") ||
    location.pathname.startsWith("/assettypenotification") ||
    location.pathname.startsWith("/assetnotification");
  const [configOpen, setConfigOpen] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const sidebarStyle = useMemo(
    () => ({
      width: sidebarOpen ? "230px" : "56px",
      borderRight: "1px solid #ddd",
      padding: sidebarOpen ? "16px" : "10px",
      boxSizing: "border-box",
      transition: "width 180ms ease, padding 180ms ease",
      overflow: "hidden",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: "#ffffff",
    }),
    [sidebarOpen]
  );

  return (
    <div style={layoutStyle}>
      {/* SIDEBAR */}
      <aside style={sidebarStyle}>
        {/* Header / Toggle */}
        <button
          type="button"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-expanded={sidebarOpen}
          title={sidebarOpen ? "Thu gọn" : "Mở rộng"}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarOpen ? "space-between" : "center",
            gap: "8px",
            padding: "8px",
            border: "1px solid #e5e7eb",
            background: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {sidebarOpen && (
            <span style={{ fontSize: 18, fontWeight: 700 }}>Quản lý</span>
          )}
          <span style={{ fontSize: 16 }}>{sidebarOpen ? "⟨" : "⟩"}</span>
        </button>

        {/* Menu */}
        <nav
          style={{
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flex: 1,
            overflowY: "auto",
          }}
        >
          {/* Menu: Dashboard (Cả Admin và User) */}
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({
              ...(isActive || location.pathname === "/" ? activeLinkStyle : null),
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              whiteSpace: "nowrap",
            })}
            title={!sidebarOpen ? "Dashboard" : undefined}
          >
            <LayoutDashboard size={16} />
            {sidebarOpen && <span style={{ fontSize: "14px" }}>Dashboard</span>}
          </NavLink>

          {/* Menu: Tài sản (Cả Admin và User) */}
          <NavLink
            to="/asset"
            style={({ isActive }) => ({
              ...(isActive ? activeLinkStyle : null),
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              whiteSpace: "nowrap",
            })}
            title={!sidebarOpen ? "Tài sản" : undefined}
          >
            <Boxes size={16} />
            {sidebarOpen && <span style={{ fontSize: "14px" }}>Tài sản</span>}
          </NavLink>

          {/* Menu cha: Công ty & Dự án (Chỉ Admin) */}
          {isAdmin && (
            <div>
              <button
                type="button"
                onClick={() => {
                  if (!sidebarOpen) {
                    setSidebarOpen(true);
                    setOrgOpen(true);
                  } else {
                    setOrgOpen((v) => !v);
                  }
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: sidebarOpen ? "space-between" : "center",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "none",
                  background: isOrgActive ? "#e0f2fe" : "transparent",
                  color: isOrgActive ? "#0284c7" : "inherit",
                  cursor: "pointer",
                  fontWeight: isOrgActive ? "600" : "normal",
                  textAlign: "left",
                  transition: "background-color 150ms ease",
                }}
                title={!sidebarOpen ? "Công ty & Dự án" : undefined}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    minWidth: 0,
                  }}
                >
                  <Building2 size={16} />
                  {sidebarOpen && (
                    <span style={{ fontSize: "14px", whiteSpace: "nowrap" }}>
                      Công ty & Dự án
                    </span>
                  )}
                </div>
                {sidebarOpen && (
                  <span style={{ color: "#64748b" }}>
                    {orgOpen ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </span>
                )}
              </button>

              {/* Submenu cấp con */}
              {sidebarOpen && orgOpen && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    marginTop: "4px",
                    paddingLeft: "16px",
                    borderLeft: "2px solid #e2e8f0",
                    marginLeft: "14px",
                  }}
                >
                  <NavLink
                    to="/company"
                    style={({ isActive }) => ({
                      ...(isActive ? activeLinkStyle : null),
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    })}
                  >
                    <Building2 size={14} />
                    <span>Công ty</span>
                  </NavLink>

                  <NavLink
                    to="/project"
                    style={({ isActive }) => ({
                      ...(isActive ? activeLinkStyle : null),
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    })}
                  >
                    <FolderKanban size={14} />
                    <span>Dự án</span>
                  </NavLink>
                </div>
              )}
            </div>
          )}

          {/* Menu cha: Cấu hình (Chỉ Admin) */}
          {isAdmin && (
            <div>
              <button
                type="button"
                onClick={() => {
                  if (!sidebarOpen) {
                    setSidebarOpen(true);
                    setConfigOpen(true);
                  } else {
                    setConfigOpen((v) => !v);
                  }
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: sidebarOpen ? "space-between" : "center",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "none",
                  background: isConfigActive ? "#e0f2fe" : "transparent",
                  color: isConfigActive ? "#0284c7" : "inherit",
                  cursor: "pointer",
                  fontWeight: isConfigActive ? "600" : "normal",
                  textAlign: "left",
                  transition: "background-color 150ms ease",
                }}
                title={!sidebarOpen ? "Cấu hình" : undefined}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    minWidth: 0,
                  }}
                >
                  <Settings size={16} />
                  {sidebarOpen && (
                    <span style={{ fontSize: "14px", whiteSpace: "nowrap" }}>
                      Cấu hình
                    </span>
                  )}
                </div>
                {sidebarOpen && (
                  <span style={{ color: "#64748b" }}>
                    {configOpen ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </span>
                )}
              </button>

              {/* Submenu cấp con của Cấu hình */}
              {sidebarOpen && configOpen && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    marginTop: "4px",
                    paddingLeft: "16px",
                    borderLeft: "2px solid #e2e8f0",
                    marginLeft: "14px",
                  }}
                >
                  <NavLink
                    to="/assettype"
                    style={({ isActive }) => ({
                      ...(isActive ? activeLinkStyle : null),
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    })}
                  >
                    <Layers size={14} />
                    <span>Loại tài sản</span>
                  </NavLink>

                  <NavLink
                    to="/account"
                    style={({ isActive }) => ({
                      ...(isActive ? activeLinkStyle : null),
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    })}
                  >
                    <Users size={14} />
                    <span>Tài khoản</span>
                  </NavLink>

                  <NavLink
                    to="/user"
                    style={({ isActive }) => ({
                      ...(isActive ? activeLinkStyle : null),
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    })}
                  >
                    <UserCog size={14} />
                    <span>Người dùng</span>
                  </NavLink>

                  <NavLink
                    to="/emailconfig"
                    style={({ isActive }) => ({
                      ...(isActive ? activeLinkStyle : null),
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    })}
                  >
                    <MailCheck size={14} />
                    <span>Cấu hình Email</span>
                  </NavLink>

                  <NavLink
                    to="/emailrecipient"
                    style={({ isActive }) => ({
                      ...(isActive ? activeLinkStyle : null),
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    })}
                  >
                    <Mail size={14} />
                    <span>Người nhận Email</span>
                  </NavLink>

                  <NavLink
                    to="/assettypenotification"
                    style={({ isActive }) => ({
                      ...(isActive ? activeLinkStyle : null),
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    })}
                  >
                    <BellRing size={14} />
                    <span>Cảnh báo Loại TS</span>
                  </NavLink>

                  <NavLink
                    to="/assetnotification"
                    style={({ isActive }) => ({
                      ...(isActive ? activeLinkStyle : null),
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      color: "inherit",
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                    })}
                  >
                    <Bell size={14} />
                    <span>Cảnh báo Tài sản</span>
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Footer info & Logout */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "12px",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#64748b",
              fontSize: "13px",
              padding: "6px 8px",
              borderRadius: "6px",
            }}
            title={!sidebarOpen ? "Về trang chính" : undefined}
          >
            <House size={16} />
            {sidebarOpen && <span>Về trang chính</span>}
          </Link>

          {/* User profile card */}
          {sidebarOpen ? (
            <div
              style={{
                padding: "8px 10px",
                background: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: isAdmin ? "#e0e7ff" : "#d1fae5",
                    color: isAdmin ? "#4338ca" : "#065f46",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {isAdmin ? <Shield size={14} /> : <UserIcon size={14} />}
                </div>
                <div style={{ minWidth: 0, overflow: "hidden" }}>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#1e293b",
                      margin: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user?.LoginName || "Người dùng"}
                  </p>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      padding: "1px 6px",
                      borderRadius: "9999px",
                      background: isAdmin ? "#e0e7ff" : "#ecfdf5",
                      color: isAdmin ? "#4338ca" : "#047857",
                      display: "inline-block",
                    }}
                  >
                    {isAdmin ? "Admin" : "User"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                title="Đăng xuất"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#94a3b8",
                  padding: "4px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 150ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              title={`Đăng xuất (${user?.LoginName})`}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={contentStyle}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;

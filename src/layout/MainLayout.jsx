import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
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
} from "lucide-react";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const isOrgActive =
    location.pathname.startsWith("/company") ||
    location.pathname.startsWith("/project");
  const [orgOpen, setOrgOpen] = useState(true);

  const isConfigActive =
    location.pathname.startsWith("/assettype") ||
    location.pathname.startsWith("/account") ||
    location.pathname.startsWith("/emailconfig") ||
    location.pathname.startsWith("/emailrecipient") ||
    location.pathname.startsWith("/assettypenotification") ||
    location.pathname.startsWith("/assetnotification");
  const [configOpen, setConfigOpen] = useState(true);

  const sidebarStyle = useMemo(
    () => ({
      width: sidebarOpen ? "220px" : "56px",
      borderRight: "1px solid #ddd",
      padding: sidebarOpen ? "16px" : "10px",
      boxSizing: "border-box",
      transition: "width 180ms ease, padding 180ms ease",
      overflow: "hidden",
      flexShrink: 0,
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
          }}
        >
          {/* Menu: Dashboard */}
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

          {/* Menu: Tài sản */}
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
          {/* Menu cha: Công ty & Dự án */}
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



          {/* Menu cha: Cấu hình */}
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
        </nav>

        {/* Footer link */}
        <div style={{ marginTop: "24px", fontSize: "14px" }}>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            title={!sidebarOpen ? "Về trang chính" : undefined}
          >
            {sidebarOpen ? "Về trang chính" : <House size={16} />}
          </Link>
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

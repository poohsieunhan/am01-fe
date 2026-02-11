import { Link, NavLink, Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import { House, ClipboardList, Building2, CardSim } from "lucide-react";

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
          <NavLink
            to="/requestform"
            style={({ isActive }) => ({
              ...(isActive ? activeLinkStyle : null),
              display: "block",
              padding: "8px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              whiteSpace: "nowrap",
            })}
            title={!sidebarOpen ? "Phiếu yêu cầu" : undefined}
          >
            {sidebarOpen ? "Phiếu yêu cầu" : <ClipboardList size={16} />}
          </NavLink>

          <NavLink
            to="/company"
            style={({ isActive }) => ({
              ...(isActive ? activeLinkStyle : null),
              display: "block",
              padding: "8px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              whiteSpace: "nowrap",
            })}
            title={!sidebarOpen ? "Công ty" : undefined}
          >
            {sidebarOpen ? "Công ty" : <Building2 size={16} />}
          </NavLink>

          <NavLink
            to="/device"
            style={({ isActive }) => ({
              ...(isActive ? activeLinkStyle : null),
              display: "block",
              padding: "8px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
              whiteSpace: "nowrap",
            })}
            title={!sidebarOpen ? "Thiết bị" : undefined}
          >
            {sidebarOpen ? "Thiết bị" : <CardSim size={16} />}
          </NavLink>
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

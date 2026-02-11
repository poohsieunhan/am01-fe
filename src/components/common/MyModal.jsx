const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "16px 20px",
  borderRadius: "4px",
  minWidth: "420px",
  maxWidth: "600px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
};

function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;

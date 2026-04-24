import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <span
        style={styles.logo}
        onClick={() => navigate("/dashboard")}
      >
        📋 TaskFlow
      </span>

      <div style={styles.right}>
        {token ? (
          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              style={styles.btn}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              style={styles.btn}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 28px",
    background: "#01696f",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  logo: {
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer"
  },
  right: { display: "flex", gap: "10px" },
  btn: {
    padding: "7px 16px",
    background: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px"
  },
  logoutBtn: {
    padding: "7px 16px",
    background: "#e53e3e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px"
  }
};
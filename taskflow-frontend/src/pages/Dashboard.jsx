import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API}/api/projects`,
        { name: newProject },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewProject("");
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>My Projects</h2>
        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
      </div>

      <form onSubmit={createProject} style={styles.form}>
        <input
          style={styles.input}
          placeholder="New project name"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button style={styles.button} type="submit">Create</button>
      </form>

      <div style={styles.projectList}>
        {projects.length === 0 && <p>No projects yet. Create one above.</p>}
        {projects.map((p) => (
   <div
    key={p._id}
    style={styles.projectCard}
    onClick={() => window.location.href = `/projects/${p._id}`}
  >
    <h3>{p.name}</h3>
    <p style={{ color: "#888", fontSize: "13px" }}>
      Created: {new Date(p.createdAt).toLocaleDateString()}
    </p>
    <p style={{ color: "#01696f", fontSize: "13px", marginTop: "6px" }}>
      Click to open →
    </p>
  </div>
))}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "700px", margin: "40px auto", padding: "30px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  form: { display: "flex", gap: "10px", marginBottom: "24px" },
  input: { flex: 1, padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "15px" },
  button: { padding: "10px 18px", background: "#01696f", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
  logoutBtn: { padding: "8px 16px", background: "#e53e3e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
  projectList: { display: "flex", flexDirection: "column", gap: "12px" },
  projectCard: { background: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)",cursor: "pointer" }
};
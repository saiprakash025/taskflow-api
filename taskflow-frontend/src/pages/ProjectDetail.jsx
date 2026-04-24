import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TaskCard from "../components/TaskCard";

const API = import.meta.env.VITE_API_URL;

export default function ProjectDetail() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium"
  });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/api/tasks?projectId=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!form.title) {
      setMessage("Title is required");
      return;
    }
    try {
      await axios.post(
        `${API}/api/tasks`,
        { ...form, projectId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ title: "", description: "", priority: "medium" });
      setMessage("Task created!");
      fetchTasks();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating task");
    }
  };

  return (
    <div style={styles.container}>

      {/* Back button */}
      <button
        onClick={() => window.location.href = "/dashboard"}
        style={styles.backBtn}
      >
        ← Back to Dashboard
      </button>

      <h2 style={styles.heading}>Project Tasks</h2>

      {/* ── CREATE TASK FORM ── */}
      <div style={styles.formBox}>
        <h3 style={{ marginBottom: "14px" }}>Create New Task</h3>
        <form onSubmit={handleCreateTask} style={styles.form}>

          <input
            style={styles.input}
            name="title"
            placeholder="Task title *"
            value={form.title}
            onChange={handleChange}
          />

          <input
            style={styles.input}
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <button type="submit" style={styles.createBtn}>
            + Add Task
          </button>

        </form>
        {message && (
          <p style={{ marginTop: "10px", color: "#01696f" }}>{message}</p>
        )}
      </div>

      {/* ── TASK LIST ── */}
      <div style={{ marginTop: "24px" }}>
        {tasks.length === 0 ? (
          <p style={{ color: "#888" }}>No tasks yet. Create one above.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={fetchTasks}
              onDelete={fetchTasks}
            />
          ))
        )}
      </div>

    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    padding: "30px"
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#01696f",
    cursor: "pointer",
    fontSize: "15px",
    marginBottom: "16px",
    padding: "0"
  },
  heading: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "24px"
  },
  formBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "15px",
    width: "100%"
  },
  createBtn: {
    padding: "10px",
    background: "#01696f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "600"
  }
};
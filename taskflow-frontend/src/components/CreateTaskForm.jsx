import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function CreateTaskForm({ projectId, onTaskCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium"
  });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) {
      setMessage("Title is required");
      return;
    }
    try {
      await axios.post(
        `${API}/api/tasks`,
        { ...form, projectId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({ title: "", description: "", priority: "medium" });
      setMessage("Task created!");
      onTaskCreated();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating task");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={{ marginBottom: "12px" }}>Add New Task</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
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
          style={styles.input}
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button style={styles.button} type="submit">
          + Add Task
        </button>
      </form>
      {message && <p style={{ marginTop: "8px", color: "#01696f" }}>{message}</p>}
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "24px",
    border: "1px solid #eee"
  },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px"
  },
  button: {
    padding: "10px",
    background: "#01696f",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    cursor: "pointer"
  }
};
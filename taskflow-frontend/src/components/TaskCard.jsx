import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function TaskCard({ task, onUpdate, onDelete }) {

  const statusColors = {
    "todo": "#e2e8f0",
    "in-progress": "#fef3c7",
    "done": "#d1fae5"
  };

  const priorityColors = {
    "low": "#6c757d",
    "medium": "#ed8936",
    "high": "#e53e3e"
  };

  const token = localStorage.getItem("token");

  const handleStatusChange = async (e) => {
    try {
      await axios.put(
        `${API}/api/tasks/${task._id}`,
        { status: e.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onDelete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.card}>

      {/* Top row — title + priority badge */}
      <div style={styles.topRow}>
        <h3 style={styles.title}>{task.title}</h3>
        <span style={{
          ...styles.badge,
          background: priorityColors[task.priority],
          color: "#fff"
        }}>
          {task.priority}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p style={styles.description}>{task.description}</p>
      )}

      {/* Bottom row — status badge + dropdown + delete */}
      <div style={styles.bottomRow}>

        {/* Status colored badge */}
        <span style={{
          ...styles.badge,
          background: statusColors[task.status],
          color: "#333"
        }}>
          {task.status}
        </span>

        {/* Status dropdown to change it */}
        <select
          value={task.status}
          onChange={handleStatusChange}
          style={styles.select}
        >
          <option value="todo">todo</option>
          <option value="in-progress">in-progress</option>
          <option value="done">done</option>
        </select>

        {/* Delete button */}
        <button onClick={handleDelete} style={styles.deleteBtn}>
          Delete
        </button>

      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "12px"
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },
  bottomRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "12px"
  },
  title: {
    fontSize: "16px",
    fontWeight: "600"
  },
  description: {
    color: "#666",
    fontSize: "14px",
    marginBottom: "6px"
  },
  badge: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "600"
  },
  select: {
    padding: "4px 8px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "13px",
    cursor: "pointer"
  },
  deleteBtn: {
    padding: "4px 12px",
    background: "#e53e3e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    marginLeft: "auto"
  }
};
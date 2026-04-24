import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/register`, form);
      setMessage("Registered! Go to login.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          style={styles.input}
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button style={styles.button} type="submit">Register</button>
      </form>
      <p>{message}</p>
      <p>Already have account? <a href="/login">Login</a></p>
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "80px auto", padding: "30px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "15px" },
  button: { padding: "10px", background: "#01696f", color: "#fff", border: "none", borderRadius: "6px", fontSize: "15px", cursor: "pointer" }
};
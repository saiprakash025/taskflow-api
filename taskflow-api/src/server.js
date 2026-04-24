const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const morgan = require("morgan");

const errorHandler = require("./middleware/errorMiddleware");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const apiKeyRoutes = require("./routes/apiKeyRoutes");


dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://taskflow-api-six.vercel.app/"
  ]
}));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("TaskFlow API running");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You are logged in",
    user: req.user
  });
});

const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/keys", apiKeyRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
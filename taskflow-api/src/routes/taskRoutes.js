const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createTask, updateTask, deleteTask, getTasksByProject } = require("../controllers/taskController");

const router = express.Router();

router.get("/", protect, getTasksByProject);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
const express = require("express");
const protect = require("../middleware/authMiddleware");
const { generateApiKey } = require("../controllers/apiKeyController");

const router = express.Router();

router.post("/generate", protect, generateApiKey);

module.exports = router;
const crypto = require("crypto");
const ApiKey = require("../models/ApiKey");

const generateApiKey = async (req, res) => {
  try {
    const key = crypto.randomBytes(32).toString("hex");

    const apiKey = await ApiKey.create({
      key,
      userId: req.user._id
    });

    res.json(apiKey);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateApiKey };
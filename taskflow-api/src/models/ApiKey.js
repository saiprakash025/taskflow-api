const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema(
  {
    key: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApiKey", apiKeySchema);
const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  name: String,
  email: String,
  linkedin: String,
  github: String,
});

module.exports = mongoose.model("badge", badgeSchema);

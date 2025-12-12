const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  details: String,
  date: String,
});

module.exports = mongoose.model("Workshop", workshopSchema);

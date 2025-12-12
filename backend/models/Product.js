const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  artisanId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  price: Number,
  image: String, // saved filename
});

module.exports = mongoose.model("Product", productSchema);

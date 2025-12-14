const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Example API route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working!" });
  
});
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend 👋" })
})


module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const workshopRoutes = require("./routes/workshop");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve images

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Kala Backend Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/workshop", workshopRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

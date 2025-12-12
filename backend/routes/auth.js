const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed, role });
    await user.save();

    res.send({ msg: "User Created Successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ msg: "User not found" });

  const correct = await bcrypt.compare(password, user.password);
  if (!correct) return res.status(400).send({ msg: "Incorrect Password" });

  const token = jwt.sign({ id: user._id, role: user.role }, "secret123");

  res.send({ msg: "Login successful", token, role: user.role });
});

module.exports = router;

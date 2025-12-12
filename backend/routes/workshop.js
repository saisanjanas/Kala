const express = require("express");
const Workshop = require("../models/Workshop");

const router = express.Router();

router.post("/create", async (req, res) => {
  const workshop = new Workshop(req.body);
  await workshop.save();
  res.send({ msg: "Workshop created", workshop });
});

router.get("/all", async (req, res) => {
  const workshops = await Workshop.find();
  res.send(workshops);
});

module.exports = router;

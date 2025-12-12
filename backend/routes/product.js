const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      artisanId: req.body.artisanId,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.file.filename
    });

    await product.save();
    res.send({ msg: "Product added", product });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/all", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

module.exports = router;

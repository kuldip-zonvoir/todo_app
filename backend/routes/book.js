const express = require("express");
const router = express.Router();
const verify = require("../utils/verify");
const { imageUpload } = require("../utils/imageUpload");
const { addBook } = require("../controller/book");

router.post("/addBook", verify, addBook);
router.post(
  "/uploadImage",
  imageUpload.single("image"),
  (req, res) => {
    console.log("Uploading image", req.body);
    res.status(200).json({
      message: "Image uploaded successfully",
    });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const verify = require("../utils/verify");

const { allAuthors, createAuthor } = require("../controller/author");

router.get("/all_author", allAuthors);
router.post("/add_author", verify, createAuthor);

module.exports = router;

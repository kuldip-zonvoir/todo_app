const mongoose = require("mongoose");
const Author = require("../models/author");
const query = new mongoose.Query();

exports.allAuthors = (req, res) => {
  Author.find()
    .populate("book_collection", "_id title")
    .exec((err, authors) => {
      if (err) {
        return res.json({ error: err });
      }
      res.status(200).json(authors);
    });
};

exports.createAuthor = (req, res) => {
  const author = new Author(req.body);
  author.save((err, result) => {
    if (err) {
      return res.json({ error: err });
    }

    res.json({ result: result });
  });
};

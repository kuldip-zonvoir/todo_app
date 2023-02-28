const mongoose = require("mongoose");
const Book = require("../models/Book");

exports.addBook = (req, res) => {
  const { title, publication, author } = req.body;
  Book.findOne({ title }) //Checking if the email exist
    .then((book) => {
      if (book)
        res
          .status(409)
          .json({ error: "This book is already exist in the system" });
      else {
        const bookData = new Book({
          _id: mongoose.Types.ObjectId(),
          title: title,
          publication: publication,
          author: author,
        });
        bookData
          .save()
          .then(() => {
            res.status(201).json({
              message: "The Book has been added successfully!",
              bookData,
            });
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

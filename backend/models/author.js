const mongoose = require("mongoose");
//  const Book = require('../models/book');

const { ObjectId } = mongoose.Schema;
const { Schema } = mongoose;

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    book_collection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        // type: ObjectId, ref: 'Book'
      },
    ],
    age: {
      type: Number,
    },
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model("author", authorSchema);

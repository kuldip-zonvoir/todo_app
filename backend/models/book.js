const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    publication: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.models.book || mongoose.model("book", bookSchema);

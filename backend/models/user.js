const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      match:
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },
    hobbies: {
      type: [String],
      value: [String],
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

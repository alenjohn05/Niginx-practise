const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a Tilte"],
      unique: true,
    },
    desc: {
      type: String,
      required: [true, "Please provide the Describtion"],
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);


const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    fullname: {
      type: String,
      require: true,
      min: 3,
      max: 50,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      max: 255,
      min: 5,
    },
    profilePicture: {
      type: String,
      default: "https://i.imgur.com/sNQZ9.jpg",
    },
    bio: {
      type: String,
      default: "",
      max: 255,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

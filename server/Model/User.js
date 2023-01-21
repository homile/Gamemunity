const mongoose = require("mongoose");

const iserSchema = new mongoose.Schema(
  {
    userNum: Number,
    email: String,
    diplayName: String,
    uid: String,
  },
  { collection: "users" }
);

const User = mongoose.model("User", iserSchema);

module.exports = { User };

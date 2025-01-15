const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const myError = require("../utils/myError");
const ClassSchema = new mongoose.Schema({
   className: {
      type: String,
      required: true,
      unique: true,
   },
   department: {
      type: ObjectId,
      ref: "Department",
   },
});

module.exports = mongoose.model("Class", ClassSchema);

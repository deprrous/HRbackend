const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const myError = require("../utils/myError");
const DepartmentSchema = new mongoose.Schema({
   departmentName: {
      type: String,
      required: true,
      unique: true,
   },
});

module.exports = mongoose.model("Department", DepartmentSchema);

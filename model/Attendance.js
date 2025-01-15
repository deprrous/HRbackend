const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const myError = require("../utils/myError");
const AttendanceSchema = new mongoose.Schema(
   {
      date: Date,
      isAttended: {
         type: Boolean,
         required: true,
      },
      reason: {
         type: String,
         default: "null",
      },
      user: {
         type: ObjectId,
         ref: "User",
      },
   },
   { timestamps: true },
);

module.exports = mongoose.model("Attendance", AttendanceSchema);

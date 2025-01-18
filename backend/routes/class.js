const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
   createClass,
   updateClass,
   getClass,
   getClasses,
   deleteClass,
} = require("../controller/class");
const router = express.Router();

// api/v1/classes
router
   .route("/")
   .get(protect, authorize(true, false), getClasses)
   .post(protect, authorize(true), createClass);

// api/v1/classes/:id
router
   .route("/:id")
   .get(protect, authorize(true, false), getClass)
   .put(protect, authorize(true), updateClass)
   .delete(protect, authorize(true), deleteClass);

module.exports = router;

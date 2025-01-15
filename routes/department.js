const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
   createDepartment,
   updateDepartment,
   getDepartment,
   getDepartments,
   deleteDepartment,
} = require("../controller/department");
const router = express.Router();

// api/v1/departments
router
   .route("/")
   .get(protect, authorize(true, false), getDepartments)
   .post(protect, authorize(true), createDepartment);

// api/v1/departments/:id
router
   .route("/:id")
   .get(protect, authorize(true, false), getDepartment)
   .put(protect, authorize(true, false), updateDepartment)
   .delete(protect, authorize(true, false), deleteDepartment);

module.exports = router;

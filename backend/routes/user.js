const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const {
   createUser,
   getUsers,
   getUser,
   updateUser,
   deleteUser,
   register,
   login,
   changePassword,
   getUsersByClass,
   getUsersByDepartment,
} = require("../controller/user");
const router = express.Router();

// api/v1/users
router
   .route("/")
   .get(protect, authorize(true, false), getUsers)
   .post(protect, authorize(true), createUser);
// api/v1/users/register
router.route("/register").post(register);

// api/v1/users/login
router.route("/login").post(login);
router
   .route("/getUsersByClass")
   .get(protect, authorize(true, false), getUsersByClass);
router
   .route("/getUsersByDepartment")
   .get(protect, authorize(true, false), getUsersByDepartment);

// api/v1/users/changePassword
router.route("/changePassword").put(protect, changePassword);

// api/v1/users/:id
router
   .route("/:id")
   .get(protect, authorize(true, false), getUser)
   .put(protect, authorize(true, false), updateUser)
   .delete(protect, authorize(true, false), deleteUser);

module.exports = router;

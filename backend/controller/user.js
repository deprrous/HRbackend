const User = require("../model/User");
const myError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const crypto = require("crypto");

exports.createUser = asyncHandler(async (req, res, next) => {
   const user = await User.create(req.body);
   if (!user) throw new myError("something is wrong", 403);
   res.status(200).json({
      succes: true,
      user,
   });
});
// not yet
exports.getUsers = asyncHandler(async (req, res, next) => {
   const sort = req.query.sort;
   const select = req.query.select;
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 50;
   ["sort", "select", "page", "limit"].forEach((el) => delete req.query[el]);

   const pagination = await paginate(User, page, limit);

   const users = await User.find(req.query, select)
      .sort(sort)
      .skip(pagination.start - 1)
      .limit(pagination.limit);
   if (users.length === 0) {
      throw new myError("Хэрэглэгч бүртгэгдээгүй байна.", 404);
   }
   res.status(200).json({
      succes: true,
      data: users,
      pagination,
   });
});
exports.getUser = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.params.id);
   if (!user) throw new myError(`User not found id with ${req.params.id}`);
   res.status(200).json({
      succes: true,
      user,
   });
});
exports.updateUser = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.params.id);
   if (!user) {
      throw new myError(`User not found id with ${req.params.id}`, 400);
   }
   if (req.params.id !== req.userId && req.admin !== true) {
      throw new myError(`Уучлаарай та хэрэглэгчийг өөрчлөх эрхгүй байна.`, 400);
   }

   Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
   });
   await user.save();
   res.status(200).json({
      succes: true,
      user,
   });
});
exports.deleteUser = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.params.id);
   if (!user) {
      throw new myError(`User not found id with ${req.params.id}`, 400);
   }
   if (req.params.id !== req.userId && req.admin !== true) {
      throw new myError(`Уучлаарай та хэрэглэгчийг устгах эрхгүй байна.`, 400);
   }
   await user.deleteOne();

   await user.deleteOne();
   res.status(200).json({
      succes: true,
      user,
   });
});
exports.register = asyncHandler(async (req, res, next) => {
   const user = await User.create(req.body);
   if (!user) {
      throw new myError("something is wrong", 403);
   }
   const token = user.getJWT();
   res.status(200).json({
      succes: true,
      user,
      token,
   });
});
exports.login = asyncHandler(async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password)
      throw new myError("Нууц үг эсвэл И-мэйл талбар хоосон байна", 400);
   const user = await User.findOne({ email: email }).select("+password");
   if (!user) throw new myError(`User not found email with ${email}`);
   const match = user.checkPass(password);
   console.log(user);
   if (!match) {
      throw new myError("Нууц үг эсвэл И-мэйл талбар буруу байна", 400);
   }

   res.status(200).json({
      succes: true,
      user,
      token: user.getJWT(),
   });
});
exports.forgotPassword = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      succes: true,
      user,
   });
});
exports.resetPassword = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      succes: true,
      user,
   });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
   const { currentPassword, newPassword } = req.body;
   if (!currentPassword || !newPassword)
      throw new myError("Хоосон талбар илгээгээд байна аа хө", 402);

   const user = await User.findOne({ _id: req.userId }).select("+password");
   console.log(user);
   const match = await user.checkPass(currentPassword);
   if (!match) {
      throw new myError("Password is not valid!", 402);
   }
   user.password = newPassword;
   user.save();
   res.status(200).json({
      succes: true,
      user: user,
   });
});

exports.getUsersByClass = asyncHandler(async (req, res, next) => {
   const users = await User.find().populate("class", "className");

   if (!users || users.length === 0) {
      throw new myError("Хэрэглэгч бүртгэгдээгүй байна.", 404);
   }

   const data = {};

   for (const user of users) {
      const className = user.class?.className || "No Class";
      if (!data[className]) {
         data[className] = [];
      }
      data[className].push({
         username: user.username,
         role: user.role,
         kurs: user.kurs,
      });
   }

   res.status(200).json({
      success: true,
      data: data,
   });
});
exports.getUsersByDepartment = asyncHandler(async (req, res, next) => {
   const users = await User.find().populate({
      path: "class",
      populate: {
         path: "department",
         select: "departmentName",
      },
   });

   if (!users || users.length === 0) {
      throw new myError("Хэрэглэгч бүртгэгдээгүй байна.", 404);
   }

   const data = {};

   for (const user of users) {
      const departmentName =
         user.class?.department?.departmentName || "No Department";
      if (!data[departmentName]) {
         data[departmentName] = [];
      }
      data[departmentName].push({
         username: user.username,
         role: user.role,
         kurs: user.kurs,
      });
   }

   res.status(200).json({
      success: true,
      data: data,
   });
});

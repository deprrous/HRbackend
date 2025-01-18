const Department = require("../model/Department");
const myError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.createDepartment = asyncHandler(async (req, res, nex) => {
   // if (!req.admin) {
   //    throw new myError(`Уучлаарай та department үүсгэх эрхгүй байна.`, 400);
   // }
   const department = await Department.create(req.body);
   if (!department) {
      throw new myError("Something wrong to create Department", 401);
   }
   res.status(200).json({
      succes: true,
      data: department,
   });
});
exports.updateDepartment = asyncHandler(async (req, res, nex) => {
   const department = await Department.findById(req.params.id);
   if (!department) {
      throw new myError(`Department not found id with ${req.params.id}`, 400);
   }
   // if (!req.admin) {
   //    throw new myError(`Уучлаарай та department өөрчлөх эрхгүй байна.`, 400);
   // }

   Object.keys(req.body).forEach((key) => {
      department[key] = req.body[key];
   });
   await department.save();
   res.status(200).json({
      succes: true,
      department,
   });
});
exports.deleteDepartment = asyncHandler(async (req, res, nex) => {
   const department = await Department.findById(req.params.id);
   if (!department) {
      throw new myError(`Department not found id with ${req.params.id}`, 400);
   }
   // if (!req.admin) {
   //    throw new myError(
   //       `Уучлаарай та department-ийг устгах эрхгүй байна.`,
   //       400,
   //    );
   // }
   await department.deleteOne();

   res.status(200).json({
      succes: true,
      department,
   });
});
exports.getDepartments = asyncHandler(async (req, res, nex) => {
   const departments = await Department.find();

   if (departments.length === 0) {
      throw new myError("Department бүртгэгдээгүй байна.", 404);
   }
   res.status(200).json({
      succes: true,
      data: departments,
   });
});

exports.getDepartment = asyncHandler(async (req, res, nex) => {
   const department = await Department.findById(req.params.id);
   if (!department)
      throw new myError(`Department not found id with ${req.params.id}`);
   res.status(200).json({
      succes: true,
      department,
   });
});

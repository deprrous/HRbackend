const Class = require("../model/Class");
const myError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

exports.createClass = asyncHandler(async (req, res, nex) => {
   if (!req.admin) {
      throw new myError(`Уучлаарай та class үүсгэх эрхгүй байна.`, 400);
   }
   const angi = await Class.create(req.body);
   if (!angi) {
      throw new myError("Something wrong to create class", 401);
   }
   req.status(200).json({
      succes: true,
      data: angi,
   });
});
exports.updateClass = asyncHandler(async (req, res, nex) => {
   const angi = await Class.findById(req.params.id);
   if (!angi) {
      throw new myError(`Class not found id with ${req.params.id}`, 400);
   }
   if (!req.admin) {
      throw new myError(`Уучлаарай та хэрэглэгчийг өөрчлөх эрхгүй байна.`, 400);
   }

   Object.keys(req.body).forEach((key) => {
      angi[key] = req.body[key];
   });
   await angi.save();
   res.status(200).json({
      succes: true,
      angi,
   });
});
exports.deleteClass = asyncHandler(async (req, res, nex) => {
   const angi = await Class.findById(req.params.id);
   if (!angi) {
      throw new myError(`Class not found id with ${req.params.id}`, 400);
   }
   if (req.admin !== true) {
      throw new myError(`Уучлаарай та class-ийг устгах эрхгүй байна.`, 400);
   }
   await angi.deleteOne();

   res.status(200).json({
      succes: true,
      angi,
   });
});

exports.getClasses = asyncHandler(async (req, res, nex) => {
   const classes = await Class.find();

   if (classes.length === 0) {
      throw new myError("Class бүртгэгдээгүй байна.", 404);
   }
   res.status(200).json({
      succes: true,
      data: classes,
   });
});
exports.getClass = asyncHandler(async (req, res, nex) => {
   const angi = await Class.findById(req.params.id);
   if (!angi) throw new myError(`Class not found id with ${req.params.id}`);
   res.status(200).json({
      succes: true,
      angi,
   });
});

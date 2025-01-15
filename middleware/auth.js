const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const myError = require("../utils/myError");
const User = require("../model/User");
exports.protect = asyncHandler(async (req, res, next) => {
   if (!req.headers.authorization)
      throw new myError("Эрх зөвшөөрөгдөөгүй", 401);

   const token = req.headers.authorization.split(" ")[1];
   if (!token) throw new myError("Эрх зөвшөөрөгдөөгүй", 401);
   const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
   req.userId = tokenObj.id;
   req.admin = tokenObj.admin;
   next();
});

exports.authorize = function (...roles) {
   return (req, res, next) => {
      if (!roles.includes(req.admin))
         throw new myError(
            "Таны эрх [" + "member" + "] энэ үйлдлийг хийх боломжгүй.",
            403,
         );

      next();
   };
};

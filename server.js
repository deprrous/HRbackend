const express = require("express");
const mongoose = require("mongoose");
const myError = require("./utils/myError");
const usersRoutes = require("./routes/user");
const errorHandler = require("./middleware/error");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

mongoose
   .connect(process.env.MONGODB)
   .then(() => console.log("Амжилтай өгөгдлийн санд холбогдлоо."))
   .catch((error) =>
      console.error("Өгөгдлийн сантай холбогдоход алдаа гарлаа: ", error),
   );

const app = express();
app.use(express.json());
const limiter = rateLimit({
   windowMs: 15 * 60 * 1000,
   max: 150,
   message: "Арай л их юм хүсээд байна ээ. Одоо болнэээээ",
   standardHeaders: true,
   legacyHeaders: false,
});
app.use(limiter);

app.use("/api/v1/users", usersRoutes);

app.use(errorHandler);

const server = app.listen(
   process.env.PORT,
   console.log("Express server " + process.env.PORT + " port deer aslaa.."),
);

process.on(`unhandledRejection`, (err, promise) => {
   console.log(`Error : ${err.message}`);
   server.close(() => {
      process.exit(1);
   });
});

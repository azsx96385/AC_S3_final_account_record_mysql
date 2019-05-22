const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = require("../user");
const recordModel = require("../record");

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/records", {
  useCreateIndex: true,
  useNewUrlParser: true
});
const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});
db.once("open", () => {
  console.log("mongodb connected");

  bcrypt.genSalt(10, (err, salt) => {
    console.log(err);
    bcrypt.hash("123456789", salt, (err, hash) => {
      console.log(err);
      userModel.create({
        name: "野原廣志",
        email: "water@gmail.com",
        password: hash
      });
    });
  });

  console.log("done");
});

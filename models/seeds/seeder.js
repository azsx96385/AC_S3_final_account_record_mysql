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
  //1.user model 建立使用者-廣志
  //密碼加密
  //   bcrypt.genSalt(10, (err, salt) => {
  //     console.log(err);
  //     bcrypt.hash("123456789", salt, (err, hash) => {
  //       console.log(err);
  //       userModel.create({
  //         name: "野原廣志",
  //         email: "water@gmail.com",
  //         password: hash
  //       });
  //     });
  //   });

  //2.新建廣智的假資料
  userModel.findOne({ email: "water@gmail.com" }).then(user => {
    let userId = user._id;

    recordModel.create(
      {
        userId: userId,
        name: "午餐",
        category: "fa-utensils",
        date: "2019/05/01",
        amount: 60
      },
      {
        userId: userId,
        name: "衛生紙",
        category: "fa-home",
        date: "2019/04/20",
        amount: 100
      },
      {
        userId: userId,
        name: "加油",
        category: "fa-shuttle-van",
        date: "2019/04/25",
        amount: 200
      },
      {
        userId: userId,
        name: "電影:復仇者4",
        category: "fa-grin-beam",
        date: "2019/04/28",
        amount: 460
      },
      {
        userId: userId,
        name: "信用卡費",
        category: "fa-pen",
        date: "2019/04/20",
        amount: 6000
      }
    );
  });

  console.log("done");
});

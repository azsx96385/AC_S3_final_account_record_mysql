const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
//路由區

//1.註冊
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password, password_confirm } = req.body;
  //檢查密碼驗證是否正確
  let errorMessage = []; //存放錯誤訊息
  if (!name || !email || !password || !password_confirm) {
    console.log("系統訊息 | 每個欄位都要填寫");
    errorMessage.push({ message: "系統訊息 | 每個欄位都要填寫" });
  }
  if (password !== password_confirm) {
    console.log("系統訊息 | 密碼輸入不一致");
    errorMessage.push({ message: "系統訊息 | 密碼輸入不一致" });
  }
  if (errorMessage.length > 0) {
    req.flash("errorMessage", errorMessage);
    res.redirect("/users/register");
  } else {
    if (password == password_confirm) {
      //驗證是否已經註冊
      userModel.findOne({ email: email }).then(data => {
        if (data) {
          console.log("已經註冊，請直接登入");
          res.redirect("/users/login");
        } else {
          //驗證通過，執行新增使用者

          //密碼加密
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, password) => {
              let newUser = new userModel({
                name,
                email,
                password
              });

              newUser
                .save()
                .then(user => {
                  res.redirect("/");
                })
                .catch(err => {
                  console.log(err);
                });
            });
          });
        }
      });
    }
  }
});

//2.登入
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

//3.登出
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("successMessage", "你已經成功登出!!");
  res.redirect("/users/login");
});
//匯出路由
module.exports = router;

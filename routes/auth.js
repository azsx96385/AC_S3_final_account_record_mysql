//使用 express router
const express = require("express");
const router = express.Router();
const passport = require("passport");

//路由區

//1.導向授權頁面
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

//2.callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/users/login"
  })
);

//匯出路由
module.exports = router;

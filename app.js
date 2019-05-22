//1.引入 package
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");
const bdParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");

//2.設定 package
if (process.env.NODE_ENV !== "production") {
  // 如果不是 production 模式
  require("dotenv").config(); // 使用 dotenv 讀取 .env 檔案
}

//express
const app = express();
app.listen(process.env.PORT || 3000, () => {
  console.log("server connsected ");
});

//express-session
app.use(
  session({
    secret: "okokokok",
    resave: "false",
    saveUninitialized: "false",
    name: "userid",
    cookie: { maxAge: 1800000000 }
  })
);

//express-handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/records", {
  useNewUrlParser: true,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error");
});
db.once("open", () => {
  console.log(" mongodb connected ");
});

//passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

//body-parser
app.use(bdParser.urlencoded({ extended: true }));

//method-overrride
app.use(methodOverride("_method"));

//connect-flash
app.use(flash());

//自設中介曾
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.passportErrorMessage = req.flash("error");
  res.locals.recordErrorMessage = req.flash("recordErrorMessage");
  res.locals.errorMessage = req.flash("errorMessage");
  res.locals.successMessage = req.flash("successMessage");
  // console.log("res.locals.user", req.flash("error"));
  next();
});

//3.route
//record 路由
app.use(express.static("public"));
app.use("/", require("./routes/home"));
app.use("/users", require("./routes/user"));
app.use("/records", require("./routes/records"));
app.use("/auth", require("./routes/auth"));

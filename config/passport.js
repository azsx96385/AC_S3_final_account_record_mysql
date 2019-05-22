const localStrategy = require("passport-local");
const fbStrategy = require("passport-facebook");
const bcrtpt = require("bcryptjs");

const userModel = require("../models/user");

//後續是要帶入passport座使用，因此使用fun 匯出
module.exports = passport => {
  //local Strategy
  passport.use(
    //建立策略物件
    //1.local
    new localStrategy({ usernameField: "email" }, (email, password, done) => {
      //驗證表單資料漏填

      if (!email || !password) {
        console.log("系統訊息 | 資料漏填了");
        return done(null, false, { message: "系統訊息 | 資料漏填了" });
      } else {
        //檢視是否有該使用者
        userModel.findOne({ email: email }).then(user => {
          console.log("user");
          if (!user) {
            console.log("系統訊息 | 該用戶尚未註冊");
            return done(null, false, { message: "系統訊息 | 該用戶尚未註冊" });
          } else {
            //比對輸入密碼
            bcrtpt.compare(password, user.password, (err, isMatch) => {
              if (err) {
                console.log(err);
              }
              if (!isMatch) {
                console.log("系統訊息 | 密碼錯誤");
                return done(null, false, { message: "系統訊息 |密碼錯誤" });
              } else {
                console.log("系統訊息 | 登入");
                return done(null, user);
              }
            });
          }
        });
      }
    })
  );

  //facebook Strategy
  passport.use(
    new fbStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ["email", "displayName"]
      },
      (accessToken, refreshToken, profile, done) => {
        //驗證資料庫有無使用者資料-有-登入/沒有-新建登入
        userModel.findOne({ email: profile._json.email }).then(user => {
          console.log();
          if (user) {
            return done(null, user);
          } else if (!user) {
            //產生隨機密碼
            let randomPassword = Math.random()
              .toString(36)
              .slice(-8);
            //雜湊處理
            bcrtpt.genSalt(10, (err, salt) => {
              bcrtpt.hash(randomPassword, salt, (err, hash) => {
                let name = profile._json.name;
                let email = profile._json.email;
                let password = hash;
                let userdata = new userModel({ name, email, password });

                userdata
                  .save()
                  .then(user => {
                    return done(null, user);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            });
          }
        });
      }
    )
  );

  //2.log session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

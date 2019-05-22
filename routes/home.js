const express = require("express");
const router = express.Router();
const recordModel = require("../models/record");
const { authenticated } = require("../config/auth");

//路由區

//1.檢視
router.get("/", authenticated, (req, res) => {
  recordModel.find({ userId: req.user._id }).exec((err, data) => {
    if (err) {
      console.log(err);
    }
    //total result 計算
    let totalAmount = 0;
    data.forEach(item => {
      totalAmount += item.amount;
    });

    res.render("index", { userRecords: data, totalAmount });
  });
});

//匯出路由
module.exports = router;

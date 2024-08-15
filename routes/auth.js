const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const AccountModel = require("../models/account");

router.post("/register", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  console.log(username, password);
  AccountModel.findOne({
    username: username,
  })
    .then((data) => {
      if (data) {
        res.json("Tài khoản này đã tồn tại");
      } else {
        return AccountModel.create({
          username: username,
          password: password,
        });
      }
    })
    .then((data) => {
      if (data) {
        res.json("Tạo tài khoản thành công");
      }
    })
    .catch((err) => {
      res.status(500).json("Tạo tài khoản thất bại");
    });
});

router.post("/login", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const data = await AccountModel.findOne({
      username: username,
      password: password,
    });

    if (data) {
      const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET);

      res.cookie("token", token, { httpOnly: true });

      return res.json({
        message: "dang nhap thanh cong ",
      });
    } else {
      res.status(300).json("tai khoan khong đúng");
    }
  } catch (err) {
    res.status(500).json("Có lỗi bên server");
  }
});

module.exports = router;

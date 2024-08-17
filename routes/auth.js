const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const AccountModel = require("../models/account");

/**
 * @route POST /register
 * @summary Register a new user
 * @body {RegisterInput} 200 - Registration input
 * @returns 200 - Registration successful
 * @returns 500 - Registration failed
 */

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

/**
 * @route POST /auth/login
 * @summary User login
 * @body {LoginInput} 200 - Login input
 * @returns {string} 200 - Login successful - application/json
 * @returns 300 - Invalid credentials
 * @returns 500 - Server error
 */

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
        token: token,
      });
    } else {
      res.status(300).json("tai khoan khong đúng");
    }
  } catch (err) {
    res.status(500).json("Có lỗi bên server");
  }
});

module.exports = router;

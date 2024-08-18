const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const AccountModel = require("../models/account");

/**
 * @route POST /auth/register
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
        res.status(409).json("Tài khoản này đã tồn tại");
      } else {
        return AccountModel.create({
          username: username,
          password: password,
        });
      }
    })
    .then((data) => {
      if (data) {
        res.status(201).json("Tạo tài khoản thành công");
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

      return res.status(200).json({
        message: "dang nhap thanh cong ",
        token: token,
      });
    } else {
      res.status(401).json({ message: "Thông tin đăng nhập không hợp lệ" });
    }
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;

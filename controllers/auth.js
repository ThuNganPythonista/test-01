const AccountModel = require("../models/account.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

class AuthController {
  // [POST] /auth/register
  register(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

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
  }

  // [POST] /auth/login
  async login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const data = await AccountModel.findOne({ username, password });

      if (data) {
        const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
          expiresIn: "15m",
        });
        const refreshToken = crypto.randomBytes(64).toString("hex");

        await AccountModel.updateOne({ _id: data._id }, { refreshToken });

        res.cookie("token", token, { httpOnly: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        req.session.userId = data._id;

        return res.status(200).json({
          message: "Đăng nhập thành công",
          token,
          refreshToken,
        });
      } else {
        res.status(401).json({ message: "Thông tin đăng nhập không hợp lệ" });
      }
    } catch (err) {
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  // [POST] /auth/refresh-token
  async refreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
      const user = await AccountModel.findOne({ refreshToken });

      if (!user) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Generate a new access token
      const newAccessToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.cookie("token", newAccessToken, { httpOnly: true });
      return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}

const authController = new AuthController();
module.exports = authController;

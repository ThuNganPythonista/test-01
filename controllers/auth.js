const AccountModel = require("../models/account.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

class AuthController {
  // [POST] /auth/register
  async register(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
      console.log(username, password);
      const existingUser = await AccountModel.findOne({ username });

      if (existingUser) {
        return res.status(409).json("Tài khoản này đã tồn tại");
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user with hashed password
      const newUser = await AccountModel.create({
        username,
        password: hashedPassword,
      });

      return res.status(201).json("Tạo tài khoản thành công");
    } catch (err) {
      console.error(err);
      return res.status(500).json("Tạo tài khoản thất bại");
    }
  }

  // [POST] /auth/login
  async login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const user = await AccountModel.findOne({ username });

      if (user) {
        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "15m",
          });
          const refreshToken = crypto.randomBytes(64).toString("hex");

          await AccountModel.updateOne({ _id: user._id }, { refreshToken });

          res.cookie("token", token, { httpOnly: true });
          res.cookie("refreshToken", refreshToken, { httpOnly: true });
          req.session.userId = user._id;

          return res.status(200).json({
            message: "Đăng nhập thành công",
            token,
            refreshToken,
          });
        } else {
          return res
            .status(401)
            .json({ message: "Thông tin đăng nhập không hợp lệ" });
        }
      } else {
        return res
          .status(401)
          .json({ message: "Thông tin đăng nhập không hợp lệ" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  // [POST] /auth/refresh-token
  async refreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Không có refresh token" });
    }

    try {
      const user = await AccountModel.findOne({ refreshToken });

      if (!user) {
        return res.status(403).json({ message: "Refresh token không hợp lệ" });
      }

      // Tạo access token mới
      const newAccessToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.cookie("token", newAccessToken, { httpOnly: true });
      return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Lỗi server" });
    }
  }
}

const authController = new AuthController();
module.exports = authController;

const AccountModel = require("../models/account.js");
const jwt = require("jsonwebtoken");

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
  }
}

const authController = new AuthController();
module.exports = authController;

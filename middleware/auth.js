const jwt = require("jsonwebtoken");
const AccountModel = require("../models/account");

const checkLogin = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json("Token not provided");
  }

  try {
    const idUser = jwt.verify(token, process.env.JWT_SECRET);
    const data = await AccountModel.findOne({ _id: idUser });
    if (data) {
      req.data = data;
      next();
    } else {
      return res.status(401).json("Invalid token");
    }
  } catch (err) {
    return res.status(401).json("Invalid token");
  }
};
module.exports = { checkLogin };

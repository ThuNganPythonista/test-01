const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const sessionConfig = {
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  secret: "iamsosweet",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Đặt true nếu sử dụng HTTPS
    maxAge: 1000 * 60 * 60 * 24, // 1 ngày
  },
};

module.exports = {
  sessionConfig,
  session,
};

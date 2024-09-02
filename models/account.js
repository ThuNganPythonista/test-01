const mongoose = require("mongoose");

require("dotenv").config(); // Load .env file

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccountSchema = new Schema(
  {
    username: String,
    password: String,
    refreshToken: { type: String },
  },
  {
    collection: "account",
  }
);

const AccountModel = mongoose.model("account", AccountSchema);
module.exports = AccountModel;

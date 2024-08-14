const mongoose = require("mongoose");
require("dotenv").config(); // Load .env file

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected!"));

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AccountSchema = new Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "account",
  }
);

const AccountModel = mongoose.model("account", AccountSchema);
module.exports = AccountModel;

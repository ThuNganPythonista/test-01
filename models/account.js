const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Todo-app:dYWCPYvBPZchZFkt@todo-list.dgbed.mongodb.net/ThuNganPham?retryWrites=true&w=majority&appName=Todo-list"
  )
  .then(() => console.log("Connected!"));
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

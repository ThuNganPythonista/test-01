const express = require("express");
const app = express();
const PORT = 3000;
const AccountModel = require("./models/account.js");
// const clientSide = require("client-side.js");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json());

// Dưx liệu giả lập để test api postman
let todos = [
  { id: 1, task: "Buy groceries", createdAt: new Date().toISOString() },
  { id: 2, task: "Clean the house", createdAt: new Date().toISOString() },
];

var checkLogin = (req, res, next) => {
  var token = req.cookies.token;

  // Check if the token exists
  if (!token) {
    return res.status(401).json("Token not provided");
  }

  try {
    var idUser = jwt.verify(token, "mk");
    AccountModel.findOne({
      _id: idUser,
    })
      .then((data) => {
        if (data) {
          req.data = data;
          next();
        } else {
          return res.status(401).json("Invalid token");
        }
      })
      .catch((err) => {
        return res.status(401).json("Invalid token");
      });
  } catch (err) {
    return res.status(401).json("Invalid token");
  }
};
// GET /todos
app.get("/todos", checkLogin, (req, res) => {
  res.json(todos);
});

// POST /todos
app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    createdAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// PUT /todos/:id
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = req.body;
  let found = false;
  for (let i = 0; i < todos.length; i++) {
    if (todoId === todos[i].id) {
      todos[i] = { ...todos[i], ...updatedTodo };
      found = true;
      break;
    }
  }

  if (!found) {
    res.status(404).send("todo not found");
  } else {
    res.json(todos);
  }
});

// DELETE /todos/:id
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  let found = false;

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    found = true;
    res.json({ message: "To-do item deleted successfully" });
  } else {
    res.status(404).send("Todo not found");
  }
});

app.post("/register", (req, res, next) => {
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

app.post("/login", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  AccountModel.findOne({
    username: username,
    password: password,
  })
    .then((data) => {
      if (data) {
        var token = jwt.sign({ _id: data._id }, "mk");

        // đăng nhập xong rồi thì lưu token trong cookie cho những lần tiếp theo
        res.cookie("token", token, { httpOnly: true });

        return res.json({
          message: "dang nhap thanh cong ",
        });
      } else {
        res.status(300).json("tai khoan khong đúng");
      }
    })
    .catch((err) => {
      res.status(500).json("Có lỗi bên server");
    });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

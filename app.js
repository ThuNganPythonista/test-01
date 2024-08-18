require("dotenv").config();
const express = require("express");
const app = express();
require("./config/swagger.js");
// const swaggerAutogen = require("swagger-autogen")();
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger_output.json");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Todo API",
    description:
      "API for managing todo items, user registration, and authentication",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    cookieAuth: {
      type: "apiKey",
      in: "cookie",
      name: "token",
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);

// s;
const PORT = 3000;
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./config/swagger.js");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import routes
const todosRoutes = require("./routes/todos.js");
const authRoutes = require("./routes/auth.js");

// Import middleware
const authMiddleware = require("./middleware/auth.js");

// Import models
const AccountModel = require("./models/account.js");
// API routes
app.use("/todos", authMiddleware.checkLogin, todosRoutes);
app.use("/auth", authRoutes);

// const outputFile = "./swagger_output.json";
// const endpointsFiles = ["./routes/index.js"];

// const doc = {
//   info: {
//     version: "1.0.0",
//     title: "My API",
//     description: "API documentation",
//   },
//   host: "localhost:3000",
//   basePath: "/",
//   schemes: ["http", "https"],
// };

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {

// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const PORT = 3000;
// const AccountModel = require("./models/account.js");
// // const clientSide = require("client-side.js");
// var bodyParser = require("body-parser");
// var jwt = require("jsonwebtoken");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// var cookieParser = require("cookie-parser");

// app.use(cookieParser());

// app.use(express.json());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// // Dưx liệu giả lập để test api postman
// let todos = [
//   { id: 1, task: "Buy groceries", createdAt: new Date().toISOString() },
//   { id: 2, task: "Clean the house", createdAt: new Date().toISOString() },
// ];

// const checkLogin = async (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json("Token not provided");
//   }

//   try {
//     const idUser = jwt.verify(token, process.env.JWT_SECRET);
//     const data = await AccountModel.findOne({ _id: idUser });
//     if (data) {
//       req.data = data;
//       next();
//     } else {
//       return res.status(401).json("Invalid token");
//     }
//   } catch (err) {
//     return res.status(401).json("Invalid token");
//   }
// };
// // GET /todos
// app.get("/todos", checkLogin, (req, res) => {
//   res.json(todos);
// });

// // POST /todos
// app.post("/todos", (req, res) => {
//   const newTodo = {
//     id: todos.length + 1,
//     task: req.body.task,
//     createdAt: new Date().toISOString(),
//   };
//   todos.push(newTodo);
//   res.json(newTodo);
// });

// // PUT /todos/:id
// app.put("/todos/:id", (req, res) => {
//   const todoId = parseInt(req.params.id);
//   const updatedTodo = req.body;
//   let found = false;
//   for (let i = 0; i < todos.length; i++) {
//     if (todoId === todos[i].id) {
//       todos[i] = { ...todos[i], ...updatedTodo };
//       found = true;
//       break;
//     }
//   }

//   if (!found) {
//     res.status(404).send("todo not found");
//   } else {
//     res.json(todos);
//   }
// });

// // DELETE /todos/:id
// app.delete("/todos/:id", (req, res) => {
//   const todoId = parseInt(req.params.id);
//   let found = false;

//   const todoIndex = todos.findIndex((todo) => todo.id === todoId);

//   if (todoIndex !== -1) {
//     todos.splice(todoIndex, 1);
//     found = true;
//     res.json({ message: "To-do item deleted successfully" });
//   } else {
//     res.status(404).send("Todo not found");
//   }
// });

// app.post("/register", (req, res, next) => {
//   var username = req.body.username;
//   var password = req.body.password;

//   console.log(username, password);
//   AccountModel.findOne({
//     username: username,
//   })
//     .then((data) => {
//       if (data) {
//         res.json("Tài khoản này đã tồn tại");
//       } else {
//         return AccountModel.create({
//           username: username,
//           password: password,
//         });
//       }
//     })
//     .then((data) => {
//       if (data) {
//         res.json("Tạo tài khoản thành công");
//       }
//     })
//     .catch((err) => {
//       res.status(500).json("Tạo tài khoản thất bại");
//     });
// });

// app.post("/login", async (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   try {
//     const data = await AccountModel.findOne({
//       username: username,
//       password: password,
//     });

//     if (data) {
//       const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET);

//       res.cookie("token", token, { httpOnly: true });

//       return res.json({
//         message: "dang nhap thanh cong ",
//       });
//     } else {
//       res.status(300).json("tai khoan khong đúng");
//     }
//   } catch (err) {
//     res.status(500).json("Có lỗi bên server");
//   }
// });
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

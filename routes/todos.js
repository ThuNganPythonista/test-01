const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { todos } = require("../utils/seed");

// GET /todos
router.get("/", authMiddleware.checkLogin, (req, res) => {
  res.json(todos);
});

// POST /todos
router.post("/", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    createdAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// PUT /todos/:id
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;

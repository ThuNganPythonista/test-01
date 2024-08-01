const express = require("express");
const app = express();
const PORT = 3000;

// Dưx liệu giả lập để test api postman
// Dummy data to store to-do items
let todos = [
  { id: 1, task: "Buy groceries", createdAt: new Date().toISOString() },
  { id: 2, task: "Clean the house", createdAt: new Date().toISOString() },
];

// parse request body ra
app.use(express.json());

// GET /todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// POST /todos
app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// PUT /todos/:id
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  const updatedTodo = req.body;
  todos = todos.map((todo) =>
    todo.id === todoId ? { ...todo, ...updatedTodo } : todo
  );
  res.json(updatedTodo);
});

// DELETE /todos/:id
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== todoId);
  res.json({ message: "To-do item deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

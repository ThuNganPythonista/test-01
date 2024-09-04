const todosRoutes = require("./todos.js");
const authRoutes = require("./auth.js");
const authMiddleware = require("../middleware/auth.js");

function router(app) {
  app.use("/todos", authMiddleware.checkLogin, todosRoutes);
  app.use("/auth", authRoutes);
  app.use("/renew", authRoutes);
}

module.exports = router;

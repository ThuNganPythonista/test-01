require("dotenv").config();
const express = require("express");
require("./config/swagger.js");
require("./config/database.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
const bodyParser = require("body-parser");
const authMiddleware = require("./middleware/auth.js");
const swaggerAutogen = require("swagger-autogen")();
const cookieParser = require("cookie-parser");
const router = require("./routes");
const { sessionConfig, session } = require("./config/session.config.js");

const app = express();
const PORT = 3000; // Rest of your application code here

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(session(sessionConfig));

// API routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

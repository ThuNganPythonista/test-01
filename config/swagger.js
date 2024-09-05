const fs = require("fs");
const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

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

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then((param) => {
    fs.writeFileSync(outputFile, JSON.stringify(param.data, null, 2));
    console.log(`${outputFile} generated successfully.`);
  })
  .catch((err) => {
    console.error("Error generating swagger documentation:", err);
  });

module.exports = { outputFile, endpointsFiles, doc };

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
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);

//doc là một đối tượng xác định cấu trúc tổng thể và siêu dữ liệu của tài liệu API của bạn, bao gồm tiêu đề, mô tả, máy chủ, đường dẫn cơ sở, lược đồ, loại nội dung và định nghĩa bảo mật.
//outputFile là đường dẫn nơi tài liệu Swagger được tạo sẽ được lưu (trong trường hợp này là ./swagger_output.json).
//endpointsFiles là một mảng các tệp chứa các tuyến đường và bộ điều khiển Express.js của bạn (trong trường hợp này là ['./routes/todos.js', './routes/auth.js']). Thay thế các đường dẫn tệp này bằng các đường dẫn thực tế đến các tệp tuyến đường của bạn.

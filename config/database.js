const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected!"));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
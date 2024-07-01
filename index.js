const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mainRoute = require("./src/routes/main");
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/", mainRoute);

const start = async () => {
  app.listen(port, () => {
    console.log(`
        BasicServer app is accessible on  http://localhost:${port}
        `);
  });
};

start();

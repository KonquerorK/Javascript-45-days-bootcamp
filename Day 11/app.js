const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const jwt = require("jsonwebtoken");
const userRoute = require("./routes/user");
const loginRoute = require("./routes/login");
const { sequelize, UserModel } = require("./database/db");
const authentication = require("./middlewares/authentication");


const app = express();
app.use(express.json());
app.use(authentication);

app.use("/users",  userRoute);
app.use("/login", loginRoute);

hostname = "127.0.0.1";
port = "3000";

app.listen(port, hostname, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    console.log("");
    console.log("Connection has been established successfully.");
    console.log("");
    console.log(`Server running at http://${hostname}:${port}`);
    console.log("");
    console.log("");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

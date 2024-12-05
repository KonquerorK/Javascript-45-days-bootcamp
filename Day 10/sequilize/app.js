const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const userRoute = require("./routes/user");
const { sequelize, UserModel } = require("./database/db");

const app = express();
app.use(express.json());

app.use("/users", userRoute);

hostname = "127.0.0.1";
port = "3000";

app.listen(port, hostname, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("");
    console.log("");
    console.log("Connection has been established successfully.");
    console.log(`Server running at http://${hostname}:${port}`);
    console.log("");
    console.log("");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

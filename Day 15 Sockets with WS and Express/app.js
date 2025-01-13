const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const userRoute = require("./routes/user");
const loginRoute = require("./routes/login");
const { sequelize } = require("./database/db");
const authentication = require("./middlewares/authentication");
const { WebSocketServer } = require("ws");
const path = require('path');

const app = express();

// websocket implementation
const wss = new WebSocketServer({port: 5129});

wss.on('connection', function connection(client){
  client.on("error", console.error);

  client.on("message", function message(data){
    console.log("received: %s", data);
  });

  client.send("Send message");
});


app.use((request, response, next) => {
  request.wss = wss;
  next();
});

app.use(express.json());
app.use(authentication);

app.use("/users", userRoute);
app.use("/login", loginRoute);
app.use("/public", express.static('public'));

app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

hostname = "127.0.0.1";
port = "3000";

app.listen(port, hostname, async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
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

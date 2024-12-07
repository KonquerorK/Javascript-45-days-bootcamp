// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(process.env.DB_CONNECTION, {
//     dialect: "mysql",
// });

// module.exports = { sequelize };

const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const createUserModel = require("../models/user");
dotenv.config();

//definition of config for mysql db connection on .env file
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

const UserModel = createUserModel(sequelize);

module.exports = { sequelize, UserModel };

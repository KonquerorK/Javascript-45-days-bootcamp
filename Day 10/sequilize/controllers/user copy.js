// let users = [];

// const { response } = require("express");
const { where } = require("sequelize");
const { UserModel } = require("../database/db");

const getAllUser = async (request, response) => {
  // let user = response.status(200).json([users]);

  // if (!user) {
  //   response.status(404).send("User Not Found!");
  //   return;
  // } else {
  //   response.status(200).json([users]);
  // }

  let user = await UserModel.findAll();

  if (!user) {
    response.status(404).send("User Not Found!");
    return;
  }

  response.json(user);
};

const getUser = async (request, response) => {
  const id = +request.params.id;

  // let user = users.find((u) => u.id === id);

  ////Method with request
  // let user = await UserModel.findOne({
  //   where: {
  //     id: id
  //   }
  // });

  //Method with function
  let user = await UserModel.findByPk(id);

  if (!user) {
    response.status(404).send("User Not Found!");
    return;
  }

  response.json(user);
};

const createUser = async (request, response) => {
  // let user = request.body;
  // user.id = Date.now();
  // users.push(user);

  //create user
  const user = await UserModel.create(request.body);
  response.status(201).json(user);
};

const updateUser = async (request, response) => {
  const id = +request.params.id;
  // let user = users.find((u) => u.id === id);

  // if (!user) {
  //   response.status(404).send("User not found!");
  //   return;
  // }

  // users = users.filter((u) => u.id !== id);
  // user = request.body;
  // user.id = id;
  // users.push(user);

  let user = await UserModel.findByPk(id);
  if (!user) {
    response.status(404).send("User not found!");
    return;
  }

  user.email = request.body.email;
  user.password = request.body.password;
  user.save();

  response.send(user);
};

const deleteUser = async (request, response) => {
  const id = +request.params.id;
  // users = users.filter((u) => u.id !== id);
  // response.status(204).send("User Deleted!");

  // let user = await UserModel.destroy({
  //   where: {
  //     id: id,
  //   },
  // });

  // let user = await UserModel.findByPk(id);
  // if (!user) {
  //   response.status(204).send("User Not Deleted!");
  //   return;
  // }
  // response.json(user);

  let user = await UserModel.findByPk(id);

  if (!user) {
    response.status(204).send("User Not Found!");
    return;
  }

  await user.destroy();
  response.status(204).send("");
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

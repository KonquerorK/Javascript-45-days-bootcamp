const { UserModel } = require("../database/db");
const bcrypt = require("bcrypt");

const getAllUser = async (request, response) => {
  let user = await UserModel.findAll();

  if (!user) {
    response.status(404).send("User Not Found!");
    return;
  }

  response.json(user);
};

const getUser = async (request, response) => {
  const id = +request.params.id;
  let user = await UserModel.findByPk(id);

  if (!user) {
    response.status(404).send("User Not Found!");
    return;
  }

  response.json(user);
};

const createUser = async (request, response) => {
  const userData = request.body;
  userData.password = await bcrypt.hash(request.body.password, 12);
  const user = await UserModel.create(userData);
  const jsonData = user.toJSON();
  delete jsonData.password;
  response.status(201).json(jsonData);
};

const updateUser = async (request, response) => {
  const id = +request.params.id;
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

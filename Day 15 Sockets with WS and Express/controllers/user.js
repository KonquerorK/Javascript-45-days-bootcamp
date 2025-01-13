const {UserModel} = require("../database/db");
const bcrypt = require("bcrypt");
const {loginValidator, createUserValidator, updateUserValidator} = require("../validators/user");

const getAllUser = async (request, response) => {
  let user = await UserModel.findAll();

  if (!user) {
    response.status(404).send("User Not Found!");
    return;
  }

  response.json(user);
};

const getUser = async (request, response) => {
  const id = + request.params.id;
  let user = await UserModel.findByPk(id);

  if (!user) {
    response.status(404).send("User Not Found!");
    return;
  }

  response.json(user);
};

const createUser = async (request, response) => {
  try {
    const userData = await createUserValidator.validate(request.body, {abortEarly: false});
    console.log(userData);
    userData.password = await bcrypt.hash(request.body.password, 12);
    const user = await UserModel.create(userData);
    console.log(user);
    const jsonData = user.toJSON();
    delete jsonData.password;
    response.status(201).json(jsonData);
  } catch (error) {
    console.log("erreur:", error.mesage);
    response.status(400).send("Bad request");
    return;
  }
};

const updateUser = async (request, response) => {
  try {
    const id = +request.params.id;
    // const isAdmin = request.params.is_admin;
    let user = await UserModel.findByPk(id);

    if (!user) {
      response.status(404).send("User not found!");
      return;
    }
    const userData = await updateUserValidator.validate(request.body, {
      abortEarly: false,
      context: request.user.email
    });

    user.email = userData.email;
    user.password = await bcrypt.hash(userData.password, 12);
    // user.isAdmin = userData.is_admin;
    await user.save();
    const jsonData = user.toJSON;
    delete jsonData.password;
    response.json(jsonData);
    
  } catch (error) {
    response.status(400).send("Bad request");
    return;
  }
};

const deleteUser = async (request, response) => {
  const id = +request.params.id; //L'utilisateur qu'on tente de supprimer  le +permet de parser l'id
  let user = await UserModel.findByPk(id); //L'utilisateur qui effectue la tentative de suppression

  if (!user) {
    response.status(204).send("User Not Found!");
    return;
  }

  //verifier si l'user souhaite se supprimer
  if (user.id == request.params.id) {
    response.status(403).json({error: "You can not delete yourself!"});
    return;
  }

  await user.destroy();
  response.status(204).send("");
};

const uploadPicture = async (req, res) => {
  if (req.hasError) {
    res.status(400).json(req.errors);
    return;
  }

  const user = req.user;
  user.picture_url = `/public/users/${req.file.filename}`;
  await user.save();
  res.send("Image Uploaded");
};

module.exports = {
  getAllUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadPicture
};

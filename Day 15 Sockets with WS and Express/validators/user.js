const {UserModel} = require("../database/db");


const yup = require("yup");
require("yup-password")(yup);

const loginValidator = yup.object({email: yup.string().email("Invalid Email").required("Email is required"), password: yup.string().required("Password is required")});

const createUserValidator = yup.object({
  email: yup.string().email("invalid email").required().test("unique-email", "Your email is not unique", async (value, context) => {
    const user = await UserModel.findOne({
      where: {
        email: value
      }
    });
    console.log("utilisateur:", user);
    // return user = undefined || user == null;
    return user === undefined || user === null;
  }),

  password: yup.string().required().min(8).max(30).minLowercase(1).minUppercase(1).minSymbols(1)
});

const updateUserValidator = yup.object({
  email: yup.string().email("invalid email").required().test("unique-email", "Your email is not unique", async (value, context) => {
    if (value === context.options.context) {
      return true;
    }
    const user = await UserModel.findOne({
      where: {
        email: value
      }
    });
    console.log("utilisateur:", user);
    // return user = undefined || user == null;
    return user === undefined || user === null;
  }),

  password: yup.string().required().min(8).max(30).minLowercase(1).minUppercase(1).minSymbols(1),
//   is_admin: yup.bool(),
  is_admin: yup.bool().required("is_admin is required").oneOf([true, false], "is_admin must be a boolean").nullable(),
});

module.exports = {
  loginValidator,
  createUserValidator,
  updateUserValidator
};

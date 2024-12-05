const {
  getAllUser,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const router = require("express").Router();

router.get("/", getAllUser);
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;

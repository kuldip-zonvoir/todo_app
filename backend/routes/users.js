const express = require("express");
const router = express.Router();

const { signUp, signIn, allUsers, deleteUser } = require("../controller/user");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/allUsers", allUsers);
router.delete("/:userId", deleteUser);
module.exports = router;

const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.post("/signup",userController.register);
router.post("/signin",userController.login);

module.exports = router;

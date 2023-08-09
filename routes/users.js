const express = require("express");

const router = express.Router();

const userController = require("../controllers/users_controller.js");

router.get("/", userController.profile);
router.get("/sign-in", userController.signin);
router.get("/sign-up", userController.signup);
router.post("/create", userController.createUser);
router.post("/create-session", userController.createSession);

module.exports = router; 
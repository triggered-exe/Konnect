const express = require("express");

const router = express.Router();

const userController = require("../controllers/users_controller.js");

const passport = require("passport");

router.get("/", userController.profile);
router.get("/sign-in", userController.signin);
router.get("/sign-up", userController.signup);
router.post("/createUser", userController.createUser);
// router.post("/create-session", userController.createSession);
router.get("/profile", userController.profile);
//using passport as a middlewate to authenticate
router.post("/create-session",passport.authenticate(
    "local",
    {failureRedirect: "/users/sign-in"}
), userController.createSession);

module.exports = router; 
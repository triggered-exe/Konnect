const express = require("express");

const router = express.Router();

const userController = require("../controllers/users_controller.js");

const passport = require("passport");

router.get("/profile/:id", passport.checkAuthentication, userController.profile);

router.post("/update/:id", passport.checkAuthentication, userController.update);
//router.get("/", passport.checkAuthentication, userController.profile);
router.get("/sign-in", userController.signin);
router.get("/sign-up", userController.signup);
router.post("/createUser", userController.createUser);
//using passport as a middlewate to authenticate
router.post("/create-session", passport.authenticate(
    "local",
    { failureRedirect: "/users/sign-in" }
), userController.createSession);
router.get("/sign-out", userController.destroySession);

module.exports = router;
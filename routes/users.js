const express = require("express");

const router = express.Router();

const userController = require("../controllers/users_controller.js");

const passport = require("passport");

const User = require("../models/user");

const upload = require("../config/multer/avatar-upload.js");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);

router.post(
  "/update/:id",
  passport.checkAuthentication,
  upload.single("avatar"),
  userController.update
);

//router.get("/", passport.checkAuthentication, userController.profile);
router.get("/sign-in", userController.signin);
router.get("/sign-up", userController.signup);
router.post("/createUser", userController.createUser);

//using passport as a middlewate to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);
router.get("/sign-out", userController.destroySession);

// authenticate using google
router.get(
  "/auth/google",
  passport.authenticate( "google",{ scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

module.exports = router;

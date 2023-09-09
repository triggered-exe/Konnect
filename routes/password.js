const express = require("express");

const router = express.Router();

const passport = require("passport");

const resetPassController = require("../controllers/reset_password_controller.js");

router.get("/", resetPassController.getResetPasswordEmailPage);
router.post("/generate-email", resetPassController.resetPasswordEmailGenerate);

router.get("/get-new-password", resetPassController.getNewPasswordPage);

router.post("/update-new-password", resetPassController.updateNewPassword);

module.exports = router;
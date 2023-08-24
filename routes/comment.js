const express = require("express");
const passport = require("passport");
const router = express.Router();
const comment_controler = require("../controllers/comments_controller");

router.post("/create",passport.checkAuthentication, comment_controler.create);
router.get("/delete/:id",passport.checkAuthentication, comment_controler.delete);
module.exports = router;  
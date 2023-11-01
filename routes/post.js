const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../config/multer/media-upload");

const postController = require('../controllers/post_controller');

router.post("/create", passport.checkAuthentication, upload.single("media") ,  postController.create);

router.delete("/delete/:id", passport.checkAuthentication, postController.delete);
module.exports = router;  
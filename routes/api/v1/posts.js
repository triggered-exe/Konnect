const express = require("express");
const router = express.Router();

const passport = require("passport");
const postApi = require("../../../controllers/api/v1/posts_api");

router.get("/show", postApi.show);
router.delete("/delete/:id",passport.authenticate("jwt", {session: false}), postApi.delete);

module.exports = router;
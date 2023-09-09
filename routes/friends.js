const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friends_controller");


router.post("/add-friend", friendController.addFriend);
router.post("/remove-friend", friendController.removeFriend);

module.exports = router;
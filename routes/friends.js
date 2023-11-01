const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friends_controller");


router.post("/add-friend", friendController.addFriend);
router.post("/remove-friend", friendController.removeFriend);
router.get("/show-friendlist/:id", friendController.showFriendList);

module.exports = router;
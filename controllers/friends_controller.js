const User = require("../models/user");
const Friendship = require("../models/friendship");

// function to add the friend to the user
module.exports.addFriend = async (req, res) => {
  try {
    let userId = req.user.id;
    let friendId = req.body.friendId;
    console.log("userId", userId);
    console.log("friendId", friendId);
    // check whether they are aleady friends
    const friendship = await Friendship.findOne({
      $or: [
        { from_user: userId, to_user: friendId },
        { from_user: friendId, to_user: userId },
      ],
    }).exec();

    if (friendship) {
      console.log("they are already friends");
      return res.status(500).json({
        message: "friendship cannot be created ,they are alreay friends",
        data: {
          isCreated: false,
        },
      });
    } else {
      console.log("they are not friend proceeding to add them as friend");
      //  check whether the User Exist
      const friend = await User.findById(friendId);

      if (friend) {
        // add the friends to friendship and the user friends array
        const newFriendship = await Friendship.create({
            from_user: userId,
            to_user: friendId,
          });

          console.log("friendship schema created successfully");

        const currentUser = await User.findById(userId);
        const friendUser = await User.findById(friendId);

        currentUser.friends.push(newFriendship._id);
        friendUser.friends.push(newFriendship._id);

        await currentUser.save();
        await friendUser.save();

          console.log("friendship added to the both user friend array");
          return res.status(200).json({
            message: "friendship created successfully",
            data: {
              isCreated: true,
            },
          });
        
      } else {
        console.log("user doesnt exists");
        return res.status(404).json({
          message: "user not found",
          data: {
            isCreated: false,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "friendship cannot be created successfully",
      data: {
        isCreated: false,
      },
    });
  }
};

// function to remonction to remove the friend from the user
module.exports.removeFriend = async (req, res) => {
  try {
    console.log("removal friend started")
    let userId = req.user.id;
    let friendId = req.body.friendId;
    // check whether they are aleady friends
    const friendship = await Friendship.findOne({
        $or: [
          { from_user: userId, to_user: friendId },
          { from_user: friendId, to_user: userId },
        ],
      }).exec();
     console.log("friendship",friendship)

    if (friendship) {
      // Remove the friendship reference from both users
      const currentUser = await User.findById(userId);
        const friendUser = await User.findById(friendId);

        currentUser.friends.pull(friendship._id);
        friendUser.friends.pull(friendship._id);


        await currentUser.save();
        await friendUser.save();


        console.log("Friendship array from user removed successfully");
      // Delete the friendship document
      await Friendship.findByIdAndDelete(friendship._id);

      console.log("Friendship removed successfully");

      return res.status(200).json({
        message: "friendship deleted successfully",
        data: {
          isDeleted: true,
        },
      });

    } else {
      console.log("they are not friends");
      return res.status(500).json({
        message: "friendship cannot be deleted successfully",
        data: {
          isDeleted: false,
        },
      });
    }
  } catch (error) {}
};

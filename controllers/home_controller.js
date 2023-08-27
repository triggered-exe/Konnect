const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
   //populating ther user fiels with the object id it was referenced to
   Post.find()
      .populate("user")
      //find the comments of each post and populate the user field with the object id it was referenced to
      .populate({
         path: "comments",
         populate: {
            path: "user"
         },
         sort: {createdAt: -1}
      })
      .sort("-createdAt")
      .then((posts) => {
         //find all the user and return them
         User.find({})
            .then((users) => {
               //return an array of objects posts
               return res.render("home", {
                  posts: posts,
                  all_users: users
               });
            
            })
      })

} 
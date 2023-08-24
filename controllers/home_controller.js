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
         }
      })
      .exec()
      .then((posts) => {
         //find all the user and return them
         User.find({})
            .then((users) => {
               //return an object 
               return res.render("home", {
                  posts: posts,
                  all_users: users
               });
            
            })
      })

} 
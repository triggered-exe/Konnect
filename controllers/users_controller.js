const User = require("../models/user");
const Friendship = require("../models/friendship")
const path = require("path");
const fs = require("fs");


module.exports = {
  profile: function (req, res) {
    User.findById(req.params.id)
      .then(async (user) => {
        let isFriend = false;
        if (user) {
         // check if friensship exist 
         console.log( req.user.id)
         console.log(req.params.id)
         const friendship = await Friendship.findOne({
          $or: [
            { from_user: req.user.id, to_user: user.id },
            { from_user: user.id, to_user:  req.user.id },
          ],
        }).exec();
        if(friendship){
          console.log("friendship exist : " + isFriend)
          isFriend = true; 
        }
          return res.render("profile.ejs", { profile_user: user, isFriend: isFriend });
        } else {
          return res.redirect("back");
        }
      })
      .catch((error) => {
        console.log(error);
        return res.redirect("back");
      });
  },
  signin: function (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("/users/profile");
    }
    return res.render("user_sign_in.ejs", {
      title: "signin",
    });
  },

  signup: function (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("/users/profile");
    }
    return res.render("user_sign_up.ejs", {
      title: "signup",
    });
  },

  createUser: function (req, res) {
    
    User.findOne({ email: req.body.email }).then((data) => {
      //handle user found
      if (!data) {
        User.create(req.body)
          .then((data) => {
            console.log(data);
            return res.render("user_sign_in.ejs");
          })
          .catch((error) => {
            console.log(error);
            return res.redirect("back");
          });
        //handle user not found
      } else {
        console.log("email already registered");
        return res.redirect("back");
      }
    });
  },
  update: function async (req, res) {
    console.log("inside update")
    console.log(req.file)
    if (req.user.id == req.params.id) {
      User.findById(req.params.id)
        .then(async (user) => {
            if(req.file){
              // if user.avatar exist delete the avatar from file storage
              if(user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))){
                // File exists, proceed with deletion
                fs.unlinkSync(path.join(__dirname, '..', user.avatar));
              }
                user.avatar = req.file.path;
            }
            console.log("inside update")
            user.name = req.body.name;
            user.email = req.body.email;

            await user.save();
          
          console.log("user updated successfully");
          return res.redirect("back");
        })
        .catch((error) => {
          console.log(error);
          return res.redirect("back");
        });
    } else {
      return res.status(401).send("unauthorized");
    }
  },
  createSession: function (req, res) {
    req.flash("success", "Logged in Successfully");
    console.log(req.user);
    res.redirect("/");
  },
  destroySession: async function (req, res) {
   
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success", "You have logged out");
      res.redirect("/");
    });
  },
};

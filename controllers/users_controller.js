const User = require("../models/user");

module.exports = {
  profile: function (req, res) {
    User.findById(req.params.id)
      .then((user) => {
        if (user) {
          return res.render("profile.ejs", { profile_user: user });
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
  update: function (req, res) {
    if (req.user.id == req.params.id) {
      User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
      })
        .then((data) => {
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

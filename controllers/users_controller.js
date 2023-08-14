const User = require("../models/user")

module.exports = {
    profile: function (req, res) {
        res.render("profile.ejs");
        return;
    },
    signin: function (req, res) {
        if (req.isAuthenticated()) {
            return res.redirect('/users/profile');
        }
        return res.render("user_sign_in.ejs", {
            title: "signin"
        })
    },

    signup: function (req, res) {
        if (req.isAuthenticated()) {
            return res.redirect('/users/profile');
        }
        return res.render("user_sign_up.ejs", {
            title: "signup"
        });
    },

    createUser: function (req, res) {
        User.findOne({ email: req.body.email }).then((data) => {
            //handle user found
            if (!data) {
                User.create(req.body).then((data) => {
                    console.log(data);
                    return res.render("user_sign_in.ejs");
                }).catch((error) => {
                    console.log(error);
                    return res.redirect('back');
                })
                //handle user not found
            } else {
                console.log("email already registered");
                return res.redirect('back');
            }
        })
    },
    createSession: function (req, res) { 
        return res.redirect("/users/profile");
    },
    destroySession: function (req, res) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
          });
    }


}
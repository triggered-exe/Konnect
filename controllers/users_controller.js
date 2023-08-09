// module.exports.profile = function (req, res) {
//     res.render("profile", {
//         title: "profile"
//     });
// }
// module.exports.signin = function (req, res) {
//     res.render("signin", {
//         title: "signin"
//     });
// }
// module.exports.signup = function (req, res) {
//     res.render("signup", {
//         title: "signup"
//     });
// }
const User = require("../models/user")
module.exports = {
    profile: function (req, res) {
        res.render("profile", {
            title: "profile"
        })
    },
    signin: function (req, res) {
        res.render("user_sign_in.ejs", {
            title: "signin"
        })
    },

    signup: function (req, res) {
        res.render("user_sign_up.ejs", {
            title: "signup"
        });
    },

    createUser: function(req,res){
        User.findOne({email: req.body.email}).then((data)=>{
            console.log(data);
            if(!data){
                User.create(req.body).then((data)=>{
                    console.log(data);
                    return res.render("user_sign_in.ejs");
                }).catch((error)=>{
                    console.log(error);
                    return res.redirect('back');
                })
            }else{
                console.log("email already registered");
                return res.redirect('back');
            }
            
       })
    }

}
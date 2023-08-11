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
         if(req.cookies.user_id){
             //id exist
             User.findOne({_id: req.cookies.user_id}).then((data)=>{
                if(data){
                    return res.render("profile",{
                name: data.name, email: data.email
                })
                }else{
                    console.log("user doesnt exist in database")
                }
            })
           
        }else{
            console.log("user not logged in");
            res.redirect("back");
            return;
        }
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
        console.log(req.body)
        User.findOne({email: req.body.email}).then((data)=>{
            //handle user found
            if(!data){
                User.create(req.body).then((data)=>{
                    console.log(data);
                    return res.render("user_sign_in.ejs");
                }).catch((error)=>{
                    console.log(error);
                    return res.redirect('back');
                })
                 //handle user not found
            }else{
                console.log("email already registered");
                return res.redirect('back');
            }
            
       })
    },

    createSession: (req,res)=>{

        User.findOne({email: req.body.email}).then((data)=>{
            console.log(req.body)
            console.log(data)
           //handle user not found
           if(!data){
             console.log("email doesnt exist")
              return res.redirect('back');
            }else{
                console.log(data)
                //handle password mismatch
                if(data.password != req.body.password){
                    console.log("wrong password");
                    return res.redirect('back');
                    //handle passwor match
               }else{
                res.cookie("user_id", data._id);
                console.log("successfully login")
                User.findOne({_id: data._id}).then((data)=>{
                    if(data){
                        return res.render("profile",{
                    name: data.name, email: data.email
                    })
                    }else{
                        console.log("user doesnt exist in database")
                    }
                })
               }
          }
        }).catch((error)=>{
            console.log(error);
            return res.redirect('back');
        })
    }

}

module.exports.createSession =  function(req, res){
    return res.redirect("/");
}
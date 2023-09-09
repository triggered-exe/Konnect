const User = require("../models/user");
const ResetPassword = require("../models/reset_pass");
const crypto = require("crypto");
const resetPassMailer = require("../mailers/reset_pass_mailer");
const flash = require("connect-flash");

module.exports.getResetPasswordEmailPage = function(req,res){
    return res.render("getResetPasswordEmailPage");
}
module.exports.resetPasswordEmailGenerate = function(req,res){
    
    const email = req.body.email;
    // find the email exist
    User.findOne({email:email})
    .then( async (user)=>{
     if(user){
        console.log(2);
         let token = await ResetPassword.create({
             user:user.id,
             token:crypto.randomBytes(20).toString("hex"),
             isValid: true
         })
         console.log("token created:  "+ token);

          let url = "http://localhost:8000/reset-password/get-new-password?token="+token.token;

         await resetPassMailer.resetEmail(url,user.email);
         req.flash("success","Email sent to your email id");
         return res.redirect("back");
     
     }else{
        console.log("email id is incorrect");
        req.flash("error","Email id is incorrect");
        return res.redirect("back");
     }
    })
     .catch((err)=>{
        console.log(err)
        console.log("cannot generate email")
        req.flash("error","Cannot generate email");
        return res.redirect("back");
     })
 }   
module.exports.getNewPasswordPage = function(req,res){
    res.render("resetPasswordPage");
}

module.exports.updateNewPassword = function(req,res){
    const token = req.body.token;;
    console.log(token);
    ResetPassword.findOne({token:token})
    .then((resetPass)=>{
        if(resetPass){
            console.log(resetPass);
            if(resetPass.isValid == false){
                console.log("token is already used");
                req.flash("error","Token is already used");
                return res.redirect("back");
            }else{
                console.log("token is valid");
                resetPass.token = false;
                //update the password in the User model
                const email = req.body.email;
                const password = req.body.password;
                const confirmPassword = req.body.confirmPassword;
                if(password != confirmPassword){
                    return res.redirect("back");
                }else{
                    // find the user by token
                    User.findById(resetPass.user)
                    .then((user)=>{
                        if(user){
                            user.password = password;
                            user.save();
                            console.log("password is updated");
                            req.flash("success","Password is updated");
                            return res.redirect("/users/sign-in");
                        }
                       })
                       .catch((err)=>{
                        console.log(err);
                        req.flash("error","Error while updating password");
                        return res.redirect("back");
                       })
                }
                
            }
        }
    })
    .catch((err)=>{
        console.log(err);
        return res.redirect("back");
    })

}
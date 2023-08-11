const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: "email"
},
function(email, password, done){
    //find user and establish identity
    User.findOne({email: email})
    .then((user)=>{
        if(user){
            if(password != user.password){
                console.log("incorrect password");
                return done(null, false)
            }else{
                console.log("correct password");
                return done(null, user);
            }
        }
    })
    .catch((error)=>{
        console.log(error);
        return done(error);
    })
}
))

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null,user.id);
})

//deserializing user from the key inthe cookies
passport.deserializeUser(function(id, done){
    User.findById(id)
    .then((user)=>{
        if(user){
          return done(null, user);
        }else{
            return done(null, false);
        }
    })
    .catch((error)=>{
        console.log(error);
        return done(error);
    })
})

module.exports = passport;
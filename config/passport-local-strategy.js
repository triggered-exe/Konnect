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
    console.log("serializing user");
    done(null,user.id);
})

//deserializing user from the key in the cookies
passport.deserializeUser(function(id, done){
    console.log("deserializing user");
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

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;
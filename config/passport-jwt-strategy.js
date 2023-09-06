const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "konnect"
};


passport.use(new JWTStrategy(opts, function (jwt_payload, done) {
   
    User.findById(jwt_payload._id)
    .then((user)=>{
        console.log("strategy jwt working")
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
    .catch((error)=>{
        console.log(error);
        return ;
    })
})
)
 

module.exports = passport;
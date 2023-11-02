const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const env = require("./environment");
const User = require("../models/user");

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret_key
};


passport.use(new JWTStrategy(opts, function (jwt_payload, done) {
   
    User.findById(jwt_payload._id)
    .then((user)=>{
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
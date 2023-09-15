const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");
const env = require("./environment");
const User = require("../models/user");

//tell passport to use a new strategy for google login
passport.use(
  new GoogleStrategy(
    {
      clientID: env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_callback_url,
    },
    function (accessToken, refreshToken, profile, cb) {
      //find if user already exist if not create one
      User.findOne({ email: profile.emails[0].value }).then((user) => {
        if (user) {
          return cb(null, user);
        } else {
          User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
            avatar: profile.photos[0].value,
          })
            .then((user) => {
              console.log("user sign-up successfully");
              return cb(null, user);
            })
            .catch((err) => {
              console.log(err);
              return;
            });
        }
      });
    }
  )
);

module.exports = passport;

const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const PublicModel = require('./public/model')

//passport for authentication and authorization
passport.use(new BearerStrategy(
    function(accessToken, done) {
        PublicModel.findOne({ accessToken })
            .then((userFound) => {
                if (userFound) {
                    return done(null, userFound)
                } else {
                    return done(null, false)
                }
            })
            .catch((error) => {
                done(error)
            })
        }
  ));

  module.exports = passport
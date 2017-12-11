import User from '../../models/user/userschema'
import { Strategy } from 'passport-local'

module.exports = function (passport, config) {
  let options = {
    usernameField: 'email'
  }

  let strategy = new Strategy(options,
    function (email, password, done) {
      User.findOne({email: email}, function (err, user) {
        if (err) { return done(err) }

        if (!user) {
          global.logger.log('User not found')
          return done(null, false)
        }

        user.comparePassword(password, (err, match) => {
          if (err) {
            global.logger.error(err)
            return done(err)
          }

          if (!match) {
            global.logger.info('Password match failed')
            return done(null, false)
          }

          return done(null, user)
        })
      })
    })

  // passport.serializeUser(function (user, done) {
  //   done(null, user.id)
  // })
  //
  // passport.deserializeUser(function (id, done) {
  //   User.findById(id, function (err, user) {
  //     done(err, user)
  //   })
  // })

  passport.use(strategy)
}

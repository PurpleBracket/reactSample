import User from '../../models/user/userschema'
import { Strategy, ExtractJwt } from 'passport-jwt'

module.exports = function (passport, config) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.getGlobal('secret')
  }

  const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (err, user) => {
      if (err) {
        return done(err, false)
      }

      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  })

  passport.use(jwtLogin)
}

import Ping from '../controllers/ping/index'
import passport from 'passport'
let Authentication = require('./authentication/index')

// const requireAuth = passport.authenticate('jwt', {session: false})
const requireSignin = passport.authenticate('local', {session: false})

module.exports = function (app) {
  global.logger.log('GET /api/ping')
  app.get('/api/ping', Ping)
  // app.get('/api/protected', requireAuth, (req, res) => {
  //   res.send('You are authenticated!!')
  // })

  global.logger.log('POST /api/signup')
  app.post('/api/signup', Authentication.signup)

  global.logger.log('POST /api/signin')
  app.post('/api/signin', requireSignin, Authentication.signin)
}

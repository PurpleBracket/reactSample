import jwt from 'jwt-simple'
import User from '../../models/user/userschema'
import Status from 'http-status-codes'

exports.signup = (req, res, next) => {
  if (!req.body || !req.body.email || !req.body.password || !req.body.name) {
    return next('Name, Email or Password were not specified')
  }

  const email = req.body.email
  const password = req.body.password
  const name = req.body.name

  User.findOne({email: email}, (err, existingUser) => {
    if (err) return next(err)

    if (existingUser) {
      return res.status(Status.UNPROCESSABLE_ENTITY).send({error: 'Email is in use'})
    }

    const user = new User({
      email,
      password,
      name
    })

    user.save((err) => {
      if (err) return next(err)

      res.json({
        token: tokenForUser(user),
        id: user._id,
        user: user
      })

      // res.json(user)
    })
  })
}

exports.signin = (req, res, next) => {
  res.send({
    token: tokenForUser(req.user),
    id: req.user._id
  })
}

const tokenForUser = function (user) {
  const timestamp = new Date().getTime()
  return jwt.encode({sub: user._id, iat: timestamp}, global.app.config.getGlobal('secret'))
}

// module.exports = function (router) {
//   router.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   }))
// }

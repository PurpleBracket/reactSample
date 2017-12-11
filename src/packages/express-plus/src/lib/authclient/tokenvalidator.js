/**
 * Created by theoutlander on 10/30/2016.
 */

const jwt = require('express-jwt')

class TokenValidator {
  validate (secret) {
    return jwt({
      secret: secret,
      credentialsRequired: true,
      getToken: function fromHeaderOrQuerystring (req) {
//        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        if (req.headers.authorization) {
          return req.headers.authorization
        } else if (req.query && req.query.token) {
          return req.query.token
        }

        return null
      }
    })
  }
}

module.exports = new TokenValidator()

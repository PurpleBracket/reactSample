import CompanySchema from './models/company/company.model'
import PlaidAccountSchema from './models/plaid/plaid.account.schema'
import PlaidItemSchema from './models/plaid/plaid.item.schema'

export default class Router {
  init (server) {
    this.server = server
  }

  registerControllers (app) {
    require('./controllers/transaction.controller')(app)
    require('./controllers/dashboard.controller')(app)
  }

  generateRestApi () {
    this.server.generateRestAPI(CompanySchema, ['post', {verb: 'get', getall: true}])
    this.server.generateRestAPI(PlaidAccountSchema, [{verb: 'get', getall: true}]) // TODO: GetAll should be restricted to owner
    this.server.generateRestAPI(PlaidItemSchema, ['post', {verb: 'get', getall: true}]) // TODO: GetAll should be restricted to owner
  }
}

// module.exports = function () {
//   return {
//     init: function (server) {
//       this.server = server
//     },
//
//     generateRestApi: function () {
//       this.server.generateRestAPI(CompanySchema, ['post', {verb: 'get', getall: true}])
//       // this.server.generateRestAPI(AccountSchema, ['post', {verb: 'get', getall: true}]) // TODO: GetAll should be restricted to owner
//       this.server.generateRestAPI(PlaidItemSchema, ['post', {verb: 'get', getall: true}]) // TODO: GetAll should be restricted to owner
//     }
//   }
// }
//
// import passport from 'passport'
//
// module.exports = function (app) {
//   app.get('/authtest', requireAuth, function (req, res) {
//     res.send({hi: 'there'})
//   })
// }

// import passport from 'passport'
//
// const requireAuth = passport.authenticate('jwt', {session: false})
// const requireSignin = passport.authenticate('local', {session: false})

// module.exports = function (app) {
//
//   // app.get('/protected', requireAuth, (req, res) => {
//   //   res.send('You are authenticated!!')
//   // })
//   //
//   // app.post('/signup', Authentication.signup)
//   // app.post('/signin', requireSignin, Authentication.signin)
// }

import RestClient from '../data/restclient'
import BaseClient from './baseclient'

// import Config from '../lib/config'

class SigninClient extends BaseClient {
  constructor () {
    super()
    this.restclient = new RestClient('/api/signin')
  }

  login (user) {
    return new Promise((resolve, reject) => {
      this.restclient.post(user)
        .then(res => {
          this.setToken(res.body.token)
          // this.setUserId(res.body.id)

          // window.globalState.set('token', res.body.token)
          window.globalState.set('userId', res.body.id)

          resolve(res)
        })
        .catch(err => {
          // this.clearToken()
          window.globalState.clearGlobalState()
          reject(err)
        })
    })
  }

  // setUserId (id) {
  //   window.localStorage.setItem('userId', id)
  // }

  // getUserId () {
  //   return window.localStorage.getItem('userId')
  // }

  // authenticate (user, password) {
  //   var self = this
  //   return new Promise((resolve, reject) => {
  //     self.axios.post(`${self.config.auth.server}/auth/hmp/authenticate`, {user, password})
  //       .then(function (authresponse) {
  //         self.setToken(authresponse.data.token)
  //         resolve(authresponse.data)
  //       })
  //       .catch(function (e) {
  //         self.clearToken()
  //         reject(e)
  //       })
  //   })
  // }
  //
  // validate (token) {
  // }
}

export default new SigninClient()

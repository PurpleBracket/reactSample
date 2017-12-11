import RestClient from '../data/restclient'
import BaseClient from './baseclient'

export default class PasswordResetClient extends BaseClient {
  constructor () {
    super()
    this.restclient = new RestClient('password-reset')
  }
  login (user) {
    return new Promise((resolve, reject) => {
      this.restclient.post(user)
        .then(res => {
          this.setToken(res.body.token)
          resolve(res)
        })
        .catch(err => {
          // this.clearToken()
          window.globalState.clearGlobalState()
          reject(err)
        })
    })
  }
}

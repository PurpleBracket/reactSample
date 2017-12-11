export default class BaseClient {
  setToken (token) {
    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem('token', JSON.stringify(token))
    }

    this.restclient.setGlobalHeader('authorization', token)
  }

  restoreToken (t = null) {
    var token = t
    if (typeof window.localStorage !== 'undefined') {
      token = window.localStorage.getItem('token')
    }

    this.restclient.setGlobalHeader('authorization', token)
  }

  clearToken () {
    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userId')
    }

    this.restclient.deleteGlobalHeader('authorization')
  }
}

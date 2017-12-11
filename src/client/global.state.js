import RestClient from '../packages/express-plus/src/data/restclient'

class GlobalState {
  constructor () {
    this.state = {}
    this.syncLocalStorage()
  }

  syncLocalStorage () {
    for (let item of Object.keys(window.localStorage)) {
      this.state[item] = JSON.parse(window.localStorage.getItem(item))

      // if (this.state[item][0] === '{') {
      //   this.state[item] = JSON.parse(this.state[item])
      // }
    }

    if (this.hasToken()) {
      RestClient.__setAuthorizationHeader(this.get('token'))
    }
    // console.log('Synchronized with local storage:' + JSON.stringify(this.state))
  }

  set (item, val) {
    this.state[item] = val
    window.localStorage.setItem(item, JSON.stringify(val))
    // typeof (val) === 'object' ? JSON.stringify(val) : val)
  }

  get (item, fallbackValue = null) {
    if (!this.state[item]) {
      this.state[item] = JSON.parse(window.localStorage.getItem(item))
    }

    return this.state[item] || fallbackValue
  }

  clearGlobalState () {
    this.state = {}
    window.localStorage.clear()
  }

  hasToken () {
    return window.localStorage.getItem('token') != null
  }

  hasCompany () {
    let obj = this.get('companies')

    if (!obj && !Array.isArray(obj)) {
      return false
    }

    // let obj = JSON.parse(companies)

    // if (!Array.isArray(obj)) { //!obj.companies) {
    //   return false
    // }

    return obj.length > 0
  }

  getCompanyId () {
    if (!this.hasCompany()) {
      return null
    }

    let val = this.get('companies')
    return val[0]
  }

  isAuthenticated () {
    return this.get('userId') !== null
  }
}

let root = typeof (window) !== 'undefined' ? window : global

export default root.globalState = new GlobalState()

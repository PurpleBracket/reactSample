import request from 'superagent'

class RestClient {
  constructor (name, server) {
    this.server = (server || RestClient.testServer)
    this.name = name
    this.url = this.server ? `http://${this.server}${this.name}` : `${this.name}`
  }

  setGlobalHeader (key, val) {
    RestClient.defaultHeaders[key] = val
  }

  deleteGlobalHeader (key) {
    delete RestClient.defaultHeaders[key]
  }

  static __setTestServer (server = '127.0.0.1') {
    RestClient.testServer = server
  }

  static __setAuthorizationHeader (val) {
    // let value = val || window.localStorage.getItem('token')

    // if (!value) {
    //   global.logger.error('AUTHORIZATION HEADER IS NULL')
    // }

    RestClient.defaultHeaders['authorization'] = val
  }

  static __setHeaders (req) {
    for (let key in RestClient.defaultHeaders) {
      req.set(key, RestClient.defaultHeaders[key])
    }

    return req
  }

  post (data) {
    return new Promise((resolve, reject) => {
      let req = request.post(this.url)

      RestClient.__setHeaders(req)
        .send(data)
        .end((err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
    })
  }

  put (data) {
    return new Promise((resolve, reject) => {
      let req = request.put(this.url)

      RestClient.__setHeaders(req)
        .send(data)
        .end((err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
    })
  }

  get (qs) {
    return new Promise((resolve, reject) => {
      let req = request.get(this.url)

      RestClient.__setHeaders(req)
        .query(qs)
        .end((err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
    })
  }

  getAll (data) {
    return new Promise((resolve, reject) => {
      let req = request.get(`${this.url}/list`)

      RestClient.__setHeaders(req)
        .end((err, res) => {
          if (err) {
            reject(err)
          } else {
            resolve(res)
          }
        })
    })
  }

  delete (data, name) {
    return new Promise((resolve, reject) => {
      let req = request.delete(this.url)

      RestClient.__setHeaders(req)
        .then(function () {
          resolve()
        })
        .catch(function (e) {
          global.logger.error(e)
          reject(e)
        })
    })
  }
}

RestClient.defaultHeaders = {}

export default RestClient

import request from 'superagent'

class DataLayer {
  post (api, data, cb) {
    request.post(api).send(data).end((err, res) => {
      cb(err, res)
    })
  }

  get () {

  }

  delete () {

  }

  put () {

  }
}

export default new DataLayer()

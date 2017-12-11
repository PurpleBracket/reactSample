import Express from 'express'
import Middleware from './lib/middleware'
import ModelRoute from './lib/modelroute'

export default class Server {
  constructor (config) {
    this.config = config
    this.app = Express()

    this.modelroute = new ModelRoute(this.app)
  }

  init (registerRoutesCallback) {
    if (registerRoutesCallback) {
      registerRoutesCallback(this, this.config)
    }

    this.middleware = new Middleware(this.app, this.config)
  }

  generateRestAPI (model, actions = ['get', 'post', 'put', 'delete']) {
    if (Array.isArray(model)) {
      model.forEach(m => {
        this.modelroute.generate(m, actions)
      })
    } else {
      this.modelroute.generate(model, actions)
    }
  }

  start (cb) {
    try {
      this.server = this.app.listen(this.config.get('port'), () => {
        if (cb) {
          cb(null, this)
        }
      })
    } catch (e) {
      cb(e)
    }
  }

  stop (cb) {
    try {
      this.server.close(() => {
        if (cb) {
          cb(null, this.app)
        }
      })
    } catch (e) {
      if (cb) {
        cb(e)
      }
    }
  }
}

import confit from 'confit'
import path from 'path'

// By default config.json gets loaded
// IF NODE_ENV is specified then NODE_ENV.json overrides matching values
class Config {
  constructor (configDir) {
    console.info(`NODE ENVIRONMENT: ${process.env.NODE_ENV}`)

    this.basedir = path.resolve(path.join(process.cwd(), 'dist', configDir))

    // TODO: Print on debug
    console.info('Config base dir: ' + this.basedir)
  }

  async createConfig (appName) {
    this.appName = appName

    var promise = await new Promise((resolve, reject) => {
      try {
        confit(this.basedir)
        // .addDefault('./default.json')
          .addOverride(`./middleware.${process.env.NODE_ENV || 'development'}.config.json`)
          // .addOverride(`./${process.env.NODE_ENV || 'development'}.json`)
          .create((err, config) => {
            if (err) {
              reject(err)
            } else {
              this.config = config
              resolve(this)
            }
          })
      } catch (e) {
        reject(e)
      }
    })

    return promise
  }

  get (key, app) {
    console.log(`${app || this.appName}:${key} => ${this.config.get(app || this.appName + ':key')}`)
    return this.config.get(`${app || this.appName}:${key}`)
  }

  getGlobal (key) {
    console.log(`key: ${key}, val: ${this.config.get(key)}`)
    return this.config.get(key)
  }
}

export default new Config('./config')

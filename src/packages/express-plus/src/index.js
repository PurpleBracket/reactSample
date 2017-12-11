import Server from './server'
import Config from './lib/config'
import winston from 'winston'
import database from './lib/database'
import User from './models/user/userschema'
import path from 'path'

export default class ExpressPlus {
  async __init (appName, router) {
    this.__initLogger()
    global.logger = this.logger

    this.appName = appName
    this.config = await Config.createConfig(this.appName)
    this.server = new Server(this.config)
    this.server.init(() => {
      this.server.generateRestAPI(User)
      if (router) {
        router.init(this.server)
        router.generateRestApi()
        router.registerControllers(this.server.app)
        // router.registerRoutesCallback()
      }
    })
    this.database = database
    await this.database.config(this.config)

    // this.hoistApi()

    this.generateRestAPI = this.server.generateRestAPI

    this.__addListeners()
  }

  // hoistApi () {
  //   this.generateAPI = this.server.generateAPI;
  // }

  __addListeners () {
    process.on('unhandledRejection', (reason, p) => {
      console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
      // application specific logging, throwing an error, or other logic here
      console.log(reason.stack)
    })
  }

  async init (appName, router) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.__init(appName, router)
        // this.logger.info('This is a test! We are initializing...')

        resolve(this.server)
      } catch (e) {
        reject(e)
      }
    })
  }

  __initLogger () {
    this.logger = new winston.Logger({
      level: 'info',
      json: true,
      transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        // new winston.transports.Console({
        //   level: 'info',
        //   colorize: true
        //
        // }),
        new winston.transports.File({level: 'error', filename: path.join(__dirname, 'error.log')}),
        new winston.transports.File({name: 'combined', filename: path.join(__dirname, 'combined.log')})
      ]
    })

    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    //
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        // format: winston.format.simple(),
        simple: true,
        colorize: true,
        timestamp: () => (new Date()).toLocaleTimeString()
      }), null, true)
    }

    // global.logger = this.server.logger
  }
}

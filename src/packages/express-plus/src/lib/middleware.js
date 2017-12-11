import express from 'express'
import session from 'express-session'
import lusca from 'lusca'
// import favicon from 'serve-favicon'
import path from 'path'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import opbeat from 'opbeat'

export default class Middleware {
  constructor (app, config) {
    this.app = app
    this.config = config

    // global.logger.log(this.config.getGlobal('favicon'))
    // global.logger.info(`Enrouten directory path: ${path.resolve(path.join(process.cwd(), 'dist'))}`)

    // let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

    global.logger.stream = {
      write: function (message, encoding) {
        global.logger.info(message)
      }
    }

    // app.use(require('morgan')('combined', { 'stream': logger.stream }))
    this.components = {
      morgan: morgan('combined', {stream: global.logger.stream}),

      bodyParser: bodyParser({type: 'application/json'}),

      session: session({
        secret: 'abc',
        resave: true,
        saveUninitialized: true
      }),

      lusca: lusca({
        csrf: false,
        // csp: {policy: {'default-src': '*'}, reportOnly: true},
        xframe: 'SAMEORIGIN',
        p3p: 'ABCDEF',
        hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
        xssProtection: true,
        nosniff: true,
        referrerPolicy: 'no-referrer'
      }),

      // TODO: Include all sub modules from helmet
      helmet: helmet()

      // public: express.static('dist/public'),

      // favicon: favicon(path.join(__dirname, (this.config.getGlobal('favicon') && this.config.getGlobal('favicon:path'))
      //   ? this.config.getGlobal('favicon:path')
      //   : '../public', 'favicon.ico')),

      // enrouten: enrouten({
      //   directory: 'controllers',
      //   basedir: path.resolve(path.join(process.cwd(), 'dist')),
      //   extensions: {'.js': 1}
      // // })
      //
      // health: {route: '/health', middleware: health.ping()},
      // ping: {route: '/ping', middleware: Ping},
      // authenticate: {route: '/signup', middleware: signup}
    }

    // if (this.config.get('NODE_ENV') && this.config.get('NODE_ENV') !== 'test') {
    //   // global.logger.log(this.config.get('NODE_ENV'))
    //   // global.logger.log('SETTING HEALTH: ' + this.config.get('NODE_ENV'))
    //   // this.components['health'] = {route: '/health', middleware: health.ping()}
    // }

    // global.logger.log(path.resolve(__dirname, 'controllers'))

    // var files = recursiveReadSync(path.resolve(__dirname, 'controllers'))

    // files.forEach(f => {
    //   let dir = path.dirname(f).replace(path.resolve(__dirname, 'controllers'), '')
    //   global.logger.log(dir)
    //   var file = require(f);
    //   this.app.use(dir, file)
    // })

    this.connectMiddleware()
  }

  connectMiddleware () {
    Object.keys(this.components).forEach(key => {
      if (this.config[key] && !this.config[key].enabled) {
        return
      }

      let c = this.components[key]
      if (c.route && c.middleware) {
        global.logger.info(`Mounting: ${key} @ ${c.route}`)
        this.app.use(c.route, c.middleware)
      } else {
        this.app.use(c)
      }
    })

    this.__addRouter()
    // this.__addLogger()
    this.__enableCors()
    this.__protectApi()
    // this.__mapController()
    this.__enableSentry()
    this.__addWebpackMiddleware()
    this.__addPassport()
    this.__enableOpbeat()
    this.__addErrorHandlers()
  }

  __addRouter () {
    let router = require('../controllers/router')
    router(this.app)
  }

  __addPassport () {
    let passport = require('passport')

    let passportroutes = require('../lib/auth/local')
    passportroutes(passport, this.config)

    let jwtroutes = require('../lib/auth/jwt')
    jwtroutes(passport, this.config)
  }

  __addWebpackMiddleware () {
    try {
      this.app.use(express.static('dist/public'))

      this.app.get('*', (req, res) => {
        global.logger.log('Serving index file.')
        res.sendFile(path.join(__dirname, 'public/index.html'))
      })

      // if (process.env.NODE_ENV !== 'production' &&
      //   process.env.NODE_ENV !== 'staging' &&
      //   process.env.NODE_ENV !== 'test') {
      //   const webpackConfig = require('../../../../../webpack.config')
      //   const webpackMiddleware = require('webpack-dev-middleware')
      //   const webpack = require('webpack')
      //
      //   // const webpackHotMiddleware = require('webpack-hot-middleware');
      //   // const hotMiddleware = webpackHotMiddleware(webpack(webpackConfig));
      //   // this.app.use(hotMiddleware);
      //
      //   global.logger.log('Running webpack-dev-middleware')
      //   this.app.use(webpackMiddleware(webpack(webpackConfig)))
      //
      //   // const DashboardPlugin = require('webpack-dashboard/plugin')
      //   // this.app.use(webpack.apply(new DashboardPlugin({port: this.config.get('port')})))
      // } else {
      //   this.app.use(express.static('dist/public'))
      //   this.app.get('*', (req, res) => {
      //     global.logger.log('Serving index file.')
      //     res.sendFile(path.join(__dirname, 'public/index.html'))
      //   })
      // }
    } catch (e) {
      global.logger.error(e)
    }
  }

  // __addPubSubClient() {
  //   if(this.getServiceConfigVal("pubsub") === true) {
  //     var pubsub = require('./lib/pubsub');
  //     pubsub.initialize(this.config.get('pubsub'));
  //     this.pubsubClient = pubsub;
  //   }
  // }

  // __addAssetClient() {
  //   if(this.getServiceConfigVal("assetclient") === true) {
  //     var asset = require('./lib/assetclient');
  //     asset.initialize(this.config.get('asset'));
  //     this.assetClient = asset;
  //   }
  // }

  // JWT?
  __addErrorHandlers () {
    // this.app.use(function (err, req, res, next) {
    //   if (err.name === 'UnauthorizedError') {
    //     global.logger.error('unauthorized error')
    //     res.status(401).send({status: 401, message: 'Invalid token', description: 'Unauthorized'})
    //   } else {
    //     global.logger.info('in next')
    //     next()
    //   }
    // })
    //
    // // Optional fallthrough error handler
    // this.app.use((err, req, res, next) => {
    //   if (err) {
    //     global.logger.error(err)
    //   }
    //
    //   // The error id is attached to `res.sentry` to be returned
    //   // and optionally displayed to the user for support.
    //   res.statusCode = 500
    //   res.end(res.sentry + '\n')
    // })
  }

  __enableSentry () {
//     var raven = require('raven')
//
// // The request handler must be the first item
//     this.app.use(raven.middleware.express.requestHandler(this.getServiceConfigVal('sentry')))
//
//     // The error handler must be before any other error middleware
//     this.app.use(raven.middleware.express.errorHandler(this.getServiceConfigVal('sentry')))
  }

  __enableOpbeat () {
    // TODO: Pull in keys from config

    this.app.use(opbeat.middleware.express())
  }

  // __mapController () {
  //   var enrouten = require('express-enrouten')
  //
  //   this.app.use('/api', enrouten({
  //     directory: '../../../controllers'
  //   }))
  // }

  __protectApi () {
    // var tokenValidator = require('../lib/authclient/tokenvalidator')
    // var protectedApi = this.config.get('protectedApi')
    // let validator = tokenValidator.validate(this.config.getGlobal('secret'))
    //
    // if (protectedApi) {
    //   this.app.use(protectedApi, validator)
    // } else {
    //   this.app.use('/api', validator)
    // }
  }

  __enableCors () {
    var cors = require('cors')

    if (this.config.get('cors') === true) {
      this.app.options('*', cors())
      this.app.use(cors())
    }
  }

  // __addLogger () {
  //   var winston = require('winston')
  //   var expressWinston = require('express-winston')
  //
  //   this.app.use(expressWinston.logger({
  //     transports: [
  //       new winston.transports.Console({
  //         json: true,
  //         colorize: true
  //       })
  //     ],
  //     meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  //     msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  //     expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  //     colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  //     ignoreRoute: function (req, res) {
  //       return false
  //     } // optional: allows to skip some log messages based on request and/or response
  //   }))
  // }
}

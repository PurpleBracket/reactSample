import ExpressPlus from '../packages/express-plus/src/index'
import chalk from 'chalk'
import Router from './router'
import opbeat from 'opbeat'

function run () {
  if (process.env.NODE_ENV !== 'test') {
    // global logger isn't registered yet...
    // TODO:
    console.info('Starting Opbeat')

    opbeat.start({
      appId: '86de06fcab',
      organizationId: 'e2942501085d438b86653de8f239a126',
      secretToken: 'da4aeac642aa9778ffdf34718b2ced7dbcd2fc40'
    })
  }

  return new Promise(async (resolve, reject) => {
    let expressPlus = new ExpressPlus()
    // let app = await expressPlus.init('treasure-api', (server, config) => {
    //   //server.generateRestAPI(CompanySchema, ['post', 'get'])
    //   this.router = new Router(server, config);
    //   router.generateRestAPI();
    // })

    let router = new Router()
    let app = await expressPlus.init('treasure-api', router)

    global.app = app

    app.start((err, app) => {
      if (err) {
        global.logger.error(chalk.bgRed.white('FAILED TO START SERVER...' + app.config.get('port')))
        reject(err)
      } else {
        global.logger.info(chalk.bgGreen.white('SERVER STARTED yes...' + app.config.get('port')))
        resolve(app)
      }
    })
  })
}

module.exports = run()

// (async () => {
//   let expressPlus = new ExpressPlus()
//   let app = await expressPlus.init('treasure-api')
//   global.config = app.config
//
//   return app.start(() => {
//     global.logger.log('Server started...' + app.config.get('port'))
//   })
// })()

// TODO: Need this section once we integrate with PM2

// import Config from './config';

// (async () => {
//   // https://stackoverflow.com/questions/30585540/process-send-is-conditionally-defined-in-node-js
//   process.send = process.send || function () {}
//
//   global.config = await Config.createConfig()
//
//   let webserver = new Server()
//
//   process.on('SIGINT', function () {
//     global.logger.info('Processing SIGINT')
//     webserver.stop()
//     process.exit(0)
//   })
//
//   webserver.start(() => {
//     global.logger.log(`Webserver started on port: ${global.config._store.port}!`)
//     process.send('ready')
//   })
// })()

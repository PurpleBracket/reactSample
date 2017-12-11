'use strict'
import mongoose from 'mongoose'
// import Config from '../packages/express-plus/src/config'

var db = function () {
  return {
    config: function (config) {
      return new Promise((resolve, reject) => {
        // let config = await Config.createConfig('config-test')
        // console.log(config)
        var options = {promiseLibrary: global.Promise}
        // mongoose.connect(`mongodb://${conf.user}:${conf.password}@${conf.host}/${conf.database}`, options);

        // Cannot use global logger here
        console.log(config.get('uri', 'mongo'))
        mongoose.connect(config.get('uri', 'mongo'), options)

        var db = mongoose.connection
        db.on('error', (err) => {
          console.error.bind(console, 'connection error:')
          reject(err)
        })

        db.once('open', (err, val) => {
          if (err) {
            reject(err)
          } else {
            // Cannot use global logger here
            console.log('db connection open')
            resolve(val)
          }
        })
      })
    }
  }
}

export default db()

/* global describe test */

describe('Application starts', () => {
  // Disabled as it fails on the port number which might be in use when the dev server is running
  // Also, we need a way to disable opbeat in this case to prevent tests from failing in some cases
  // test('in development environment', done => {
  //   process.env.NODE_ENV = 'development'
  //
  //   try {
  //     let app = require('./index') // eslint-disable-line
  //     app
  //       .then((app) => {
  //         if (app) {
  //           app.stop((err, app) => {
  //             if (err) {
  //               global.logger.error(err)
  //             }
  //           })
  //           done()
  //         }
  //       })
  //       .catch(err => done(err))
  //   }
  //   catch (e) {
  //     console.error(e)
  //     done(e)
  //   }
  // })

  test('in test environment', done => {
    try {
      process.env.NODE_ENV = 'test'

      let app = require('./index') // eslint-disable-line
      app
        .then((app) => {
          if (app) {
            app.stop((err, app) => {
              if (err) {
                global.logger.error(err)
              }
            })
            done()
          }
        })
        .catch(err => done(err))
    } catch (e) {
      done(e)
    }
  })
})

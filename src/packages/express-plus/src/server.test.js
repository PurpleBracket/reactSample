/* global describe test expect beforeAll */
import ExpressPlus from './index'

let app = null

console.log(process.env.NODE_ENV)

beforeAll(async done => {
  let expressPlus = new ExpressPlus()
  app = await expressPlus.init('treasure-api')
  done()
})

describe('Webserver', () => {
  test('can be started', async done => {
    app.start((err, status) => {
      expect(err).toEqual(null)
      expect(status).toEqual(expect.anything())
      done()
    })
  })

  test('can be stopped', async done => {
    app.stop((err, status) => {
      expect(err).toEqual(null)
      expect(status).toEqual(expect.anything())
      done()
    })
  })
})

// import Server from '../server/server'
// import Config from '../server/config'
//
//
// beforeAll(done => {
//   Config.createConfig()
//     .then(config => {
//       global.config = config
//       done()
//     })
// })
//
// describe('Webserver', () => {
//   let webserver = new Server()
//
//   test('can be started', async done => {
//     webserver.start(status => {
//       expect(status).toEqual(expect.anything())
//       done()
//     })
//   })
//
//   test('can be stopped', async done => {
//     webserver.stop(status => {
//       expect(status).toEqual(expect.anything())
//       done()
//     })
//   })
// })

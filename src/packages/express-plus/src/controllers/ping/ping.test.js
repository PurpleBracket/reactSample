/* global describe test expect beforeAll */
import Server from '../../server.js'
import Config from '../../lib/config'
// import '../../../../../tests/setupTests'

const request = require('supertest')

let server = null

beforeAll(async done => {
  console.info('ping test start....')

  let config = await Config.createConfig('config-test')
  server = new Server(config)
  server.init()
  server.start(function () {
    global.logger.log('Server is listening on: http://localhost:' + server.config.get('port'))
    done()
  })
})

describe('Server', () => {
  console.info('in server describe')
  test('responds to ping endpoint', done => {
    request(server.app).get('/api/ping').then((response) => {
      console.log(response)
      expect(response.statusCode).toBe(200)
      done()
    })
  })

  test('can be stopped', async done => {
    server.stop(function () {
      done()
    })
  })
})

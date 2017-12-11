/* global test expect */
import ping from '../../controllers/ping/index'
import express from 'express'
import request from 'supertest'
// require('../../../../../tests/setupTests')

test('ping route can be loaded', done => {
  // console.info(global.logger)
  // global.logger = {
  //   info: function () {
  //
  //   }
  //   // info: jest.fn(),
  //   // log: jest.fn(),
  //   // error: jest.fn()
  // }

  let app = express()

  app.use(ping)

  request(app)
    .get('/')
    .then(response => {
      expect(response.statusCode).toBe(200)
    })
    .then(() => {
      done()
    })
})

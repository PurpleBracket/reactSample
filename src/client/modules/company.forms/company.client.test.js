/* global describe test expect */
import nock from 'nock'
import RestClient from '../../../packages/express-plus/src/data/restclient'

RestClient.__setTestServer('127.0.0.1')
let companyClient = require('./company.client').default

describe('Company Client', () => {
  nock('http://127.0.0.1')
    .post('/api/company')
    .reply(200, {
      status: 'SUCCESS'
    })
  //
  // test('Instantiate', done => {
  //   let client = new CompanyClient()
  //   done()
  // })

  test('Create', () => {
    // expect.assertions(1)
    // let client = new CompanyClient()

    return companyClient.create({}, 123)
      .then(res => {
        expect(res.status).toEqual(200)
        expect(res.body.status).toEqual('SUCCESS')
      })
  })
})

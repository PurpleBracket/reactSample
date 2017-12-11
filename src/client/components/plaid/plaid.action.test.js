/* global describe test expect */
import { createPlaidItem } from './plaid.action'
import nock from 'nock'
import RestClient from '../../../packages/express-plus/src/data/restclient'

// TODO: Make this global
RestClient.__setTestServer('127.0.0.1')

describe('Plaid Item Action', () => {
  test('returns', (done) => {
    nock('http://127.0.0.1')
      .post('/api/plaiditem')
      .reply(200, {
        status: 'SUCCESS'
      })

    createPlaidItem({
      metadata: {
        institution: {
          institution_id: '',
          institution_name: '',
          link_session_id: ''
        }
      },
      companyId: null,
      publicToken: ''
    }, (err, res) => {
      expect(err).toBeNull()
      expect(res.body.status).toEqual('SUCCESS')
      // expect(getCompanyId).toBeCalled()
      done()
    })
  })
})

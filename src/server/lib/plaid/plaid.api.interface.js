import PlaidAccount from '../../models/plaid/plaid.account.schema'
import moment from 'moment'

const plaid = require('plaid')
const config = require('../../../config/client')

const plaidConfig = config[typeof(CONFIG_ENV) === 'undefined' ? 'test' : CONFIG_ENV].plaid  // eslint-disable-line

// TODO: Pull from config
var PLAID_CLIENT_ID = plaidConfig.clientid
var PLAID_SECRET = plaidConfig.secret
var PLAID_PUBLIC_KEY = plaidConfig.publickey
var PLAID_ENV = plaidConfig.env

// https://github.com/request/request/blob/master/README.md#requestoptions-callback
const options = {
  timeout: 10 * 60 * 1000 // 30 minutes
  // agent: 'Patient Agent'
}

class PlaidApiInterface {
  constructor () {
    this.plaidClient = new plaid.Client(
      PLAID_CLIENT_ID,
      PLAID_SECRET,
      PLAID_PUBLIC_KEY,
      plaid.environments[PLAID_ENV],
      options
    )
  }

  getAccessTokenAndItemId (publicToken) {
    return new Promise((resolve, reject) => {
      this.plaidClient.exchangePublicToken(publicToken, (err, res) => {
        if (err != null) {
          // var msg = 'Could not exchange public_token!'
          // console.log(msg + '\n' + err)
          global.logger.error(err)
          return reject(err, res)
        }

        // ITEM_ID = tokenResponse.item_id

        // this.access_token = res.access_token
        // this.itemId = res.item_id
        resolve(res)
      })
    })
  }

  getAccounts (accessToken) {
    return new Promise((resolve, reject) => {
      this.plaidClient.getAccounts(accessToken, (err, res) => {
        global.logger.log(res.accounts)
        if (err) {
          global.logger.error(err)
          return reject(err)
        }

        resolve(res)
      })
    })
  }

  getItem (accessToken) {
    return new Promise((resolve, reject) => {
      // Pull the Item - this includes information about available products,
      // billed products, webhook information, and more.
      this.plaidClient.getItem(accessToken, (err, res) => {
        if (err) {
          global.logger.error(err)
          return reject(err)
        }

        resolve(res)
      })
    })
  }

  getAccessTokenByAccountId (accountId) {
    return new Promise((resolve, reject) => {
      PlaidAccount.getTokenFromAccountId(accountId)
        .then(res => {
          resolve(res.access_token)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getInstitutionById (institutionId) {
    return new Promise((resolve, reject) => {
      // Also pull information about the institution
      this.plaidClient.getInstitutionById(institutionId, function (err, res) {
        if (err) {
          global.logger.error(err)
          return reject(err)
        }

        resolve(res)
      })
    })
  }

  getTransactionsByAccountId (accountId, startDate = moment().subtract(30, 'days').format('YYYY-MM-DD'), endDate = moment().format('YYYY-MM-DD')) {
    return new Promise((resolve, reject) => {
      this.getAccessTokenByAccountId(accountId)
        .then((accessToken) => {
          this.getTransactions(accessToken, startDate, endDate, accountId)
            .then(result => {
              resolve(result)
            })
            .catch(err => {
              global.logger.error(err)
              reject(err)
            })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  getAllTransactions (accessToken, startDate, endDate, accountId) {
    return new Promise((resolve, reject) => {
      // Pull transactions for the Item for the last 30 days
      // var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
      // var endDate = moment().format('YYYY-MM-DD');

      // this.plaidClient.getTransactions(accessToken, startDate, endDate, {
      //   count: 500,
      //   offset: 0, // TODO: manage this
      //   account_ids: [accountId]
      // }, (err, res) => {
      //   if (err) {
      //     global.logger.error(err)
      //     return reject(err)
      //   }
      //
      //   // global.logger.log('pulled ' + transactionsResponse.transactions.length + ' transactions')
      //   resolve(res)
      // })

      // console.log('in get all transactions')

      let results = []
      let offset = 0
      let count = 500

      this.getTransactions(accessToken, startDate, endDate, accountId, offset, count)
        .then(res => {
          results.push(res)

          let totalTransactions = res.total_transactions
          let totalOffsets = Math.ceil(totalTransactions / count)

          if (totalOffsets <= 1) {
            return resolve(results)
          }

          let jobs = []

          for (let offset = 1; offset <= totalOffsets; offset++) {
            jobs.push(new Promise((resolve, reject) => {
              // console.log('in job get transactions for fetching other offsets')
              this.getTransactions(accessToken,
                startDate.format('YYYY-MM-DD'),
                endDate.format('YYYY-MM-DD'),
                accountId,
                offset,
                count)
                .then(res => {
                  resolve(res)
                })
                .catch(err => {
                  console.error(err)
                  resolve([])
                })
            }))
          }

          // console.log('executing all jobs in get all transactions')
          Promise.all(jobs)
            .then(values => {
              resolve(values)
            })
            .catch(err => {
              console.error(err)
              reject(err)
            })
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  }

  getTransactions (accessToken, startDate, endDate, accountId, offset = 0, count = 500) {
    return new Promise((resolve, reject) => {
      this.plaidClient.getTransactions(accessToken, startDate, endDate, {
        count: count,
        offset: offset,
        account_ids: [accountId]
      }, (err, res) => {
        if (err) {
          global.logger.error(err)
          return reject(err)
        }
        // global.logger.log('pulled ' + transactionsResponse.transactions.length + ' transactions')
        resolve(res)
      })
    })
  }
}

export default new PlaidApiInterface()

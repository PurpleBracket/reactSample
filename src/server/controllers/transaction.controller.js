import PlaidClient from '../lib/plaid/plaid.api.interface'
import status from 'http-status-codes'

module.exports = function (app) {
  app.get('/api/transaction', (req, res, next) => {
    PlaidClient.getTransactionsByAccountId(req.query.accountId)
      .then(transactions => {
        res.json(transactions)
      })
      .catch(err => {
        res.status(status.INTERNAL_SERVER_ERROR).json(err)
      })
  })
}

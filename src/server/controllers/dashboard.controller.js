import PlaidAccount from '../models/plaid/plaid.account.schema'
import status from 'http-status-codes'
// import request from 'superagent'
import DashboardFormula from './dashboard.formula'
import moment from 'moment'
import plaidApiInterface from '../lib/plaid/plaid.api.interface'

module.exports = function (app) {
  app.get('/api/dashboard', (req, res, next) => {
    PlaidAccount.find({companyId: req.query.companyId}, (err, docs) => {
      if (err) {
        console.error(err)
        return res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json(err)
      }

      let end = moment()
      let start = end.clone().subtract(1, 'year')

      let jobs = docs.map(d => new Promise((resolve, reject) => {
        console.log('calling get all transactions for ', d)
        plaidApiInterface.getAllTransactions(d.access_token, start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'), d.account_id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            console.error(err)

            resolve([])
          })

        // request
        //   .post(`${global.app.config.get('url', 'plaid')}/transactions/get`)
        //   .send({
        //     'client_id': global.app.config.get('clientid', 'plaid'),
        //     'secret': global.app.config.get('secret', 'plaid'),
        //     'access_token': d.access_token,
        //     'start_date': start.format('YYYY-MM-DD'), // '2017-11-15',
        //     'end_date': end.format('YYYY-MM-DD'), // '2017-12-15',
        //     'options': {
        //       'count': 500,
        //       'offset': 0,
        //       'account_ids': [d.account_id]
        //     }
        //   })
        //   .end((err, res) => {
        //     if (err) {
        //       console.error(err)
        //       // reject(err)
        //
        //       // Do nothing on error so next step can process this
        //       resolve([])
        //     } else {
        //       resolve(res.body)
        //     }
        //   })
      }))

      Promise.all(jobs)
        .then(values => {
          let data = values.filter(d => d.length > 0)

          let result = new DashboardFormula(data, start, end)

          res.json({
            TotalCapital: result.getTotalCapital(),
            AvailableCash: result.getAvailableCash(),
            Treasure: result.getTreasure(),
            TotalOutflow: result.getTotalOutflow(),
            CashFlowChart: result.getCashflowChart()
          })
        })
        .catch(err => {
          console.error(err)
        })
    })
  })
}

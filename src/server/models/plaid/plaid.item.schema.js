import PlaidAccount from './plaid.account.schema'
import plaidInterface from '../../lib/plaid/plaid.api.interface'
// import plaid from '../../../client/components/plaid/plaid'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.Promise = global.Promise

var plaidItemSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  institution_id: {
    type: String
  },

  link_session_id: {
    type: String
  },

  item_id: {
    type: String
  },

  request_id: {
    type: String
  },

  webhook: {
    type: String
  },

  access_token: {
    type: String
  },

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

plaidItemSchema.virtual('publicToken')
  .set(function (val) {
    this.__publicToken = val
  })
  .get(function () {
    return this.__publicToken
  })

plaidItemSchema.pre('save', function (next) {
  let plaidItem = this

  if (!plaidItem.publicToken) {
    return next(new Error('company.publicToken is not specified'))
  }

  plaidInterface.getAccessTokenAndItemId(plaidItem.publicToken)
    .then(function (res) {
      plaidItem.access_token = res.access_token
      plaidItem.item_id = res.item_id
      plaidItem.request_id = res.request_id

      plaidItem.fetchAccounts()
        .then(function () {
          next()
        })
        .catch(err => {
          global.logger.error(err)
        })
    })
    .catch(err => {
      global.logger.error(err)
      next(err)
    })
})

plaidItemSchema.methods.fetchAccounts = function () {
  global.logger.log(this)

  var plaidItem = this

  return new Promise((resolve, reject) => {
    plaidInterface.getAccounts(plaidItem.access_token)
      .then(response => {
        global.logger.log(response)

        if (response.accounts) {
          response.accounts.forEach(async account => {
            account.companyId = plaidItem.companyId
            account.access_token = plaidItem.access_token
            account.item_id = plaidItem.item_id
            account.plaidItemId = plaidItem._id

            let obj = new PlaidAccount(account)
            await obj.save(function (err) {
              if (err) {
                global.logger.error(err)
              }

              resolve()
              // saved!
            })
          })

          // console.info('Calling next in get accounts success response')
          // console.info(next)
          // console.info(arguments)
          //
          // return next()
        } else {
          let itemId = response.item ? response.item.item_id : null
          global.logger.warn(`No accounts found for item: ${itemId}`)
          // return next()
          resolve()
        }
      })
      .catch(err => {
        global.logger.error(err)
        // return next(err)
        reject(err)
      })
  })
}
// plaidItemSchema.pre('save', function (doc) {
//   global.logger.log(this)
//
//   var plaidItem = this
//
//   plaidInterface.getAccounts(plaidItem.access_token)
//     .then(response => {
//       global.logger.log(response)
//
//       if (response.accounts) {
//         response.accounts.forEach(async account => {
//           account.companyId = plaidItem.companyId
//           account.access_token = plaidItem.access_token
//           account.item_id = plaidItem.item_id
//           account.plaidItemId = plaidItem._id
//
//           let obj = new PlaidAccount(account)
//           await obj.save(function (err) {
//             if (err) {
//               global.logger.error(err)
//             }
//
//             // saved!
//           })
//         })
//
//         // console.info('Calling next in get accounts success response')
//         // console.info(next)
//         // console.info(arguments)
//         //
//         // return next()
//       } else {
//         let itemId = response.item ? response.item.item_id : null
//         global.logger.warn(`No accounts found for item: ${itemId}`)
//         // return next()
//       }
//     })
//     .catch(err => {
//       global.logger.error(err)
//       // return next(err)
//     })
// })

export default mongoose.model('plaidItem', plaidItemSchema)

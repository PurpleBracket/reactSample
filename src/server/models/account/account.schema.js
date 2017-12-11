// var ObjectId = require('mongodb').ObjectId

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var plaidInterface = require('../../lib/plaid/plaid.api.interface')

mongoose.Promise = global.Promise

var institutionSchema = new Schema({
  institution_id: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  }
})

var accountSchema = new Schema({

  companyId: {
    type: Schema.Types.ObjectId
  },

  name: {
    type: String,
    required: false
  },

  access_token: {
    type: String
    // required: true
  },

  institution: institutionSchema
})

accountSchema.virtual('publicToken')
  .get(function () {
    return this.__children
  }).set(function (val) {
    this.__children = val
  })

accountSchema.pre('save', function (next) {
  let account = this

  if (!account.publicToken) {
    return next(new Error('company.publicToken is not specified'))
  }

  plaidInterface.getAccessTokenAndItemId(account.publicToken)
      .then(token => {
        account.access_token = token
        next()
      })
      .catch(err => {
        global.logger.error(err)
      })

    // .findOneAndUpdate({_id: ObjectId(company.admin)}, {companies: [ObjectId(company.id)]})
    //   .then((user) => {
    //     global.logger.log(user)
    //     next()
    //   })
    //   .catch((err) => {
    //     next(err)
    //   })
    //
    // // if (err) {
    // //   return next(err)
    // // }
}
)

export default mongoose.model('account', accountSchema)

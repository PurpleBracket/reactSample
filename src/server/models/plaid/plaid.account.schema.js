var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.Promise = global.Promise

var PlaidAccountSchema = new Schema({

  account_id: {
    type: String,
    unique: true
  },

  balances: {
    available: {
      type: Number
    },
    current: {
      type: Number
    },
    limit: {
      type: Number
    }
  },

  mask: {
    type: String
  },

  name: {
    type: String
  },

  official_name: {
    type: String
  },

  subtype: {
    type: String
  },

  type: {
    type: String
  },

  companyId: {
    ref: 'company',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  item_id: {
    type: String,
    required: true
  },

  access_token: {
    type: String,
    required: true
  },

  plaidItemId: {
    ref: 'plaidItem',
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

PlaidAccountSchema.statics.getTokenFromAccountId = function (accountId) {
  return this.findOne({
    account_id: accountId
  }, 'access_token')
}

export default mongoose.model('plaidAccount', PlaidAccountSchema)

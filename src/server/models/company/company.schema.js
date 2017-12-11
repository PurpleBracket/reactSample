var mongoose = require('mongoose')
var Types = mongoose.Schema.Types

module.exports = {
  name: {
    type: String,
    required: true,
    test: 123,
    ignore: 24
  },

  taxId: {
    type: String,
    required: true,
    unique: true
  },

  admin: {
    ref: 'User',
    type: Types.ObjectId
  }
}

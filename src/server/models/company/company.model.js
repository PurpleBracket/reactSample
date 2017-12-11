import UserSchema from '../../../packages/express-plus/src/models/user/userschema'
import CompanySchema from './company.schema'

var ObjectId = require('mongodb').ObjectId

var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.Promise = global.Promise

var companySchema = new Schema(CompanySchema)

companySchema.pre('save', function (next) {
  let company = this
  if (!company.admin) {
    return next(new Error('company.admin is not specified'))
  }

  UserSchema.findOneAndUpdate({_id: ObjectId(company.admin)}, {companies: [ObjectId(company.id)]})
    .then((user) => {
      global.logger.log(user)
      next()
    })
    .catch((err) => {
      next(err)
    })
})

export default mongoose.model('company', companySchema)

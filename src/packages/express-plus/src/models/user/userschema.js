var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema
// mongoose.connect('mongodb://localhost/test', { useMongoClient: true });

mongoose.Promise = global.Promise

var userSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  // roles: [String],

  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  companies: [Schema.Types.ObjectId]

})

userSchema.pre('save', function (next) {
  let user = this

  bcrypt.genSalt(13, function (err, salt) {
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        next(err)
      } else {
        user.password = hash
        next()
      }
    })
  }
  )
})

userSchema.virtual('isUserModel').get(function () {
  return true
})

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, match) => {
    if (err) {
      return cb(err)
    }

    cb(null, match)
  }
  )
}

export default mongoose.model('user', userSchema)

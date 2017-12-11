import Status from 'http-status-codes'
import passport from 'passport'

var jsonParser = require('body-parser').json()
var HttpStatus = require('http-status-codes')
var ObjectId = require('mongodb').ObjectId

const requireAuth = passport.authenticate('jwt', {session: false})

export default class ModelRoute {
  constructor (app) {
    this.app = app
    this.stopwords = ['fields']
  }

  generate (model, actions = ['get', 'post', 'put', 'delete']) {
    for (var item of actions) {
      let options = item

      if (typeof (item) === 'object') {
        if (!item.verb) {
          throw new Error(`Verb not defined: ${item}`)
        }
      } else {
        options = {
          verb: item
        }
      }

      options.route = `/api/${model.modelName}`
      global.logger.info(`Creating ${options.verb} on route ${options.route}`)

      let callback = ''

      switch (options.verb) {
        case 'get':
          callback = this.get(model, options)
          break
        case 'post':
          callback = this.post(model)
          break
        case 'put':
          callback = this.put(model)
          break
        case 'delete':
          callback = this.delete(model)
          break
      }

      this.app[options.verb](options.route,
        requireAuth,
        jsonParser,
        callback
      )
    }
  }

  get (model, options) {
    return (req, res) => {
      try {
        let callback = (err, item) => {
          if (err) {
            return res.json({message: err})
          }

          if (!item) {
            return res.json({message: `${model.modelName} not found`})
          }

          return res.json(item)
        }

        // if (options.getall &&
        //   !(req.params.id || req.query.id || req.query._id)) {
        // let fields = req.params.fields
        // model.find({fields}, callback).select(req.body.fields || req.query.fields)

        if (options.getall) {
          let dynamicQuery = {}

          for (let item in req.query) {
            if (this.stopwords.indexOf(item) < 0) {
              if (item === 'id' || item === '_id') {
                dynamicQuery['_id'] = ObjectId(req.query[item])
              } else {
                dynamicQuery[item] = req.query[item]
              }
            }
          }

          model.find(dynamicQuery, callback).select(req.body.fields || req.query.fields)
        } else {
          model.findOne({_id: ObjectId(req.params.id || req.query.id || req.query._id)}, callback).select(req.body.fields || req.query.fields)
        }
      } catch (e) {
        global.logger.error(e)
        return res.status(HttpStatus.BAD_REQUEST).json({message: e})
      }
    }
  }

  post (model) {
    return (req, res) => {
      try {
        global.logger.info(req.body)

        var item = new model(req.body) // eslint-disable-line
        item.save(function (err, obj) {
          if (err) {
            global.logger.error(err)
            res.status(Status.CONFLICT).json({status: Status.CONFLICT, message: err})
          } else {
            global.logger.log(`${model.modelName} created.`)
            global.logger.log(obj)
            res.json({
              id: obj.id
            })
          }
        })
      } catch (e) {
        return res.status(HttpStatus.BAD_REQUEST).json({message: e})
      }
    }
  }

  put (model) {
    return (req, res) => {
      try {
        var item = new model(req.body) // eslint-disable-line

        item.findByIdAndUpdate(item._id, item, function (err) {
          if (err) {
            global.logger.log(err)
            res.json(Status.CONFLICT, {status: Status.CONFLICT, message: err})
          } else {
            global.logger.log(`${model.modelName} updated.`)

            res.json({message: `${model.modelName} updated.`})
          }
        })
      } catch (e) {
        return res.status(HttpStatus.BAD_REQUEST).json({message: e})
      }
    }
  }

  delete (model) {
    return (req, res) => {
      try {
        model.remove({_id: req.params.id || req.query.id || req.query._id}, (err, item) => {
          if (err) {
            return res.json({message: err})
          }

          if (!item) {
            return res.json({message: `${model.modelName} deleted.`})
          }

          return res.json(item)
        })
      } catch (e) {
        return res.status(HttpStatus.BAD_REQUEST).json({message: e})
      }
    }
  }
}

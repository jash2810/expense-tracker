const mongoose = require('mongoose')
const secret = require('../secret/index')

mongoose.set('debug', true)
mongoose.Promise = global.Promise
mongoose.connect(secret.mongodb.onlineURI)

module.exports.User = require('./user')
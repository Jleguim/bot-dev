const mongoose = require('mongoose')

const config = require('../config')

try {
  mongoose.connect(config.MongoUri)

  require('./User.model')
  require('./Attack.model')

  console.log('Connected to db')
} catch (error) {
  throw error
}

const mongoose = require('mongoose')

const config = require('./config')

try {
  mongoose.connect(config.MongoUri)

  require('./models/User.model')

  console.log('Connected to db')
} catch (error) {
  throw error
}

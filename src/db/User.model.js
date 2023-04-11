const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

var userSchema = new mongoose.Schema({
  snowflake: { type: String, required: true },
  balance: { type: Number, required: true, default: 100 },
  hacking: {
    setup: {
      cpu_speed: { type: Number, required: true, default: 1.0 },
      dual_channel: { type: Boolean, required: true, default: false },
      ethernet: { type: Boolean, required: true, default: false },
      ram_capacity: { type: Number, required: true, default: 2 }
    },
    inventory: [],
    attacks: [{ type: ObjectId, ref: 'Attack' }]
  }
})

var userClass = require('./User.class')
userSchema.loadClass(userClass)

module.exports = mongoose.model('User', userSchema)

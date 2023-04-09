const mongoose = require('mongoose')

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
    inventory: []
  }
})

userSchema.method('getSpeed', async function() {
  const setup = this.hacking.setup
  var speed = 1
  speed += setup.cpu_speed * 0.09
  if (setup.ethernet) speed += 0.2
  if (setup.dual_channel) speed += 0.05
  return speed
})

userSchema.static('findOrCreate', async function(snowflake) {
  var foundUser = await this.findOne({ snowflake })
  if (!foundUser) foundUser = await this.create({ snowflake })
  return foundUser
})

module.exports = mongoose.model('User', userSchema)

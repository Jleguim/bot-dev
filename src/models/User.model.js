const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  snowflake: { type: String, required: true },
  balance: { type: Number, required: true, default: 100 }
})

userSchema.static('findOrCreate', async function(snowflake) {
  var foundUser = await this.findOne({ snowflake })
  if (!foundUser) foundUser = await this.create({ snowflake })
  return foundUser
})

module.exports = mongoose.model('User', userSchema)

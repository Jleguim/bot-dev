const mongoose = require('mongoose')

const AttackTypes = require('../utils/hacking/AttackTypes')

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
    attacks: []
  }
})

const Attack = require('../utils/hacking/Attack')
userSchema.method('mapAttacks', function() {
  const attacksArray = this.hacking.attacks
  const attacks = attacksArray.map(doc => new Attack(doc))
  return attacks
})

userSchema.method('useDefenderItem', function(attackType) {
  const attackInfo = AttackTypes[attackType]
  const validItems = this.hacking.inventory.filter(itemName => attackInfo.defendedBy.includes(itemName))
  const usedItem = validItems[0]
  const usedItemIndex = this.hacking.inventory.indexOf(usedItem)
  this.hacking.inventory.splice(usedItemIndex, 1)
  return usedItem
})

userSchema.method('isAttackableBy', function(attackType) {
  const attackInfo = AttackTypes[attackType]

  const validItems = this.hacking.inventory.filter(itemName => attackInfo.defendedBy.includes(itemName))
  return validItems.length == 0 ? true : false
})

userSchema.method('getSpeed', function() {
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

const AttackTypes = require('../utils/hacking/AttackTypes')

class UserClass {
  appendInventory(item) {
    this.hacking.inventory.push(item)
    return this.save()
  }

  applyModifier(modifier) {
    userDoc[modifier.key] = modifier.value
    return this.save()
  }

  getProtectionItems(attackType) {
    const attackInfo = AttackTypes[attackType]
    const includes = attackInfo.defendedBy.includes
    const validItems = this.hacking.inventory.filter(item => includes(item))
    return validItems
  }

  useProtectionItem(attackType) {
    const validItems = this.getProtectionItems(attackType)
    const usedItem = validItems[0]
    const usedItemIndex = this.hacking.inventory.indexOf(usedItem)
    this.hacking.inventory.splice(usedItemIndex, 1)
    return this.save()
  }

  isProtectedAgainst(attackType) {
    const validItems = this.getProtectionItems(attackType)
    return validItems.length == 0 ? true : false
  }

  getRandomItem() {
    const randomIndex = Math.floor(Math.random() * this.hacking.inventory.length)
    return this.hacking.inventory[randomIndex]
  }

  get setupCost() {
    const setup = this.hacking.setup
    var cost = 40
    cost += setup.cpu_speed * 60
    if (setup.ethernet) cost += 30
    if (setup.dual_channel) cost += 50
    return cost
  }

  get setupSpeed() {
    const setup = this.hacking.setup
    var speed = 1
    speed += setup.cpu_speed * 0.09
    if (setup.ethernet) speed += 0.2
    if (setup.dual_channel) speed += 0.05
    return speed
  }

  appendAttack(attack) {
    this.hacking.attacks.push(attack)
    return this.save()
  }

  hasBalance(amount) {
    return this.balance < amount
  }

  addBalance(amount) {
    this.balance += amount
    return this.save()
  }

  deductBalance(amount) {
    this.balance -= amount
    return this.save()
  }

  static async findOrCreate(snowflake) {
    var foundUser = await this.findOne({ snowflake })
    if (!foundUser) await this.create({ snowflake })
    return foundUser
  }
}

module.exports = UserClass

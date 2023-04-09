const Discord = require('discord.js')
const moment = require('moment')

const AttackTypes = require('./AttackTypes')

class Attack {
  constructor(doc) {
    this.type = doc.type
    this.target = doc.target
    this.startDate = doc.startDate
    this.endDate = doc.endDate
  }

  get randomOutcome() {
    const randomIndex = Math.floor(Math.random() * this.data.outcomes.length)
    return this.data.outcomes[randomIndex]
  }

  get data() {
    return AttackTypes[this.type]
  }

  get parsedData() {
    return `${Discord.userMention(this.target)} ${this.percentage}%\n`
  }

  get percentage() {
    const msDifference = moment(this.endDate).diff(this.startDate, 'milliseconds')
    const difference = moment().diff(this.startDate, 'milliseconds')
    const result = Math.round(difference / msDifference * 100)
    return result > 100 ? 100 : result
  }

  get isComplete() {
    const now = moment()
    return moment(this.endDate).isBefore(now)
  }
}

module.exports = Attack

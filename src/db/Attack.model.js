const Discord = require('discord.js')
const mongoose = require('mongoose')
const moment = require('moment')

const AttackTypes = require('../utils/hacking/AttackTypes')
const ObjectId = mongoose.Types.ObjectId

var attackSchema = new mongoose.Schema({
  targetDoc: { type: ObjectId, required: true, ref: 'User' },
  userDoc: { type: ObjectId, required: true, ref: 'User' },
  type: { type: String, required: true },
  endDate: { type: Date },
  startDate: { type: Date, required: true, default: moment().toDate() }
})

attackSchema.virtual('data').get(function() {
  return AttackTypes[this.type]
})

attackSchema.virtual('randomOutcome').get(function() {
  const randomIndex = Math.floor(Math.random() * this.data.outcomes.length)
  return this.data.outcomes[randomIndex]
})

attackSchema.virtual('parsedData').get(function() {
  return `${Discord.userMention(this.targetDoc.snowflake)} ${this.percentage}%\n`
})

attackSchema.virtual('percentage').get(function() {
  const msDifference = moment(this.endDate).diff(this.startDate, 'milliseconds')
  const difference = moment().diff(this.startDate, 'milliseconds')
  const result = Math.round(difference / msDifference * 100)
  return result > 100 ? 100 : result
})

attackSchema.virtual('isComplete').get(function() {
  const now = moment()
  return moment(this.endDate).isBefore(now)
})

module.exports = mongoose.model('Attack', attackSchema)

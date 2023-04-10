const Discord = require('discord.js')
const mongoose = require('mongoose')
const moment = require('moment')

const Embed = require('../utils/Embed')
const AttackTypes = require('../utils/hacking/AttackTypes')

module.exports.exec = async function(interaction) {
  const attackType = interaction.options.getString('type')
  const target = interaction.options.getUser('user')

  if (interaction.user.id == target.id) {
    // !
    const errorEmbed = new Embed().defColor('Red').defDesc('Why did you just try to attack yourself?')
    interaction.reply({ embeds: [errorEmbed] })
  }

  const targetDoc = await mongoose.models.User.findOrCreate(target.id)
  const userDoc = await mongoose.models.User.findOrCreate(interaction.user.id)

  const attackCost = userDoc.getSetupCost()
  if (userDoc.balance < attackCost) {
    const errorEmbed = new Embed().defColor('Red').defFooter({ text: 'Not enough money to attack' })
    return interaction.reply({ embeds: [errorEmbed] })
  }

  const attackDuration = AttackTypes[attackType].duration / userDoc.getSpeed()
  const attackEndDate = moment().add(attackDuration, 'millisecond').toDate()

  const attack = {
    target: targetDoc.snowflake,
    type: attackType,
    endDate: attackEndDate,
    startDate: moment().toDate()
  }

  userDoc.hacking.attacks.push(attack)
  userDoc.balance -= attackCost
  await userDoc.save()

  const relativeTime = Discord.time(attack.endDate, 'R')
  const attackEmbed = new Embed()
    .defColor('#7830e5')
    .defDesc(`Your attack will be finished ${relativeTime}`)
    .defFooter({ text: `You got charged $${attackCost} for this attack` })
  interaction.reply({ embeds: [attackEmbed] })
}

module.exports.data = new Discord.SlashCommandBuilder()
  .setName('pcattack')
  .setDescription('Attack another user using your pc setup.')
  .addStringOption(option =>
    option
      .setName('type')
      .setDescription('The type of attack')
      .addChoices({ name: 'Virus', value: 'Virus' })
      .setRequired(true)
  )
  .addUserOption(option => option.setName('user').setDescription('The user to attack').setRequired(true))

const Discord = require('discord.js')
const mongoose = require('mongoose')
const moment = require('moment')

const Embed = require('../utils/Embed')

module.exports.exec = async function(interaction) {
  const attackType = interaction.options.getString('type')
  const target = interaction.options.getUser('user')

  if (interaction.user.id == target.id) {
    // !
    const errorEmbed = new Embed().defColor('Red').defDesc('Why did you just try to attack yourself?')
    return interaction.reply({ embeds: [errorEmbed] })
  }

  const targetDoc = await mongoose.models.User.findOrCreate(target.id)
  const userDoc = await mongoose.models.User.findOrCreate(interaction.user.id)

  if (userDoc.hasBalance(userDoc.setupCost)) {
    const errorEmbed = new Embed().defColor('Red').defFooter({ text: 'Not enough money to attack' })
    return interaction.reply({ embeds: [errorEmbed] })
  }

  const attack = await mongoose.models.Attack.create({ type: attackType, targetDoc, userDoc })
  const attackDuration = attack.data.duration / userDoc.setupSpeed

  attack.startDate = moment().toDate()
  attack.endDate = moment().add(attackDuration, 'millisecond').toDate()
  await attack.save()

  await userDoc.appendAttack(attack)
  await userDoc.deductBalance(userDoc.setupCost)

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
      .addChoices({ name: 'Virus', value: 'Virus' }, { name: 'Phishing scam', value: 'Phishing' })
      .setRequired(true)
  )
  .addUserOption(option => option.setName('user').setDescription('The user to attack').setRequired(true))

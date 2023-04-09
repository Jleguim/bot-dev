const Discord = require('discord.js')
const Mongoose = require('mongoose')

const Embed = require('../utils/Embed')

module.exports.exec = async function(interaction) {
  var targetUser = interaction.options.getUser('user')
  if (!targetUser) targetUser = interaction.user

  const targetDoc = await Mongoose.models.User.findOrCreate(targetUser.id)

  const balanceEmbed = new Embed().defColor('#7830e5').defDesc(`LeCoins: ${targetDoc.balance}`)
  interaction.reply({ embeds: [balanceEmbed] })
}

module.exports.data = new Discord.SlashCommandBuilder()
  .setName('balance')
  .setDescription("Check someone's balance")
  .addUserOption(option => option.setName('user').setDescription('The user to check'))

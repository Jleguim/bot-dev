const Discord = require('discord.js')
const mongoose = require('mongoose')

const Embed = require('../utils/Embed')

module.exports.exec = async function(interaction) {
  const userDoc = await mongoose.models.User.findOrCreate(interaction.user.id)
  const userSetup = userDoc.hacking.setup

  const setupEmbed = new Embed()
    .defColor('#7830e5')
    .defFields([
      { up: 'CPU', down: `Clock: ${userSetup.cpu_speed} GHz`, inline: true },
      {
        up: 'RAM',
        down: `Capacity: ${userSetup.ram_capacity} GB\nDualChannel: ${userSetup.dual_channel}`,
        inline: true
      },
      { up: 'Networking', down: `Ethernet: ${userSetup.ethernet}`, inline: true }
    ])
    .defDesc(`Attack cost: $${userDoc.getSetupCost()}`)

  interaction.reply({ embeds: [setupEmbed] })
}

module.exports.data = new Discord.SlashCommandBuilder()
  .setName('pc')
  .setDescription('Check your pc specs')

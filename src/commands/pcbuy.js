const Discord = require('discord.js')
const mongoose = require('mongoose')

const Embed = require('../utils/Embed')
const Parts = require('../utils/hacking/Parts')
const Software = require('../utils/hacking/Software')
const Items = Parts.concat(Software)

module.exports.exec = async function(interaction) {
  const userDoc = await mongoose.models.User.findOrCreate(interaction.user.id)

  const itemId = interaction.options.getNumber('id')
  const wantedItem = Items[itemId]

  if (userDoc.balance < wantedItem.price) {
    const errorEmbed = new Embed().defColor('Red').defFooter({ text: 'Not enough money.' })
    return interaction.reply({ embeds: [errorEmbed] })
  }

  if (wantedItem.hasOwnProperty('modifiers')) {
    wantedItem.modifiers.forEach(modifier => {
      userDoc.hacking.setup[modifier.key] = modifier.value
    })
  } else userDoc.hacking.inventory.push(wantedItem.name)

  await userDoc.save()
  interaction.reply('Part purchased.')
}

module.exports.data = new Discord.SlashCommandBuilder()
  .setName('pcbuy')
  .setDescription('Get hardware and software for your pc.')
  .addNumberOption(option =>
    option.setName('id').setRequired(true).setDescription('Id of the part to buy.')
  )

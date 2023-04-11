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

  if (userDoc.hasBalance(wantedItem.price)) {
    // !
    const errorEmbed = new Embed().defColor('Red').defFooter({ text: 'Not enough money.' })
    return interaction.reply({ embeds: [errorEmbed] })
  }

  if (wantedItem.hasOwnProperty('modifiers')) {
    await Promise.all(wantedItem.modifiers.map(UserDoc.applyModifier))
  } else await userDoc.appendInventory(wantedItem.name)

  const purchaseEmbed = new Embed()
    .defAuthor({
      text: 'PC Shop',
      url:
        'https://media.discordapp.net/attachments/1093040865909407809/1093048807836635196/leguims-closed-mouth.png?width=580&height=580'
    })
    .defColor('#7830e5')
    .defDesc(`You purchased \`${wantedItem.name}\`\n➔ ${wantedItem.desc}`)
  interaction.reply({ embeds: [purchaseEmbed] })
}

module.exports.data = new Discord.SlashCommandBuilder()
  .setName('pcbuy')
  .setDescription('Get hardware and software for your pc.')
  .addNumberOption(option =>
    option.setName('id').setRequired(true).setDescription('Id of the part to buy.')
  )

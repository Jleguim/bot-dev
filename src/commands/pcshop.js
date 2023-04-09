const Discord = require('discord.js')

const Embed = require('../utils/Embed')
const Parts = require('../utils/hacking/Parts')
const Software = require('../utils/hacking/Software')
const Items = Parts.concat(Software)

module.exports.exec = async function(interaction) {
  const shopText = Items.map((item, index) => {
    return `\`${index}\` - ${item.name} \n Price: ${item.price}\n`
  }).join(' ')

  const shopEmbed = new Embed().defColor('#7830e5').defDesc(shopText)

  interaction.reply({ embeds: [shopEmbed] })
}

module.exports.data = new Discord.SlashCommandBuilder()
  .setName('pcshop')
  .setDescription('Get hardware and software for your pc.')

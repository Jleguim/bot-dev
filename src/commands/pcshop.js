const Discord = require('discord.js')

const Embed = require('../utils/Embed')
const Parts = require('../utils/hacking/Parts')
const Software = require('../utils/hacking/Software')
const Items = Parts.concat(Software)

const PagedEmbed = require('../utils/PagedEmbed')

module.exports.exec = async function(interaction) {
  const templateEmbed = new Embed()
    .defAuthor({
      text: 'PC Shop',
      url:
        'https://media.discordapp.net/attachments/1093040865909407809/1093048807836635196/leguims-closed-mouth.png?width=580&height=580'
    })
    .defColor('#7830e5')

  const shopItems = Items.map((item, index) => {
    return `\`id: ${index}\` **|** ${item.name} \n ➔ ${item.desc}\n➔ Price: ${item.price}\n\n`
  })

  const shopEmbed = new PagedEmbed(interaction, shopItems, 4, templateEmbed)
  await shopEmbed.start()
}

module.exports.data = new Discord.SlashCommandBuilder()
  .setName('pcshop')
  .setDescription('Get hardware and software for your pc.')

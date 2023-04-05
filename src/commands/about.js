const Embed = require('../utils/Embed')
const Discord = require('discord.js')

module.exports.exec = async function(interaction) {
  const aboutEmbed = new Embed()
    .defColor('#7830e5')
    .defThumbnail(
      'https://cdn.discordapp.com/attachments/1093040865909407809/1093048807836635196/leguims-closed-mouth.png'
    )
    .defTitle('Testing Enviroment')
    .defDesc('Este bot literalmente solo cumple la funcion de testear cosas, lol.')
    .defField('Desarollado por', '[Jleguim](https://github.com/Jleguim)')

  return interaction.editReply({ embeds: [aboutEmbed] })
}

module.exports.data = new Discord.SlashCommandBuilder()
  .setName('about')
  .setDescription('Find out what this bot is all about.')

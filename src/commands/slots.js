const Embed = require('../utils/Embed')
const Discord = require('discord.js')
const TragaMonedas = require('../utils/TragaMonedas')

var icon =
  'https://cdn.discordapp.com/attachments/1093040865909407809/1093083234058899499/casino-slot-machine-3d-rendering-isometric-icon-png.png'

module.exports.exec = async function(interaction) {
  const slotEmbed = new Embed().defColor('#7830e5').defAuthor({ text: 'Tragamonedas', icon })
  const slot = new TragaMonedas()

  const bet = interaction.options.getNumber('bet')

  slot.eventEmitter.on('display', (topRow, middleRow, bottomRow) => {
    slotEmbed.defDesc(`-${topRow}-\n>${middleRow}<\n-${bottomRow}-`)
    interaction.editReply({ embeds: [slotEmbed] })
  })

  slot.eventEmitter.on('finished', (won, mult) => {
    if (!won) slotEmbed.setColor('Red').defDesc(`You lost $${bet}!\n${slotEmbed.description}`)
    else slotEmbed.setColor('Green').defDesc(`You won $${mult * bet}\n${slotEmbed.description}`)
    interaction.editReply({ embeds: [slotEmbed] })
  })

  slot.play()
}

module.exports.data = new Discord.SlashCommandBuilder()
  .setName('slots')
  .setDescription('Bet on a slot machine.')
  .addNumberOption(option =>
    option
      .setName('bet')
      .setDescription('The amount you want to wager.')
      .setMinValue(100)
      .setRequired(true)
  )

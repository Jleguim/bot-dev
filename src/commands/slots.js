const Embed = require('../utils/Embed')
const Discord = require('discord.js')
const TragaMonedas = require('../utils/TragaMonedas')
const mongoose = require('mongoose')

var icon =
  'https://cdn.discordapp.com/attachments/1093040865909407809/1093083234058899499/casino-slot-machine-3d-rendering-isometric-icon-png.png'

module.exports.exec = async function(interaction) {
  await interaction.deferReply()

  const slotEmbed = new Embed().defColor('#7830e5').defAuthor({ text: 'Tragamonedas', icon })
  const slot = new TragaMonedas()

  const userSnowflake = interaction.user.id
  let userDoc = await mongoose.models.User.findOne({ snowflake: userSnowflake })

  const bet = interaction.options.getNumber('bet')
  if (userDoc.hasBalance(bet)) {
    // !
    const errorEmbed = new Embed().defColor('Red').defFooter({
      text: 'Not enough money to wager.'
    })
    return interaction.editReply({ embeds: [errorEmbed] })
  }

  slot.eventEmitter.on('display', (topRow, middleRow, bottomRow) => {
    slotEmbed.defDesc(`-${topRow}-\n>${middleRow}<\n-${bottomRow}-`)
    interaction.editReply({ embeds: [slotEmbed] })
  })

  slot.eventEmitter.once('finished', async (won, mult) => {
    if (!won) {
      await userDoc.deductBalance(bet)

      slotEmbed.setColor('Red').defDesc(`You lost $${bet}!\n${slotEmbed.description}`)
      return interaction.editReply({ embeds: [slotEmbed] })
    }

    const winnings = Math.floor(mult * bet)
    await userDoc.addBalance(winnings)

    slotEmbed.setColor('Green').defDesc(`You won $${winnings}\n${slotEmbed.description}`)
    return interaction.editReply({ embeds: [slotEmbed] })
  })

  slot.play()
}

module.exports.data = new Discord.SlashCommandBuilder()
  .setName('slots')
  .setDescription('Bet on a slot machine')
  .addNumberOption(option =>
    option
      .setName('bet')
      .setDescription('The amount you want to wager')
      .setMinValue(100)
      .setRequired(true)
  )

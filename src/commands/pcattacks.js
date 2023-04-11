const Discord = require('discord.js')
const mongoose = require('mongoose')

const Embed = require('../utils/Embed')

module.exports.exec = async function(interaction) {
  const userDoc = await mongoose.models.User.findOrCreate(interaction.user.id)
  const attacks = userDoc.hacking.attacks

  await userDoc.populate('hacking.attacks')
  await Promise.all(
    attacks.map(async attack => {
      await attack.populate('targetDoc')
      await attack.populate('userDoc')
    })
  )

  const completedAttacks = attacks.filter(a => a.isComplete)
  const parsedData = attacks.map(a => a.parsedData).join('')

  if (parsedData.length == 0) {
    const errorEmbed = new Embed().defColor('Red').defDesc('There are no attacks in progress')
    return interaction.reply({ embeds: [errorEmbed] })
  }

  const attacksEmbed = new Embed().defColor('#7830e5').defDesc(parsedData)
  const claimBtn = new Discord.ButtonBuilder()
    .setCustomId('claim-btn')
    .setLabel('Claim')
    .setDisabled(completedAttacks.length == 0 ? true : false)
    .setStyle('Primary')
  const row = new Discord.ActionRowBuilder().addComponents(claimBtn)
  interaction.reply({ embeds: [attacksEmbed], components: [row] })

  const filter = inter => inter.customId == 'claim-btn' && inter.user.id == interaction.user.id
  const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 })

  collector.on('collect', async btnInteraction => {
    await btnInteraction.deferReply()
    collector.stop()

    completedAttacks.forEach(async attack => {
      if (!attack.targetDoc.isAttackableBy(attack.type)) {
        attack.targetDoc.useDefenderItem(attack.type)
        await targetDoc.save()

        const failedEmbed = new Embed().defColor('Red').defDesc('Attack failed because of item')
        return btnInteraction.channel.send({ embeds: [failedEmbed] })
      }

      if (Math.random() > attack.data.successRate) {
        const failedEmbed = new Embed().defColor('Red').defDesc('Attack failed')
        return btnInteraction.channel.send({ embeds: [failedEmbed] })
      }

      await mongoose.models.Attack.deleteOne({ _id: attack._id })
      userDoc.hacking.attacks = userDoc.hacking.attacks.filter(a => a._id == attack._id)

      const outcome = attack.randomOutcome
      await outcome.func(interaction, attack)
      await userDoc.save()
    })

    // await userDoc.save()

    btnInteraction.editReply({ content: 'Attacks claimed' })
  })
}

module.exports.data = new Discord.SlashCommandBuilder()
  .setName('pcattacks')
  .setDescription("Check on the attacks you've made.")

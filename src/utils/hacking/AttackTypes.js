const mongoose = require('mongoose')
const moment = require('moment')

const Embed = require('../Embed')

module.exports = {
  Virus: {
    duration: moment.duration(15, 'seconds'),
    successRate: 0.8,
    defendedBy: ['Antivirus'],
    outcomes: [
      {
        name: 'Money',
        func: async function(interaction, attack, userDoc) {
          const targetDoc = await mongoose.models.User.findOrCreate(attack.target)

          if (targetDoc.balance <= 0) {
            const errorEmbed = new Embed()
              .defColor('Red')
              .defDesc('You got access to their wallet but theyre broke')
            interaction.channel.send({ embeds: [errorEmbed], ephemeral: true })
          }

          var max = targetDoc.balance * 0.4
          var min = 1
          var stolenAmount = Math.floor(Math.random() * (max - min + 1) + min)

          userDoc.balance += stolenAmount
          targetDoc.balance -= stolenAmount

          await targetDoc.save()

          const embed = new Embed().defDesc(`You stole ${stolenAmount}`)
          return interaction.channel.send({ embeds: [embed] })
        }
      }
    ]
  }
}

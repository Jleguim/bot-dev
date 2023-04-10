const Embed = require('../Embed')

module.exports = {
  Money: {
    name: 'Money',
    func: async function(interaction, attack) {
      const targetDoc = attack.targetDoc
      const userDoc = attack.userDoc

      if (targetDoc.balance <= 0) {
        const errorEmbed = new Embed()
          .defColor('Red')
          .defDesc('You got access to their wallet but theyre broke')
        return interaction.channel.send({ embeds: [errorEmbed], ephemeral: true })
      }

      var max = targetDoc.balance * 0.2
      var min = 1
      var stolenAmount = Math.floor(Math.random() * (max - min + 1) + min)

      userDoc.balance += stolenAmount
      targetDoc.balance -= stolenAmount

      await targetDoc.save()

      const embed = new Embed().defDesc(`You stole ${stolenAmount}`).defColor('#7830e5')
      return interaction.channel.send({ embeds: [embed] })
    }
  },
  Item: {
    name: 'Item',
    func: async function(interaction, attack) {
      const targetDoc = attack.targetDoc
      const userDoc = attack.userDoc

      if (targetDoc.hacking.inventory.length == 0) {
        const errorEmbed = new Embed()
          .defColor('Red')
          .defDesc('You got access to their inventory but they had nothing')
        return interaction.channel.send({ embeds: [errorEmbed], ephemeral: true })
      }

      const randomItem = targetDoc.getRandomItem()
      userDoc.hacking.inventory.push(randomItem)
      targetDoc.hacking.inventory.splice(randomItem.indexOf(), 1)

      await targetDoc.save()

      const embed = new Embed().defDesc(`You stole ${randomItem}`).defColor('#7830e5')
      return interaction.channel.send({ embeds: [embed] })
    }
  }
}

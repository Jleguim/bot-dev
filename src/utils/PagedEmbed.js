const Discord = require('discord.js')
const Embed = require('./Embed')

class PagedEmbed {
  constructor(interaction, items, itemsPerPage = 4, embed = new Embed().defColor('#7830e5')) {
    this.items = items
    this.embed = embed

    this.interaction = interaction
    this.message = undefined

    this.currentPage = 0
    this.itemsPerPage = itemsPerPage
    this.possiblePages = Math.ceil(this.items.length / this.itemsPerPage)
  }

  getComponents() {
    const nextBtn = new Discord.ButtonBuilder()
      .setCustomId('next-btn')
      .setLabel('Next page')
      .setDisabled(this.possiblePages - 1 == this.currentPage ? true : false)
      .setStyle('Primary')

    const prevBtn = new Discord.ButtonBuilder()
      .setCustomId('prev-btn')
      .setLabel('Previous page')
      .setDisabled(this.currentPage == 0 ? true : false)
      .setStyle('Primary')

    const row = new Discord.ActionRowBuilder().addComponents(prevBtn, nextBtn)
    return row
  }

  getEmbed() {
    const firstItem = this.currentPage * this.itemsPerPage
    const lastItem = firstItem + this.itemsPerPage
    const myItems = this.items.slice(firstItem, lastItem)
    this.embed.defDesc(myItems.join(''))
    return this.embed
  }

  async start() {
    this.message = await this.interaction.reply({
      embeds: [this.getEmbed()],
      components: [this.getComponents()]
    })

    const filter = inter =>
      inter.user.id == this.interaction.user.id && ['next-btn', 'prev-btn'].includes(inter.customId)
    const options = { filter, time: 10 * 60 * 1000 }
    const collector = this.interaction.channel.createMessageComponentCollector(options)

    collector.on('collect', async interaction => {
      if (interaction.customId == 'next-btn') this.currentPage += 1
      else this.currentPage -= 1

      await interaction.update({
        embeds: [this.getEmbed()],
        components: [this.getComponents()]
      })
    })
  }
}

module.exports = PagedEmbed

const Discord = require('discord.js')

class Embed extends Discord.EmbedBuilder {
  /**
   * En caso de que Discord.JS se ponga chistoso y cambie por decimocuarta vez la forma de hacer embeds.
   */
  constructor(options) {
    if (options instanceof Discord.Embed) return super(options.data)
    else super()
    // if (options) this.#setup(options)
  }

  defAuthor({ text, icon = null, url = null, title = false }) {
    title
      ? this.setTitle(text)
      : this.setAuthor({ name: text, iconURL: icon, url })

    return this
  }

  defTitle(text) {
    this.setTitle(text)

    return this
  }

  /**
   * @returns {this}
   */
  defDesc(desc = ' ') {
    if (!desc >= 1)
      return console.error('🔴 NO SE CAMBIÓ LA DESCRIPCIÓN, ESTÁ VACÍA')
    this.setDescription(desc)
    this.description = desc
    return this
  }

  defColor(color) {
    this.setColor(color)
    return this
  }

  defField(up, down, inline = false) {
    this.addFields([{ name: up, value: down, inline }])
    return this
  }

  defFields(fields = [{ up, down, inline }]) {
    if (fields.length == 0) return console.error('⚠️ BAD ARRAY OF FIELDS')
    this.data.fields = []

    fields.forEach(field => {
      this.defField(field.up, field.down, field.inline)
    })

    return this
  }

  defFooter({ text, icon = null, timestamp = null }) {
    if (timestamp) {
      try {
        this.setTimestamp(timestamp)
      } catch (e) {
        //console.log(`⚠️ El timestamp %s no fue válido`, timestamp)
        this.setTimestamp()
      }
    }

    if (text) {
      this.setFooter({ text, iconURL: icon })
    } else {
      console.log(
        '⚠️ EMBED no tiene TEXT. Icon: %s, Timestamp: %s',
        icon,
        timestamp
      )
      //console.log(this)
    }
    return this
  }

  defThumbnail(url) {
    this.setThumbnail(url)
    return this
  }

  raw() {
    return this.data
  }
}

module.exports = Embed

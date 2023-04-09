require('dotenv').config()

const Discord = require('discord.js')
const path = require('path')

const MyIntents = new Discord.IntentsBitField()
const Flags = Discord.IntentsBitField.Flags
MyIntents.add(Flags.Guilds)

module.exports = {
  Mode: 'dev',
  CommandDir: path.join(__dirname, '/commands/'),
  Intents: MyIntents,

  Token: process.env.DISCORD_BOT_TOKEN,
  ClientID: process.env.DISCORD_CLIENT_ID,
  DevGuildID: process.env.DISCORD_DEV_GUILD_ID,

  MongoUri: process.env.MONGO_URI
}

const Discord = require('discord.js')
const CommandRouter = require('./commandRouter')

const config = require('./config')
const client = new Discord.Client({ intents: [config.Intents] })

if (process.argv[2] == '-r') CommandRouter.registerCommands()
client.on('interactionCreate', CommandRouter.handleInteractions)

client.login(config.Token)
client.once('ready', () => {
  console.log('Hello world!')
  require('./server')
})

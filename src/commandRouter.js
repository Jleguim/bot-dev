const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')

const config = require('./config')

const slashCommands = new Map()
const parsedCommandData = []
const commandFiles = fs.readdirSync(config.CommandDir)

for (const file of commandFiles) {
  const commandPath = path.join(config.CommandDir, file)
  const command = require(commandPath)
  slashCommands.set(command.data.name, command)
  parsedCommandData.push(command.data.toJSON())
}

async function registerCommands() {
  const rest = new Discord.REST({ version: '10' }).setToken(config.Token)
  const globalRoute = Discord.Routes.applicationCommands(config.ClientID)
  const privateRoute = Discord.Routes.applicationGuildCommands(config.ClientID, config.DevGuildID)
  const route = config.Mode == 'dev' ? privateRoute : globalRoute
  await rest.put(route, { body: parsedCommandData })
}

async function handleInteractions(interaction) {
  if (!interaction.isCommand()) return
  if (!slashCommands.has(interaction.commandName)) return

  var command = slashCommands.get(interaction.commandName)

  try {
    command.exec(interaction)
  } catch (error) {
    await interaction.reply('There was an error')
    console.error(error)
  }
}

module.exports = {
  registerCommands,
  parsedCommandData,
  handleInteractions
}

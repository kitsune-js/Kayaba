import { PresenceUpdateStatus } from 'discord-api-types';
import { Client } from 'higa';
require("dotenv").config()

const client = new Client(
  process.env.DISCORD,
  [
    'GUILD_MESSAGES',
    'DIRECT_MESSAGES'
  ]
)

client.on('READY', () => {
  console.log("Connected !")
  client.setStatus(
    {
      status: PresenceUpdateStatus.Idle,
      activities: [
        {
          name: "the world of Swort Art Online falling appart",
          type: 3
        }
      ],
      since: null,
      afk: false
    }
  )
})

// quick command handler to test features
client.on("MESSAGE_CREATE", async message => {
  if (message.author.bot) return
  const [cmd, ...args] = message.content.split(" ")
  switch (cmd) {
    case "!ping":
      client.channel.createMessage(message.channel_id, {
        content: "Pong ! 🏓",
        message_reference: {
          message_id: message.id
        }
      })
      break
    case "!say":
      client.channel.deleteMessage(message.channel_id, message.id)
      client.channel.createMessage(message.channel_id, {
        content: args.join(" ")
      })
      break
  }
}) 
import { Client } from 'higa';
require("dotenv").config()

const client = new Client(
  {
    token: process.env.DISCORD ?? "",
    tokenType: "Bot",
    intents: [
      'GUILD_MESSAGES',
      'DIRECT_MESSAGES'
    ],
  }
)

client.on('READY', () => {
  console.log("Connected !")
  client.setStatus(
    {
      // @ts-ignore That's just stupid, I will write my own version of DAT
      status: "idle",
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

// Create a quick command handler using a switch statement, prefix is !
client.on('MESSAGE_CREATE', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!")) return;

  // Split the message into a command and a string
  const args = message.content.slice(1).split(/ +/);
  const command = args.shift()?.toLowerCase();

  switch (command) {
    case "ping":
      client.channel.createMessage(message.channel_id, {
        content: "Pong !"
      })
      break;
    case "say":
      client.channel.deleteMessage(message.channel_id, message.id)
      client.channel.createMessage(message.channel_id, {
        content: args.join(" ")
      })
      break;
  }
})
const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "help",
    description: "message count",

    async run (client, message, args){


        message.channel.send({embed: {
            color: '#2C2F33',
            description: `${client.user.username}'s Commands`,
            title: `**${client.user.username}'s v.1.0 help list**`,
            thumbnail: client.user.displayAvatarURL(),
            fields: [
              { name: "Messages", value: "\`\`\`msg count\nmsg count global\nmsg count channel\nmsg rank\`\`\`", inline: true},
              { name: "Leaderboard", value: "\`\`\`msg leaderboard\nmsg lb global\nmsg lb channel\nmsg lb bot\`\`\`", inline: true},
              { name: "General", value: "\`\`\`msg reset\nmsg info\nmsg invite\nmsg stats\`\`\`", inline: true}
            ]
          }
        });

    
    }
}
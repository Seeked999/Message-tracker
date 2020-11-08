const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "count",
    description: "message count",

    async run (client, message, args){

        if(args[0] === 'global' || 'channel') return


        const user = message.mentions.users.first() || message.author

        const count = db.get(`messages_${user.id}_${message.guild.id}`) || 0

        const embed = new Discord.MessageEmbed()
        .setDescription(`${user.username} has sent **${count}** messages in this server`)
        .setColor("#2C2F33")
        .setAuthor(`${user.username}'s Message Count`, `${user.displayAvatarURL()}`)

        message.channel.send(embed)

    
    }
}
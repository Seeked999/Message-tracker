const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "reset",
    aliases: "remove",
    description: "",

    async run (client, message, args){
 
        if(!message.member.hasPermission("ADMINISTATOR")) return message.channel.send('You are missing the `ADMINISTRATOR` permission')

        db.all().filter(d => d.ID.startsWith(`cmessages_${message.author.id}_${message.channel.id}`)).forEach(d => db.delete(d.ID))

        db.all().filter(d => d.ID.startsWith(`gmessages_${message.author.id}`)).forEach(d => db.delete(d.ID))

        db.all().filter(d => d.ID.startsWith(`messages_${message.author.id}_${message.guild.id}`)).forEach(d => db.delete(d.ID))

        db.all().filter(d => d.ID.startsWith(`msgs_${message.author.id}_${message.guild.id}`)).forEach(d => db.delete(d.ID))

        message.channel.send(`The database was deleted by ${message.author} **This has been sent to the owner**`)


        message.guild.owner.send(`<@${message.author.id}> deleted the database in ${message.guild.name} *this message is just a confirmation*`)

    }
}
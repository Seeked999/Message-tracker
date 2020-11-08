const db = require('quick.db')
const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    name: "invite",
    description: "message count",

    async run (client, message, args){

        message.channel.send(`Hi, my name is **${client.user.username}** i'm a clone of **MsgTracker**(edited a bit)\n i was made by **${config.owner}** You can add me with the link below\n\nInvite **me** :link: ** https://discord.com/api/oauth2/authorize?client_id=770961200748953642&permissions=8&scope=bot ** :link:\nInvite **MsgTracker** :link: **https://msgtracker.tk/invite** :link:`)

    
    }
}
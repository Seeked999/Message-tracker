const db = require('quick.db')
const Discord = require('discord.js')
const os = require('os')
const cpuStat = require("cpu-stat");
const moment = require("moment") 

module.exports = {
    name: "snipe",
    description: "message count",

    async run (client, message, args){

        const msg = db.get(`snipemsg_${message.channel.id}`)

        const nomsg = new Discord.MessageEmbed()
        .setColor("#2C2F33")
        .setDescription('There is nothing to snipe')

        if(!msg) return message.channel.send(nomsg)


        const sent = db.get(`snipesender_${message.channel.id}`)

        const avatar = db.get(`avatar_${message.channel.id}`)
        const user = db.get(`user_${message.channel.id}`)

        const embed = new Discord.MessageEmbed()
        .setAuthor(`${user.username}`, avatar)
        .setColor("#2C2F33")
        .setDescription(msg)

        message.channel.send(embed)

    }
}
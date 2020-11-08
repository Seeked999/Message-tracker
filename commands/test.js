const db = require('quick.db')
const Discord = require('discord.js')
const os = require('os')
const cpuStat = require("cpu-stat");
const moment = require("moment") 

module.exports = {
    name: "test",
    description: "message count",

    async run (client, message, args){


        const user = db.get(`user_${message.channel.id}`)

        console.log(user)

    
    }
}
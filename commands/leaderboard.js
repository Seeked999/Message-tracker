const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: "leaderboard",
    aliases: "lb",
    description: "message count",

    async run (client, message, args){
        
        let msgs = db.all().filter(data => data.ID.startsWith(`messages`)).sort((a, b) => b.data - a.data)
        msgs.length = 10;
        var content = "";
        var i = 0;
        let indexnum = 0;

        let userid = await client.users.cache.get(msgs[i].ID.split("_")[1])

        let user = userid.tag
        let Messages = msgs[i].data.toLocaleString()
        let num = ++indexnum

        content += `${num}. ${user} - ${Messages}\n`

        const embed = new Discord.MessageEmbed()
        .setTitle(`**${message.guild.name}'s Leaderboard**`)
        .setDescription(`\`\`\`${content}\n\`\`\``)
        .setColor("#2C2F33")
        message.channel.send(embed)

    }
}
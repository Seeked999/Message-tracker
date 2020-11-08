const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const db = require('quick.db');
const ms = require('ms');
const fs = require('fs')
const chalk = require('chalk')
const prefix = config.prefix

const { readdirSync } = require('fs');

const { join } = require('path');

client.commands= new Discord.Collection();

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

client.on('ready', () => {

    console.log(chalk.green(`${client.user.tag} is alive`))
    
})

client.on('error', error => {
    console.log(chalk.red(error))
})

client.on("message", async message => {

    if(message.author.bot) db.add(`msgs_${message.author.id}_${message.guild.id}`, 1)

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    db.add(`messages_${message.author.id}_${message.guild.id}`, 1)

    db.add(`gmessages_${message.author.id}`, 1)

    
    db.add(`cmessages_${message.author.id}_${message.channel.id}`, 1)

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})


client.on('message', async message => {
    if(message.content === prefix + 'count global') {

    if (message.author.bot) return;
    

    var home = 'trash'

    const user = message.mentions.users.first() || message.author

    const count = db.get(`gmessages_${user.id}`) || 0

    const embed = new Discord.MessageEmbed()
    .setDescription(`${user.username} has sent **${count}** messages in Discord`)
    .setColor("#2C2F33")
    .setAuthor(`${user.username}'s Global Message Count`, `${user.displayAvatarURL()}`)

    message.channel.send(embed)
    }
})

client.on('message', async message => {
    if(message.content === prefix + 'count channel') {

    if (message.author.bot) return;
    

    var home = 'trash'

    const user = message.mentions.users.first() || message.author

    const count = db.get(`cmessages_${user.id}_${message.channel.id}`) || 0

    const embed = new Discord.MessageEmbed()
    .setDescription(`${user.username} has sent **${count}** messages in ${message.channel.name}`)
    .setColor("#2C2F33")
    .setAuthor(`${user.username}'s Global Message Count`, `${user.displayAvatarURL()}`)

    message.channel.send(embed)
    }
})

client.on('message', async message => { 
    if(message.content === prefix + 'lb global') {


        if (message.author.bot) return;

        var home = 'trash'

        let msgs = db.all().filter(data => data.ID.startsWith(`gmessages`)).sort((a, b) => b.data - a.data)
        msgs.length = 10;
        var content = "";
        var i = 0;
        let indexnum = 0;

        let channel = await client.users.cache.get(msgs[i].ID.split("_")[1])

        let chnl = channel.tag
        let Messages = msgs[i].data.toLocaleString()
        let num = ++indexnum

        content += `${num}. ${chnl} - ${Messages}\n`

        const embed = new Discord.MessageEmbed()
        .setTitle(`**Global Leaderboard**`)
        .setDescription(`\`\`\`${content}\n\`\`\``)
        .setColor("#2C2F33")
        message.channel.send(embed)
    }

})

client.on('message', async message => { 
    if(message.content === prefix + 'lb channel') {


        if (message.author.bot) return;

        var home = 'trash'

        let msgs = db.all().filter(data => data.ID.startsWith(`gmessages`)).sort((a, b) => b.data - a.data)
        msgs.length = 10;
        var content = "";
        var i = 0;
        let indexnum = 0;

        let channel = await client.users.cache.get(msgs[i].ID.split("_")[1])

        let chnl = channel.tag
        let Messages = msgs[i].data.toLocaleString()
        let num = ++indexnum

        content += `${num}. ${chnl} - ${Messages}\n`

        const embed = new Discord.MessageEmbed()
        .setTitle(`**${message.channel.name}'s Leaderboard**`)
        .setDescription(`\`\`\`${content}\n\`\`\``)
        .setColor("#2C2F33")
        message.channel.send(embed)
    }
})

client.on('message', async message => { 
    if(message.content === prefix + 'lb bot') {


        if (message.author.bot) return;

        var home = 'trash'

        let msgs = db.all().filter(data => data.ID.startsWith(`msgs`)).sort((a, b) => b.data - a.data)
        msgs.length = 10;
        var content = "";
        var i = 0;
        let indexnum = 0;

        let channel = await client.users.cache.get(msgs[i].ID.split("_")[1])

        let chnl = channel.tag
        let Messages = msgs[i].data.toLocaleString()
        let num = ++indexnum

        content += `${num}. ${chnl} - ${Messages}\n`

        const embed = new Discord.MessageEmbed()
        .setTitle(`**Bot's Total Messages Leaderboard**`)
        .setDescription(`\`\`\`${content}\n\`\`\``)
        .setColor("#2C2F33")
        message.channel.send(embed)
    }
})

client.on('messageDelete', async (message) => {
    db.set(`snipemsg_${message.channel.id}`, message.content)
    db.set(`snipesender_${message.channel.id}`, message.author.id)
    db.set(`avatar_${message.channel.id}`, message.author.displayAvatarURL())
    db.set(`user_${message.channel.id}`, message.author)
})


client.login(config.token)
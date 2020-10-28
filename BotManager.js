const Discord = require("discord.js");
const colors = require("colors");
const figlet = require('figlet');
const fs = require ('fs');
const { prefix, token, name } = require('./config/config.json');
class BotManager {

	constructor() {
        this.client = new Discord.Client();
    }

    start() {
		this.client.login(token);
        this.client.on('ready', this.botReady.bind(this))
        this.client.on('guildMemberAdd', this.botGuildMemberAdd.bind(this));
        this.client.on('guildMemberRemove', this.botGuildMemberRemove.bind(this));
        this.client.on('message', this.botMessage.bind(this));
        this.client.on('messageReactionAdd', this.botMessageReactionAdd.bind(this));
        this.client.on('messageReactionRemove', this.botMessageReactionRemove.bind(this));
        
        figlet.text(`[BOT] ${name}`, function(err, data){
            if (err)
            {
                console.log(`[BOT] ${name}`.red + ' Error');
                console.dir(err);
                return;
            }
            console.log(data.red + "\n");
        });
    }

    botReady() {
            console.log(`[BOT] ${name}`.blue + ` Discord => ` + `En ligne`.blue);
            this.client.user.setActivity("la liste des commandes avec " + prefix + "commands", { type: 'WATCHING' });
            this.client.guilds.cache.get('ID DU SERVER DISCORD').channels.cache.get('ID DU CHANNEL POUR LA REACTION DES MESSAGES').messages.fetch('ID DU MESSAGE POUR LA REACTION');
    }

    botGuildMemberAdd(member)
    {
        const channel = this.client.channels.cache.get("ID DU CHANNEL");
        channel.send(`Nous souhaitons la bienvenue à ${member} sur le serveur Discord de ${member} !`);
    }
	
    botGuildMemberRemove(member)
    {
        const channel = this.client.channels.cache.get("ID DU CHANNEL");
        channel.send(`${member} vient de quitter le serveur!`);
    }

    botMessageReactionAdd(reaction, user)
    {
        if (reaction.message.id === "ID DU MESSAGE") {
            if (reaction.emoji.id === "ID DE L'EMOJI") {
                var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
                member.roles.add("ID DU RÔLE")
                .then(member => console.log("Le rôle a été ajouté avec succès à " + member.displayName))
                .catch(error => console.log(error));
                member.roles.remove("ID DU RÔLE")
                .then(member => console.log("Le rôle a été supprimé avec succès à " + member.displayName))
                .catch(error => console.log(error));
            }
        }    
    }

    botMessageReactionRemove(reaction, user)
    {
        if (reaction.message.id === "ID DU MESSAGE") {
            if (reaction.emoji.id === "ID DE L'EMOJI") {
                var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
                member.roles.remove("ID DU RÔLE")
                .then(member => console.log("Le rôle a été supprimé avec succès à " + member.displayName))
                .catch(error => console.log(error));
                member.roles.add("ID DU RÔLE")
                .then(member => console.log("Le rôle a été ajouté avec succès à " + member.displayName))
                .catch(error => console.log(error));
            }
        }    
    }

    botCommands() {
        this.client.commands = new Discord.Collection();

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            this.client.commands.set(command.name, command);
        }
    }

    botMessage(message) {
        this.botCommands();
        if (!message.content.startsWith(prefix) || message.author.bot) 
        return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = this.client.commands.get(commandName) || this.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command)
            return;

        if (command.args && !args.length) {
            let reply = `Ton message ne contient pas d'argument, ${message.author}!`;
            if (command.usage) {
                reply += `\nExemple: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
        }

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Une erreur s\'est produite lors de l\'exécution de la commande');
        }
	}
}
module.exports = BotManager;
const { prefix } = require('../config/config.json');
module.exports = {
	name: 'commands',
	description: 'Permet d\'afficher la liste des commandes.',
	aliases: ['help', 'commandes'],
	execute(message, args) {
        var result = "";
        const { commands } = message.client;
        result = result + (commands.map(command => prefix + command.name + ": " + command.description).join('\n'));
        message.channel.send({embed: {
            color: 3447003,
            title: "Voici la liste des commandes",
            description: (result)
        }});
	},
};
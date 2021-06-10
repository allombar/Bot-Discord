module.exports = {
	name: "clear",
	description: "Permet de clear le chat",
	execute(message, args) {
		if (!(message.member.roles.cache.has("ID DU RÔLE")))
			return message.reply("Tu n'as pas la permission d'utiliser cette commande");
		if (parseInt(args[0]) >= 99)
			return message.reply("Le nombre de message supprimable maximal s'élève à 99 messages");
		if (args > 0)
		{	
			var number = parseInt(args[0]) + 1;
			message.channel.bulkDelete(number)
			  .then(message)
			  .catch(console.error);
		}
		else 
			return message.channel.send(prefix + "clear [nombre]");
	},
};


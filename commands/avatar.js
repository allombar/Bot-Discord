module.exports = {
	name: 'avatar',
	description: 'Permet d\'afficher l\'avatar d\'un utilisateur.',
	execute(message, args) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Ton avatar est: ${message.author.displayAvatarURL({ format:"png" , dynamic: true})}?size=4096`);
        }
    
        const avatarList = message.mentions.users.map(user => {
            return `L'avatar de ${user.username} est: ${user.displayAvatarURL({ format:"png", dynamic: true })}?size=4096`;
        });
        message.channel.send(avatarList);
	},
};
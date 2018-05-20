const oneLine = require('common-tags').oneLine;
const Command = require('../base');
const Discord = require('discord.js');

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: 'ping',
			description: 'Botun pingini gösterir.',
			throttling: {
				usages: 1,
				duration: 10
			}
		});
	}

	async run(msg) {
		if(!msg.editable) {
			const pingMsg = await msg.reply('Hesaplanıyor...');
			let edit = pingMsg.editedTimestamp - msg.createdTimestamp;
			const embed = new Discord.RichEmbed()
			.setColor('RANDOM')
			.setDescription(oneLine`
				:ping_pong: Mesaj gecikmesi: ${edit / 100}s.
				${this.client.ping ? `Normal gecikme: ${this.client.ping / 100}s.` : ''}
			`);
			
			return pingMsg.edit(msg.channel.type !== 'dm' ? `${msg.author},` : '', { embed });
		} else {
			await msg.edit('Hesaplanıyor...');
			let edit = msg.editedTimestamp - msg.createdTimestamp;
			const embed = new Discord.RichEmbed()
			.setColor('RANDOM')
			.setDescription(oneLine`
				:ping_pong: Mesaj gecikmesi: ${edit / 100}s.
				${this.client.ping ? `Normal gecikme: ${this.client.ping / 100}s.` : ''}
			`);
			
			return msg.edit({ embed });
		}
	}
};

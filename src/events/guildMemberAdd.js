module.exports = {
	name: "guildMemberAdd",
	async execute(member) {
		await member.send(`Welcome to Xtreme Server\nPlease fill the form below\nhttps://airtable.com/shrGVUdvl5DcYjTxw?prefill_ID=${member.id}`);
	},
};
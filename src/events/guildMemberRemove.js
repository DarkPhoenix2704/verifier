const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API }).base("appyvgarul3TRSv43");

module.exports = {
	name: "guildMemberRemove",
	async execute(member) {
		base("Discord Users").select({
			view: "All Discord Users",
			filterByFormula: `ID = "${member.id}"`,
		}).eachPage((records) => {
			records.forEach((record) => {
				base("Discord Users").destroy(record.id, (err) => console.log(err));
			});
		}, (err) => console.log(err));
	},
};
const Airtable = require("airtable");
const cron = require("node-cron");
const { limiter } = require("../connector");
const utils = require("../utils/utils");

const base = new Airtable({ apiKey: process.env.AIRTABLE_API }).base("appyvgarul3TRSv43");

module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		const myGuild = client.guilds.cache.get("907662464961892414");
		cron.schedule("*/5 * * * *", () => {
			limiter.schedule(() => {
				base("Discord Users").select({
					view:"UpdatePending",
				}).eachPage(async (records, fetchNextPage) => {
					await records.forEach(async (record) => {
						const userId = record.get("ID");
						const name = record.get("Name");
						const roles = record.get("Roles");
						console.log(roles);
						const user = await (await myGuild.members.fetch()).get(userId);
						user.setNickname(name);
						roles.forEach((role) => {
							user.roles.add(utils.getRoleId(role));
						});
						limiter.schedule(() => {

							base("Discord Users").update(record.getId(),
								{
									"update":false,
								});
						});
					});
					fetchNextPage();
				}, (err) => console.log(err));
			});
		});
	},
};
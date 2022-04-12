const ROLE_ID = [
	{ name:"Member", id:"963335094867734608" },
	{ name:"DisCoordinator", id:"963337248651214898" },
];
const getRoleId = (name) => {
	return ROLE_ID.filter((value) => {
		return value.name === name;
	})[0].id;
};

module.exports = { getRoleId };
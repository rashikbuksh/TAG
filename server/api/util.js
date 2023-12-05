const read = [
	{
		uri: "/util/getUtil",
		query: `SELECT id, label, value FROM util`,
	},
	{
		uri: "/util/getUtil/:label",
		query: `SELECT id, label, value FROM util WHERE label = ?`,
		param: ["label"],
	},
];

const change = [
	{
		uri: "/util/updateUtil/:id",
		query: `UPDATE util SET value = ? WHERE id = ?`,
		body: ["value"],
		param: ["id"],
		msg: "id",
	},
];

// Export modules
module.exports = Object.freeze({
	read,
	change,
});

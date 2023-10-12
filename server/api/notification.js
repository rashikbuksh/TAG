const add = [
	{
		uri: "/notification/addnotification",
		query: `INSERT INTO notification (notification_content, notification_time, not_from, not_to, status) VALUES (?, ?, ?, ?, ?)`,
		body: [
			"notification_content",
			"notification_time",
			"not_from",
			"not_to",
			"status",
		],
		msg: "not_from",
	},
];
const read = [
	{
		uri: "/notification/getnotification/:userid/:user_id",
		query: `SELECT * FROM notification WHERE not_from = ? OR not_to= ? ORDER BY notification_time desc`,
		param: ["userid", "user_id"],
		msg: "id",
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
});

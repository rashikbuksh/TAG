const add = [
	{
		uri: "/notification/addnotification",
		query: `INSERT INTO notification (notification_content , notification_time , unread, ordered_product, not_from, not_to) VALUES (?, ?, ?, ?, ?, ?)`,
		body: [
			"notification_content",
			"notification_time",
			"unread",
			"ordered_product",
			"ordered_from",
			"ordered_by",
		],
		msg: "ordered_by",
	},
];
const read = [
	{
		uri: "/notification/getnotification/:userid(*)",
		query: `SELECT * FROM notification WHERE not_from = ? ORDER BY notification_time desc`,
		param: ["userid"],
		msg: "id",
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
});

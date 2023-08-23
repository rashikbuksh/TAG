const add = [
	{
		uri: "/notification/addnotification",
		query: `INSERT INTO notification (notification_content , notification_time , unread, ordered_product, ordered_from, ordered_by) VALUES (?, ?, ?, ?, ?, ?)`,
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
		uri: "/notification/getnotification",
		query: `SELECT * FROM notification ORDER BY notification_time desc`,
		msg: "news",
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
});

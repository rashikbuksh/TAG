const change = [
	{
		uri: "/profile/edit_refer_status/:id",
		query: `UPDATE customer_profile SET refer_status = ? WHERE id = ?`,
		body: ["refer_status"],
		param: ["id"],
		msg: "id",
	  },
];

const add = [
	{
		uri: "/add_refer",
		query: `INSERT INTO refer (referred_by, referred_to) VALUES (?, ?)`,
		body: [
			"referred_by",
			"referred_to"

		],
		msg: "id",
	},
];

const read = [
	{
		uri: "/profile/check_refer_status/:id",
		query: `SELECT refer_status FROM customer_profile WHERE id = ?`,
		param: ["id"],
		msg: "id",
	  },
	{
		uri: "/profile/get_refer_code",
		query: `SELECT id, refer_code FROM customer_profile `,
	  },
];

// Export modules
module.exports = Object.freeze({
	read,
	add,
	change,
});

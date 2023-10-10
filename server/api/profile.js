const change = [
	{
		uri: "/profile/edit_profile/:id",
		query: `UPDATE customer_profile SET name=?, user_name=?, phone=?, shipping_address=? WHERE id = ?`,
		body: ["name", "user_name", "phone", "shipping_address"],
		param: ["id"],
		msg: "id",
	},
	{
		uri: "/profile/edit_active_status/:id",
		query: `UPDATE customer_profile SET active_status = ? WHERE id = ?`,
		body: ["active_status"],
		param: ["id"],
		msg: "id",
	  },
];

const read = [
	{
		uri: "/profile/get_profile/:id",
		query: `SELECT * FROM customer_profile WHERE id = ?`,
		param: ["id"],
		msg: "id",
	},
];

// Export modules
module.exports = Object.freeze({
	read,
	change,
});

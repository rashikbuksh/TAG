const change = [
	{
		uri: "/profile/edit_profile/:id",
		query: `UPDATE customer_profile SET name=?, user_name=?, phone=?, shipping_address=? WHERE id = ?`,
		body: ["name", "user_name", "phone", "shipping_address"],
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

const change = [
	{
		uri: "/profile/edit_profile/:id",
		query: `UPDATE customer_profile SET name=?, shipping_address=? WHERE id = ?`,
		body: ["name", "shipping_address"],
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
	{
		uri: "/profile/update_profile_image/:id",
		query: `UPDATE customer_profile SET profile_picture = ? WHERE id = ?`,
		body: ["profile_picture"],
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
	{
		uri: "/profile/get_profilePicture/:id",
		query: `SELECT profile_picture , id FROM customer_profile WHERE id = ?`,
		param: ["id"],
		msg: "id",
	},
];

// Export modules
module.exports = Object.freeze({
	read,
	change,
});

const read = [
	{
		uri: "/auth/verify_login/:email/:password",
		query: `SELECT * from customer_profile where email = ? and password = ?`,
		param: ["email", "password"],
		msg: "email or password is incorrect",
	},
	{
		uri: "/auth/getUserInfo/:id",
		query: `SELECT image, name, user_name, review_count from customer_profile where id = ?`,
		param: ["id"],
		msg: "id is incorrect",
	},
	{
		uri: "/auth/getShopperInfo",
		query: `SELECT id, image, name, user_name, review_count from customer_profile where access = "shopper"`,
	},
];

const add = [
	{
		uri: "/auth/register",
		query: `INSERT INTO customer_profile (name, email, password, access) VALUES (?, ?, ?, ?)`,
		body: ["name", "email", "password", "access"],
		msg: "name",
	},
	{
		uri: "/auth/registershopper",
		query: `INSERT INTO customer_profile (name, phone, email, password, shipping_address, access) VALUES (?, ?, ?, ?, ?, ?)`,
		body: [
			"name",
			"phone",
			"email",
			"password",
			"shipping_address",
			"access",
		],
		msg: "name",
	},
];

// Export modules
module.exports = Object.freeze({
	read,
	add,
});

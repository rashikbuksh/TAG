const read = [
	// {
	// 	uri: "/auth/verify_login",
	// 	query: `SELECT * from customer_profile where email = ? and password = ?`,
	// 	body: ["email", "password"],
	// 	msg: "email or password is incorrect",
	// },
	{
		uri: "/auth/getUserInfo/:id",
		query: `SELECT profile_picture, name, user_name, active_status, review_count, access, shipping_address,address from customer_profile where id = ?`,
		param: ["id"],
		msg: "id is incorrect",
	},
	{
		uri: "/auth/getUserAllInfo/:id",
		query: `SELECT name,shipping_address,address,image from customer_profile where id = ?`,
		param: ["id"],
		msg: "id is incorrect",
	},
	{
		uri: "/auth/getShopperInfo",
		query: `SELECT id, image, name, user_name,phone,email,access, review_count from customer_profile where access = "shopper"`,
	},
	{
		uri: "/auth/getALLUserInfo",
		query: `SELECT id, image, name, user_name, access from customer_profile`,
	},
	{
		uri: "/auth/getALLUserInfoForadmin",
		query: `SELECT id, image, name,phone,email, user_name, access  from customer_profile where access = "customer"`,
	},
	{
		uri: "/auth/getALLModaratorInfoForadmin",
		query: `SELECT id, image, name,phone,email, user_name, access  from customer_profile where access = "modarator"`,
	},
	{
		uri: "/auth/getRefer/:id",
		query: `SELECT refer_code from customer_profile where id = ?`,
		param: ["id"],
	},
	// {
	// 	uri: "/auth/getUserID",
	// 	query: `SELECT id from customer_profile where phone=?`,
	// 	body: ["phone"],
	// },
];

const add = [
	// {
	// 	uri: "/auth/modaratorRegister",
	// 	query: `INSERT INTO customer_profile (name, email, password, access) VALUES (?, ?, ?, ?)`,
	// 	body: ["name", "email", "password", "access"],
	// 	msg: "name",
	// },
	// {
	// 	uri: "/auth/registershopper",
	// 	query: `INSERT INTO customer_profile (name, phone, email, password, shipping_address, access) VALUES (?, ?, ?, ?, ?, ?)`,
	// 	body: [
	// 		"name",
	// 		"phone",
	// 		"email",
	// 		"password",
	// 		"shipping_address",
	// 		"access",
	// 	],
	// 	msg: "name",
	// },
];

const change = [
	{
		uri: "/auth/addReferCode",
		query: `UPDATE customer_profile SET refer_code = ? WHERE id = ?`,
		body: ["refer_code", "id"],
		msg: "id",
	},
];
const remove = [
	{
		uri: "/auth/deleteModarator/:id",
		query: `DELETE FROM customer_profile WHERE id = ?`,
		param: ["id"],
	},
];

// Export modules
module.exports = Object.freeze({
	read,
	add,
	change,
	remove,
});

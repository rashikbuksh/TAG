const read = [
	// /auth/verify_login   ->    in auth_pro.jsx
	{
		uri: "/auth/getUserInfo/:id",
		query: `SELECT
					id,
					profile_picture,
					name,
					user_name,
					active_status,
					review_count,
					access,
					shipping_address,
					address,
					image,
					refer_code
				FROM
					customer_profile
				WHERE 
					id = ?`,
		param: ["id"],
		msg: "id",
	},
	{
		uri: "/auth/checkUser/:phone",
		query: `SELECT name, access from customer_profile where phone = ?`,
		param: ["phone"],
		msg: "phone",
	},
	{
		uri: "/auth/getShopperInfo",
		query: `SELECT
					cp.id,
					cp.image,
					cp.name,
					cp.user_name,
					cp.phone,
					cp.email,
					cp.access,
					cp.active_status,
					cp.review_count,
                    cp.shipping_address as shipping_address
				FROM
					customer_profile cp
				WHERE
					access = "shopper"||access = "admin"`,
	},
	{
		uri: "/auth/getALLUserInfo",
		query: `SELECT id, image, profile_picture, name, user_name, access from customer_profile`,
	},
	{
		uri: "/auth/getNewShopInfo",
		query: `SELECT id, image,	shipping_address, name, user_name, phone,email, access from customer_profile WHERE access = "new_shopper"`,
	},
	{
		uri: "/auth/getALLUser/:access",
		query: `SELECT id, image, name, phone, email, user_name, access  from customer_profile where access = ?`,
		param: ["access"],
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
	{
		uri: "/auth/confirmShopper",
		query: `UPDATE customer_profile SET access = ? WHERE id = ?`,
		body: ["access", "id"],
		msg: "id",
	},
	{
		uri: "/auth/edit-location",
		query: `UPDATE customer_profile SET shipping_address = ? WHERE id = ?`,
		body: ["shipping_address", "id"],
		msg: "id",
	},
];
const remove = [
	{
		uri: "/auth/deleteModarator/:id",
		query: `DELETE FROM customer_profile WHERE id = ?`,
		param: ["id"],
	},
	{
		uri: "/auth/newShopper/:id",
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

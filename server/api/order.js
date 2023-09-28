const add = [
	{
		uri: "/order/add_order",
		query: `INSERT INTO product_order (product_id, quantity, weight, price, discount, order_status, customer_profile_id, shopper_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
		body: [
			"product_id",
			"quantity",
			"weight",
			"price",
			"discount",
			"order_status",
			"customer_profile_id",
			"shopper_id",
		],
		msg: "product_id",
	},
];
const read = [
	{
		uri: "/order/getorder/:customer_profile_id",
		query: `SELECT * FROM product_order WHERE customer_profile_id = ?`,
		param: ["customer_profile_id"],
		msg: "product_id",
	},
	{
		uri: "/order/getordershopper/:shopper_id",
		query: `SELECT * FROM product_order WHERE shopper_id = ?`,
		param: ["shopper_id"],
		msg: "product_id",
	},
	{
		uri: "/order/getorder_by_id/:id",
		query: `SELECT * FROM product_order WHERE id = ?`,
		param: ["id"],
		msg: "product_id",
	},
	{
		uri: "/order/getallorder",
		query: `SELECT * FROM product_order`,
		msg: "product_id",
	},
];

const change = [
	{
		uri: "/order/updateorderstatus/:id",
		query: `UPDATE product_order SET order_status = ? WHERE id = ?`,
		body: ["order_status"],
		param: ["id"],
		msg: "id",
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
	change,
});

const add = [
	{
		uri: "/order/add_order",
		query: `INSERT INTO product_order (product_id, price, discount, order_status, customer_profile_id) VALUES (?, ?, ?, ?, ?)`,
		body: [
			"product_id",
			"price",
			"discount",
			"order_status",
			"customer_profile_id",
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
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
});

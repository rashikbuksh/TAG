const add = [
	{
		uri: "/ordered-product/add-ordered-product",
		query: `INSERT INTO ordered_product (order_id ,product_id, quantity, weight, price, discount) VALUES (?, ?, ?, ?, ?, ?)`,
		body: [
			"order_id",
			"product_id",
			"quantity",
			"weight",
			"price",
			"discount",
		],
		msg: "order_id",
	},
];
const read = [
	{
		uri: "/ordered-product/get-ordered-product/:order_id",
		query: `SELECT * FROM ordered_product WHERE order_id = ? ORDER BY order_id DESC`,
		param: ["order_id"],
		msg: "order_id",
	},
];

const change = [
	{
		uri: "/ordered-product/updateorderstatus/:id",
		query: `UPDATE ordered_product 
				SET 
					discount=?, 
					quantity=?, 
					price=?, 
					weight=? 
				WHERE id=?`,
		body: ["order_status"],
		param: ["id"],
		msg: "id",
	},
];

const remove = [
	{
		uri: "/ordered-product/delete/:id",
		query: `DELETE FROM ordered_product WHERE id=?`,
		param: ["id"],
		msg: "id",
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
	change,
	remove,
});

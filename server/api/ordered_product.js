const add = [
	{
		uri: "/ordered-product/add-ordered-product",
		query: `INSERT INTO ordered_product (order_uuid, product_id, quantity, weight, price, discount) VALUES (?, ?, ?, ?, ?, ?)`,
		body: [
			"order_uuid",
			"product_id",
			"quantity",
			"weight",
			"price",
			"discount",
		],
		msg: "order_uuid",
	},
];
const read = [
	{
		uri: "/ordered-product/get-ordered-product/:order_uuid",
		query: `SELECT * FROM ordered_product WHERE order_uuid = ? ORDER BY order_uuid DESC`,
		param: ["order_uuid"],
		msg: "order_uuid",
	},
	{
		uri: "/ordered-product/get-ordered-product/by/:order_uuid",
		query: `SELECT 
					op.*,
					p.image AS product_image,
					p.title AS title,
					sp.id AS pid,
					sp.name AS name,
					po.shopper_order_accept_time AS shopper_order_accept_time,
					po.order_status AS order_status,
					po.cancel_report AS cancel_report,
					po.customers_address_summary,
					po.order_time AS order_time,
					po.delivery_time AS delivery_time
				FROM ordered_product op
				LEFT JOIN shopper_product sp ON op.product_id = sp.id
				LEFT JOIN product p ON sp.product_id = p.id
				LEFT JOIN product_order po ON op.order_uuid = po.order_uuid
				WHERE op.order_uuid = ?`,
		param: ["order_uuid"],
		msg: "order_uuid",
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

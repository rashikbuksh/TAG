const add = [
	{
		uri: "/order/add-order",
		query: `INSERT INTO product_order (order_status, customer_profile_id, shopper_id, order_time, price) VALUES (?, ?, ?, ?, ?)`,
		body: [
			"order_status",
			"customer_profile_id",
			"shopper_id",
			"order_time",
			"price",
		],
		msg: "product_id",
	},
];
const read = [
	{
		uri: "/order/getorder/:customer_profile_id",
		query: `SELECT * FROM product_order WHERE customer_profile_id = ? ORDER BY id DESC`,
		param: ["customer_profile_id"],
		msg: "product_id",
	},
	{
		uri: "/order/getPendingorder/:customer_profile_id",
		query: `SELECT 
              po.*, 
              cp.name as shopper_name
            FROM 
              product_order po
            JOIN 
              customer_profile cp ON po.shopper_id = cp.id
            WHERE 
              (po.order_status = 'pending' OR po.order_status = 'accepted')
              AND po.customer_profile_id = ? 
            ORDER BY 
                id DESC`,
		param: ["customer_profile_id"],
		msg: "product_id",
	},
	{
		uri: "/order/getordershopper/:shopper_id",
		query: `SELECT * 
    FROM product_order 
    WHERE (order_status = 'pending' OR order_status = 'accepted') 
      AND shopper_id = ? 
    ORDER BY id DESC;`,
		param: ["shopper_id"],
		msg: "product_id",
	},
	{
		uri: "/order/getallordershopper/:shopper_id",
		query: `SELECT * 
    FROM product_order 
    WHERE shopper_id = ? 
    ORDER BY id DESC;`,
		param: ["shopper_id"],
		msg: "product_id",
	},
	{
		uri: "/order/getorderhistoryshopper/:shopper_id",
		query: `SELECT * 
    FROM product_order 
    WHERE (order_status = 'cancelled' OR order_status = 'completed') 
      AND shopper_id = ? 
    ORDER BY id DESC;`,
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
	{
		uri: "/order/getProductbyid/:id",
		query: `SELECT
					sp.*,
					sp.id AS pid,
					sp.price AS product_Price,
					po.*,
					po.price AS totalPrice,
					SUBSTRING_INDEX(SUBSTRING_INDEX(po.quantity, ',', FIND_IN_SET(sp.id, po.product_id)), ',', -1) AS product_quantity,
					SUBSTRING_INDEX(SUBSTRING_INDEX(po.discount, ',', FIND_IN_SET(sp.id, po.product_id)), ',', -1) AS product_discounted_price,
					p.image AS product_image
				FROM
					shopper_product sp
				JOIN
					product_order po ON FIND_IN_SET(sp.id, po.product_id)
				JOIN
					product p ON sp.product_id = p.id
				WHERE
					FIND_IN_SET(po.id, ?) > 0;`,
		param: ["id"],
		msg: "product_id",
	},
	{
		uri: "/order/getLastOrder/:customer_profile_id",
		query: `SELECT id FROM product_order WHERE customer_profile_id = ? ORDER BY id DESC LIMIT 1`,
		param: ["customer_profile_id"],
	},
	{
		uri: "/order/get-total-order/:id",
		query: `SELECT COUNT(*) as total_order FROM product_order WHERE customer_profile_id = ?;`,
		param: ["id"],
	},
	{
		uri: "/order/gettimeoutorder",
		query: `SELECT *
    FROM product_order
    WHERE TIMEDIFF(delivery_time, order_time) > '00:45:00'
    AND (order_delay_report != 'solved' OR order_delay_report IS NULL);
    `,
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
	{
		uri: "/order/cancelReport/:id",
		query: `UPDATE product_order SET cancel_report = ? WHERE id = ?`,
		body: ["cancel_report"],
		param: ["id"],
		msg: "id",
	},
	{
		uri: "/order/ordertimeoutStatus/:id",
		query: `UPDATE product_order SET order_status = ? , cancel_report = ? WHERE id = ?`,
		body: ["order_status", "cancel_report"],
		param: ["id"],
		msg: "id",
	},
	{
		uri: "/order/ordershopperaccepttime/:id",
		query: `UPDATE product_order SET shopper_order_accept_time = ? WHERE id = ?`,
		body: ["shopper_order_accept_time"],
		param: ["id"],
		msg: "id",
	},
	{
		uri: "/order/orderdeliverytime/:id",
		query: `UPDATE product_order SET delivery_time = ? WHERE id = ?`,
		body: ["delivery_time"],
		param: ["id"],
		msg: "id",
	},
	{
		uri: "/order/resolvedorder_delay/:id",
		query: `UPDATE product_order SET order_delay_report = ? WHERE id = ?`,
		body: ["order_delay_report"],
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

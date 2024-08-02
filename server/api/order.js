const add = [
	{
		uri: "/order/add-order",
		query: `INSERT INTO product_order (order_status, order_uuid, customer_profile_id, shopper_id, order_time, price,customers_address_details_id,payment_type,customers_address_summary) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`,
		body: [
			"order_status",
			"order_uuid",
			"customer_profile_id",
			"shopper_id",
			"order_time",
			"price",
			"customers_address_details_id",
			"payment_type",
			"customers_address_summary",
		],
		msg: "product_id",
	},
];
const read = [
	{
		uri: "/order/getorder/:customer_profile_id",
		query: `SELECT p.*, c.name, c.id AS customer_id, c.phone
		FROM product_order p
		JOIN customer_profile c ON p.customer_profile_id = c.id
		WHERE p.customer_profile_id = ?
		ORDER BY p.id DESC;`,
		param: ["customer_profile_id"],
		msg: "customer_profile_id",
	},
	{
		uri: "/order/getPendingorder/:customer_profile_id",
		query: `SELECT 
				po.*, 
				cp.name as shopper_name,
				cp.access
            FROM 
              	product_order po
            JOIN 
              	customer_profile cp ON po.shopper_id = cp.id
            WHERE 
				(po.order_status = 'pending' OR po.order_status = 'accepted')
				AND po.customer_profile_id = ? 
            ORDER BY 
                po.id DESC`,
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
		query: `SELECT 
					po.* 
				FROM product_order po
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
					po.id as order_id,
					po.order_uuid AS order_uuid,
					sp.id AS pid,
					sp.name AS name,
					op.quantity,
					op.discount,
					op.price,
					op.weight,
					po.price AS totalPrice,
					p.image AS product_image,
					p.title AS title,
					po.order_status AS order_status,
					po.cancel_report AS cancel_report,
					po.customers_address_summary,
					po.order_time AS order_time,
					po.customer_profile_id,
					po.shopper_id,
					po.customers_address_details_id,
					cad.*,
					po.shopper_order_accept_time AS shopper_order_accept_time,
					cp.name AS customer_name,
					sh.name AS shopper_name,
					po.delivery_time AS delivery_time
				FROM 
					shopper_product sp
				LEFT JOIN 
					ordered_product op ON op.product_id = sp.id
				LEFT JOIN 
					product_order po ON po.order_uuid = op.order_uuid
				LEFT JOIN 
					product p ON sp.product_id = p.id
				LEFT JOIN
					customers_address_details cad ON cad.id = po.customers_address_details_id
				LEFT JOIN
					customer_profile cp ON po.customer_profile_id = cp.id
				LEFT JOIN
					customer_profile sh ON po.shopper_id = sh.id
				WHERE 
					po.id = ?;`,
		param: ["id"],
		msg: "product_id",
	},
	{
		uri: "/order/get-product/by/:order_uuid",
		query: `SELECT
					po.id as order_id,
					po.order_uuid AS order_uuid,
					po.price AS totalPrice,
					po.order_status AS order_status,
					po.cancel_report AS cancel_report,
					po.customers_address_summary,
					po.order_time AS order_time,
					po.customer_profile_id,
					po.shopper_id,
					po.customers_address_details_id,
					cad.*,
					po.shopper_order_accept_time AS shopper_order_accept_time,
					cp.name AS customer_name,
					sh.name AS shopper_name,
					po.delivery_time AS delivery_time
				FROM
					product_order po
				LEFT JOIN
					customers_address_details cad ON cad.id = po.customers_address_details_id
				LEFT JOIN
					customer_profile cp ON po.customer_profile_id = cp.id
				LEFT JOIN
					customer_profile sh ON po.shopper_id = sh.id
				WHERE 
					po.order_uuid = ?;`,
		param: ["order_uuid"],
		msg: "order_id",
	},
	{
		uri: "/order/get-total-order/:id",
		query: `SELECT COUNT(*) as total_order FROM product_order WHERE customer_profile_id = ?;`,
		param: ["id"],
	},
	{
		uri: "/order/get-timeout-order",
		query: `SELECT po.*
            FROM product_order po
            WHERE TIMEDIFF(delivery_time, order_time) > '00:45:00'
            	AND (order_delay_report != 'solved' OR order_delay_report IS NULL);`,
	},
	{
		uri: "/order/get-order-uuid/:id",
		query: `SELECT order_uuid
            FROM product_order
            WHERE id = ?;`,
		param: ["id"],
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
		query: `UPDATE product_order SET order_status = ?, cancel_report = ? WHERE id = ?`,
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

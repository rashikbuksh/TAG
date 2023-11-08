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
    uri: "/order/getPendingorder/:customer_profile_id",
    query: `SELECT * FROM product_order
	WHERE
	order_status = 'pending'
	AND customer_profile_id = ?`,

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
  {
    uri: "/order/getProductbyid/:id",
    query: `SELECT
		sp.*,
		sp.price as product_Price,
		po.*,
		po.price as totalPrice,
		SUBSTRING_INDEX(SUBSTRING_INDEX(po.quantity, ',', FIND_IN_SET(sp.id, po.product_id)), ',', -1) AS product_quantity,
		SUBSTRING_INDEX(SUBSTRING_INDEX(po.discount, ',', FIND_IN_SET(sp.id, po.product_id)), ',', -1) AS product_discounted_price
	FROM
		shopper_product sp
	JOIN
		product_order po ON FIND_IN_SET(sp.id, po.product_id)
	WHERE
		FIND_IN_SET(po.id, ?) > 0;`,
    param: ["id"],
    msg: "product_id",
  },
  {
    uri: "/order/getLastOrder",
    query: `SELECT id FROM product_order ORDER BY id DESC LIMIT 1`,
  },
  {
    uri: "/order/get-total-order/:id",
    query: `SELECT COUNT(*) as total_order FROM product_order WHERE customer_profile_id = ?;`,
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
];

// Export modules
module.exports = Object.freeze({
  add,
  read,
  change,
});

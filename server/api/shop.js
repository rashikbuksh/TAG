const add = [];

// access
// active_status
// address
// name
// phone
// shipping_address
// total_orders
// id
const read = [
	{
		uri: "/shop/getAllShop",
		query: `SELECT
              cp.id,
              cp.access,
              cp.active_status,
              cp.address,
              cp.name,
              cp.phone,
              cp.shipping_address,
              cp.profile_picture,
              cp.review_count,
              COALESCE(total_orders, 0) AS total_orders
          FROM
              customer_profile cp
          LEFT JOIN (
              SELECT
                  shopper_id,
                  COUNT(*) AS total_orders
              FROM
                  product_order
              GROUP BY
                  shopper_id
          ) o ON cp.id = o.shopper_id
          WHERE
              cp.access = 'shopper'
          ORDER BY
              total_orders DESC;`,
	},
];

const change = [];

const remove = [];

// Export modules
module.exports = Object.freeze({
	add,
	read,
	change,
	remove,
});

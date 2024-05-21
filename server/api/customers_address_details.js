const add = [
	{
		uri: "/add/customerAddress",
		query: `INSERT INTO customers_address_details (customer_id, address_title, address, geo_location, phone_no) VALUES (?, ?, ?, ?, ?)`,
		body: [
			"customer_id",
			"address_title",
			"address",
			"geo_location",
			"phone_no",
		],
		msg: "address_title",
	},
];

const read = [
	{
		uri: "/get-customer-address/:id",
		query: `SELECT * FROM customers_address_details WHERE customer_id = ?`,
		param: ["id"],
	},
];

const change = [
	{
		uri: "/updateUserAddress",
		query: `UPDATE customers_address_details
            SET address_title = ?,
                address = ?,
                geo_location = ?,
                phone_no = ?
            WHERE id = ?;`,
		body: ["address_title", "address", "geo_location", "phone_no", "id"],
		msg: "id",
	},
];
const remove = [
	{
		uri: "/remove/customers_address_details/:id",
		query: `DELETE FROM customers_address_details WHERE id = ?`,
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

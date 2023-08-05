const add = [
	{
		uri: "/shopperproduct/addshopperproduct",
		query: `INSERT INTO shopper_product( name, price, discount, product_count, product_id) VALUES (?, ?, ?, ?, ?)`,
		body: ["name", "price", "discount", "product_count", "product_id"],
		msg: "name",
	},
];

const read = [
	{
		uri: "/shopperproduct/getshopperproduct",
		query: `SELECT * FROM shopper_product`,
	},
	{
		uri: "/shopperproduct/getshopperproduct/:id",
		query: `SELECT * FROM shopper_product WHERE id = ?`,
		param: ["id"],
	},
	{
		uri: "/shopperproduct/getshopperproductName/:id",
		query: `SELECT name FROM shopper_product WHERE id in (?)`,
		param: ["id"],
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
});

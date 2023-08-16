const add = [
	{
		uri: "/shopperproduct/addshopperproduct",
		query: `INSERT INTO shopper_product( name, price, discount, product_count, product_id, shopper_id) VALUES (?, ?, ?, ?, ?, ?)`,
		body: [
			"name",
			"price",
			"discount",
			"product_count",
			"product_id",
			"shopper_id",
		],
		msg: "name",
	},
];

const read = [
	{
		uri: "/shopperproduct/getshopperproduct",
		query: `SELECT sp.id, sp.name, sp.price, discount, product_count, product_id, category_id, image FROM shopper_product sp, product p WHERE sp.product_id = p.id`,
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
	{
		uri: "/shopperproduct/getshopperproductOfShopkeeper/:id",
		query: `SELECT sp.id, sp.name, sp.price, discount, product_count, product_id, category_id, image FROM shopper_product sp, product p WHERE sp.product_id = p.id and shopper_id = ?`,
		param: ["id"],
	},
	{
		uri: "/shopperproduct/getLastProduct",
		query: `SELECT * FROM shopper_product ORDER BY id DESC LIMIT 1`,
	},
];

const change = [
	{
		uri: "/product/updateProductCount",
		query: `UPDATE shopper_product SET product_count = ? WHERE id = ?`,
		body: ["product_count", "id"],
		msg: "id",
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
	change,
});

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
		query: `SELECT sp.id, sp.name, sp.price, discount, product_count, product_id, category_id, image, sp.shopper_id, sale_count, sp.view FROM shopper_product sp, product p WHERE sp.product_id = p.id`,
	},
	{
		uri: "/shopperproduct/getshopperproduct/:id",
		query: `SELECT sp.id, sp.name, sp.price, discount, product_count, product_id, category_id, image, shopper_id, sp.view FROM shopper_product sp, product p WHERE sp.product_id = p.id and sp.id = ?`,
		param: ["id"],
	},
	{
		uri: "/shopperproduct/getshopperproductName/:id",
		query: `SELECT name FROM shopper_product WHERE id in (?)`,
		param: ["id"],
	},
	{
		uri: "/shopperproduct/getshopperproductOfShopkeeper/:id",
		query: `SELECT sp.id, sp.name, sp.price, discount, product_count, product_id, category_id, image, sp.view FROM shopper_product sp, product p WHERE sp.product_id = p.id and shopper_id = ?`,
		param: ["id"],
	},
	{
		uri: "/shopperproduct/getLastProduct",
		query: `SELECT * FROM shopper_product ORDER BY id DESC LIMIT 1`,
	},
	{
		uri: "/shopperproduct/getshopperproductBasedOnSaleCount",
		query: `SELECT sp.id, sp.name, sp.price, discount, product_count, product_id, category_id, image, sp.shopper_id, sale_count, sp.view FROM shopper_product sp, product p WHERE sp.product_id = p.id ORDER BY sale_count DESC LIMIT 4`,
	},
	{
		uri: "/shopkeeperproduct/getshopkeeperproductCount/:id",
		query: `SELECT COUNT(*) as count FROM shopper_product WHERE shopper_id = ?`,
		param: ["id"],
	},
	{
		uri: "/shopperproduct/getPopularShopperProduct",
		query: `SELECT sp.id, sp.name, sp.price, discount, product_count, product_id, category_id, image, sp.shopper_id, sale_count, sp.view FROM shopper_product sp, product p WHERE sp.product_id = p.id ORDER BY sale_count DESC LIMIT 5`,
	},
];

const change = [
	{
		uri: "/product/updateProductCount",
		query: `UPDATE shopper_product SET product_count = ? WHERE id = ?`,
		body: ["product_count", "id"],
		msg: "id",
	},
	{
		uri: "/shopperproduct/increaseView/:id",
		query: "UPDATE shopper_product SET view = view + 1 where id = ?",
		param: ["id"],
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
	change,
});

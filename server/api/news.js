const add = [
	{
		uri: "/news/addnews",
		query: `INSERT INTO news (shop_id , date, post_content, post_img, category) VALUES (?, ?, ?, ?, ?)`,
		body: ["shop_id", "date", "post_content", "post_img", "category"],
		msg: "shop_id",
	},
	{
		uri: "/news/addproductnews",
		query: `INSERT INTO news (shopper_product_id, shop_id , date, discount, duration, location, category, post_content, post_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		body: [
			"shopper_product_id",
			"shop_id",
			"date",
			"discount",
			"duration",
			"location",
			"category",
			"post_content",
			"post_img",
		],
		msg: "shop_id",
	},
];
const read = [
	{
		uri: "/news/getnews",
		query: `SELECT * FROM news ORDER BY date desc`,
		msg: "news",
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
});

const add = [
	{
		uri: "/news/addnews",
		query: `INSERT INTO news (shopper_product_id , shop_id , date, discount, duration, location, category, post_content, post_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
		msg: "shopper_product_id",
	},
];

// Export modules
module.exports = Object.freeze({
	add,
});

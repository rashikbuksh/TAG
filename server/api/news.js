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
	{
		uri: "/news/getHotNews",
		query: `SELECT * 
		FROM news 
		WHERE (	shop_id, shopper_product_id , date) IN 
			(SELECT shop_id, shopper_product_id, MAX(date) 
			 FROM news 
			 GROUP BY shop_id, shopper_product_id) 
		ORDER BY date DESC;`,
		msg: "news",
	},
];
const change = [
	{
		uri: "/news/increaseLikeCount/:id",
		query: `UPDATE news SET like_count = like_count + 1 WHERE id = ?`,
		param: ["id"],
		msg: "news",
	},
	{
		uri: "/news/decreaseLikeCount/:id",
		query: `UPDATE news SET like_count = like_count - 1 WHERE id = ?`,
		param: ["id"],
		msg: "news",
	},
	{
		uri: "/news/increaseCommentCount/:id",
		query: `UPDATE news SET comment_count = comment_count + 1 WHERE id = ?`,
		param: ["id"],
		msg: "news",
	},
	{
		uri: "/news/decreaseCommentCount/:id",
		query: `UPDATE news SET comment_count = comment_count - 1 WHERE id = ?`,
		param: ["id"],
		msg: "news",
	},
];

const remove = [
	{
		uri: "/news/deletenews/:id/by/shopperproduct",
		query: `DELETE FROM news WHERE shopper_product_id = ?`,
		param: ["id"],
		msg: "news",
	},
	{
		uri: "/news/deletenews/:id",
		query: `DELETE FROM news WHERE id = ?`,
		param: ["id"],
		msg: "news",
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
	change,
	remove,
});

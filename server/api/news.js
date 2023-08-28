const add = [
	{
		uri: "/news/addnews",
		query: `INSERT INTO news (shop_id , date, post_content, post_img, category) VALUES (?, ?, ?, ?, ?)`,
		body: ["shop_id", "date", "post_content", "post_img", "category"],
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

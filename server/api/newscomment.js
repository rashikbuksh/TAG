const add = [
	{
		uri: "/news-comment/add-comment",
		query: `INSERT INTO news_comment (news_id , commented_by, comment, news_time) VALUES (?, ?, ?, ?)`,
		body: ["news_id", "commented_by", "comment", "news_time"],
		msg: "news_id",
	},
];
const read = [
	{
		uri: "/news-comment/get-news-comment",
		query: `SELECT * FROM news_comment`,
		msg: "news",
	},
	{
		uri: "/news-comment/get-news-comment/:id",
		query: `SELECT nc.*, cp.profile_picture, cp.name
		FROM news_comment nc
		JOIN customer_profile cp ON nc.commented_by = cp.id
		WHERE nc.news_id = ?`,
		param: ["id"],
	},
];
const remove = [
	{
		uri: "/news-comment/delete-comment/:id(*)",
		query: `DELETE FROM news_comment WHERE id = ?`,
		param: ["id"],
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
	remove,
});

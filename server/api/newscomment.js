const add = [
	{
		uri: "/newscomment/addcomment",
		query: `INSERT INTO news_comment (news_id , commented_by, comment, news_time) VALUES (?, ?, ?, ?)`,
		body: ["news_id", "commented_by", "comment", "news_time"],
		msg: "news_id",
	},
];
const read = [
	{
		uri: "/newscomment/getnewscomment",
		query: `SELECT * FROM news_comment`,
		msg: "news",
	},
];
const remove = [
	{
		uri: "/newscomment/deletecomment/:id(*)",
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

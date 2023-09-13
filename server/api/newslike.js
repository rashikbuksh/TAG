const add = [
	{
		uri: "/newslike/addLike",
		query: `INSERT INTO news_like (news_id , liked_by) VALUES (?, ?)`,
		body: ["news_id", "liked_by"],
		msg: "news_id",
	},
];
const read = [
	{
		uri: "/newslike/getlike/:id",
		query: `SELECT * FROM news_like WHERE liked_by = ?`,
		param: ["id"],
		msg: "news",
	},
];
const remove = [
	{
		uri: "/newslike/deletelike/:id(*)",
		query: `DELETE FROM news_like WHERE id = ?`,
		param: ["id"],
	},
];

// Export modules
module.exports = Object.freeze({
	add,
	read,
	remove,
});
